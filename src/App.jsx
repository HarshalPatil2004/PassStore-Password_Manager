import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Manager from "./Components/Manager";
import Passwords from "./Components/Passwords";
import Footer from "./Components/Footer";

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
