import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Passwords from "./components/Passwords";
import Footer from "./components/Footer";

const App = () => {
  const [passwords, setPasswords] = useState([]);

  const addPassword = (data) => {
    setPasswords(prev => [...prev, data]);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Manager addPassword={addPassword} />} />
          <Route path="/passwords" element={<Passwords passwords={passwords} />} />
        </Routes>

      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
