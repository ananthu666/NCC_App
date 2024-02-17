import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import CadetReg from "./pages/CadetReg";
import DashBoard from "./pages/DashBoard";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="loader"></div> {/* Add your loading animation here */}
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      ) : (
        <div className="items-center min-h-screen bg-gray-100">
          {/* <HashRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/masterdata" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/addcadet" element={<CadetReg />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </HashRouter> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/masterdata" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/addcadet" element={<CadetReg />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
