import React, { useState } from "react";
import { TrashIcon } from "../components/TrashIcon";
import ClipboardIcon from "../components/ClipboardIcon";

import { EditIcon } from "../components/EditIcon";
import { toast } from "react-toastify";

const Passwords = ({ passwords, deletePassword, editPassword, editingId }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Copy to clipboard function
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      if (index === "password") {
        toast.success("Password copied! 📋");
      }
      setTimeout(() => setCopiedIndex(null), 2000); // Show feedback for 2 seconds
    });
  };

  return (
    <div className="mt-8 sm:mt-10 flex justify-center px-3 sm:px-4 md:px-10 pb-6">
      <div className="w-full max-w-full lg:max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
          Your Passwords
        </h1>

        {passwords.length === 0 ? (
          <p className="text-gray-500 text-base sm:text-lg text-center">No passwords saved</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border-collapse shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-green-400 text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Website</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Username</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm hidden sm:table-cell">Password</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {passwords.map((item) => (
                  editingId === item.id ? null : (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-green-50 transition-colors duration-200"
                    >
                      <td className="p-2 sm:p-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
                          <span className="truncate text-xs sm:text-sm max-w-[120px] sm:max-w-xs">{item.website}</span>
                          <button
                            onClick={() => copyToClipboard(item.website, `site-${item.id}`)}
                            className="flex-shrink-0 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-xs sm:text-base"
                            title="Copy website"
                          >
                            <ClipboardIcon size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        {copiedIndex === `site-${item.id}` && <span className="text-green-600 text-xs">Copied!</span>}
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
                          <span className="truncate text-xs sm:text-sm max-w-[120px] sm:max-w-sm">{item.username}</span>
                          <button
                            onClick={() => copyToClipboard(item.username, `user-${item.id}`)}
                            className="flex-shrink-0 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-xs sm:text-base"
                            title="Copy username"
                          >
                            <ClipboardIcon size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        {copiedIndex === `user-${item.id}` && <span className=" text-green-600 text-xs">Copied!</span>}
                      </td>
                      <td className="p-2 sm:p-3 font-mono tracking-wide hidden sm:table-cell">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-xs sm:text-sm max-w-30 sm:max-w-sm">{"*".repeat(item.password.length)}</span>
                          <button
                            onClick={() => copyToClipboard(item.password, "password")}
                            className="flex-shrink-0 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-xs sm:text-base"
                            title="Copy password"
                          >
                            <ClipboardIcon size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => editPassword(item.id)}
                            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center
                                       bg-blue-500 hover:bg-blue-600 transition-colors
                                       text-white rounded-lg shadow-md text-xs sm:text-base"
                            title="Edit password"
                          >
                            <EditIcon size={16} className="sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => deletePassword(item.id)}
                            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center
                                       bg-red-500 hover:bg-red-600 transition-colors
                                       text-white rounded-lg shadow-md text-xs sm:text-base"
                            title="Delete password"
                          >
                            <TrashIcon size={16} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </div>
  );
};

export default Passwords;
