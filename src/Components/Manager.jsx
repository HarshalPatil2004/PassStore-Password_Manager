import React, { useState, useEffect } from "react";
import Passwords from "./Passwords";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const STORAGE_KEY = "passstore_passwords";
const DEVICE_ID_KEY = "passstore_device_id";
const DEVICE_NAME_KEY = "passstore_device_name";

// Get or create device ID
const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
};

// Get device name
const getDeviceName = () => {
  let deviceName = localStorage.getItem(DEVICE_NAME_KEY);
  if (!deviceName) {
    deviceName = `Device-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(DEVICE_NAME_KEY, deviceName);
  }
  return deviceName;
};

const Manager = () => {
  // Get device ID and name
  const [deviceId] = useState(getOrCreateDeviceId());
  const [deviceName] = useState(getDeviceName());

  // ---------------- PASSWORD STATE ----------------
  const [passwords, setPasswords] = useState(() => {
    const savedPasswords = localStorage.getItem(STORAGE_KEY);
    if (savedPasswords) {
      try {
        return JSON.parse(savedPasswords);
      } catch (error) {
        console.error("Error loading passwords from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // ---------------- FORM STATE ----------------
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  // Show / Hide password
  const [showPassword, setShowPassword] = useState(false);

  // Track which password is being edited
  const [editingId, setEditingId] = useState(null);

  // Save passwords to localStorage

  useEffect(() => {
    const getPasswords = async () => {
      try {
        let req = await fetch("http://localhost:3000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Device-ID": deviceId,
            "Device-Name": deviceName,
          },
        });
        let passwords = await req.json();
        setPasswords(passwords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };
    getPasswords();
  }, [deviceId, deviceName]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toggle show/hide password
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Save password
  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (editingId !== null) {
        const updatedPassword = {
          id: editingId,
          website: form.site,
          username: form.username,
          password: form.password,
          device_id: deviceId,
        };

        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Device-ID": deviceId,
            "Device-Name": deviceName,
          },
          body: JSON.stringify(updatedPassword),
        });

        if (!response.ok) throw new Error("Failed to update password");

        setPasswords((prev) => {
          const filtered = prev.filter((item) => item.id !== editingId);
          return [...filtered, updatedPassword];
        });

        toast.success("Password updated successfully 🔄");
        setEditingId(null);
      } else {
        const newPassword = {
          id: uuidv4(),
          website: form.site,
          username: form.username,
          password: form.password,
          device_id: deviceId,
        };

        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Device-ID": deviceId,
            "Device-Name": deviceName,
          },
          body: JSON.stringify(newPassword),
        });

        if (!response.ok) throw new Error("Failed to save password");

        setPasswords((prev) => [...prev, newPassword]);
        toast.success("Password saved successfully ✅");
      }

      setForm({ site: "", username: "", password: "" });
    } catch (error) {
      console.error("Error saving password:", error);
      toast.error("Error saving password!");
    }
  };

  // Edit password
  const editPassword = (id) => {
    const passwordToEdit = passwords.find((item) => item.id === id);
    if (passwordToEdit) {
      setForm({
        site: passwordToEdit.website,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
      setEditingId(id);
      toast.info("Editing password ✏️");
    }
  };

  // Delete password
  const deletePassword = async (id) => {
    if (window.confirm("Do you want to delete it?")) {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Device-ID": deviceId,
            "Device-Name": deviceName,
          },
          body: JSON.stringify({ id, device_id: deviceId }),
        });

        if (!response.ok) throw new Error("Failed to delete password");

        setPasswords((prev) => prev.filter((item) => item.id !== id));
        toast.warn("Password deleted 🗑️");
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Error deleting password!");
      }
    }
  };

  return (
    <div className="relative min-h-screen px-6 py-10">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      {/* ---------------- FORM UI ---------------- */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-6 md:py-10">
        <div className="absolute inset-0 -z-30 bg-[#eeebeb0f]" />

        <div
          className="w-full max-w-md sm:max-w-lg md:max-w-xl h-auto rounded-2xl bg-[#efecec15] p-6 sm:p-8
          shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#efecec15]"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
            <span className="text-green-500">&lt;Pass</span>
            Store
            <span className="text-green-500">/&gt;</span>
          </h1>

          <p className="text-center font-semibold text-green-600 text-sm sm:text-base mt-2 mb-4 sm:mb-6">
            your lucky Password manager
          </p>

          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              value={form.site}
              onChange={handleChange}
              name="site"
              placeholder="Enter Website URL or App Name"
              className="w-full rounded-lg bg-[#f0f0f0] px-3 sm:px-4 py-2 text-sm sm:text-base
              shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
              focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                value={form.username}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Username / Email"
                className="w-full sm:w-1/2 rounded-lg bg-[#f0f0f0] px-3 sm:px-4 py-2 text-sm sm:text-base
                shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                focus:outline-none"
              />

              <div className="relative w-full sm:w-1/2">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg bg-[#f0f0f0] px-3 sm:px-4 py-2 pr-16 sm:pr-20 text-sm sm:text-base
                  shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]
                  focus:outline-none"
                />

                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                  text-xs sm:text-sm font-semibold text-green-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={savePassword}
                className="px-4 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base
                bg-green-500 text-white hover:bg-green-600 transition-all"
              >
                {editingId !== null ? "Update Password" : "Add Password"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- PASSWORD TABLE ---------------- */}
      <Passwords
        passwords={passwords}
        deletePassword={deletePassword}
        editPassword={editPassword}
        editingId={editingId}
      />
    </div>
  );
};

export default Manager;
