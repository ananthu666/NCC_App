import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/MasterData";
import About from "./pages/About";
import CadetReg from "./pages/CadetReg";
import DashBoard from "./pages/DashBoard";
import CadetInfo from "./pages/CadetInfo";

import Campfindash from "./pages/Campfindash";
import UpdateCadet from "./pages/UpdateCadet";

import CampPage from "./pages/CampPage";
import AddCampPage from "./pages/AddCampPage";
import AuthState from "./context/auth/AuthState";
import PrivateRoute from "./components/PrivateRoute";
import Finance from "./pages/Finance";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import DataState from "./context/data/DataState";
import DBT from "./pages/DBT";
import ImportExcelData from "./pages/Bulk_import";
import Training2 from "./pages/Training2";
import DocReview from "./components/Training2/DocReview";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const ROLES = {
    co: "jyB7YRMTHIbxSCQLM6F9EylqZq43",
    to: "306bIcSEFOS5MuaQmBakjdsiP9s2",
    cs: "eJbFYeisrkMdfcTX8JXjD73shZ42",
  };

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
        <div className="items-center min-h-screen bg-gray-300">
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
          <AuthState>
            <DataState>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<DashBoard />} />

                    <Route
                      element={
                        <RequireAuth allowedRoles={[ROLES.co, ROLES.to]} />
                      }
                    >
                      <Route path="/masterdata" element={<Home />} />
                    </Route>

                    <Route path="/about" element={<About />} />
                    <Route path="/addcadet" element={<CadetReg />} />
                    <Route path="/edit/:id" element={<UpdateCadet />} />
                    <Route
                      element={
                        <RequireAuth allowedRoles={[ROLES.co, ROLES.to]} />
                      }
                    >
                      <Route path="/training2" element={<Training2 />} />
                      <Route path="/training2/:id" element={<DocReview />} />
                      <Route path="/camp" element={<CampPage />} />
                      <Route path="/addcamp/:index" element={<AddCampPage />} />
                    </Route>

                    <Route
                      element={
                        <RequireAuth allowedRoles={[ROLES.co, ROLES.cs]} />
                      }
                    >
                      <Route path="/campfin/:index" element={<Campfindash />} />
                      <Route path="/finance" element={<Finance />} />
                    </Route>
                    {/* <Route path="/edit/:id" element={<CadetInfo />} /> */}
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/dbt" element={<DBT />} />
                    <Route path="/bulk_import" element={<ImportExcelData />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </DataState>
            {/* <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/masterdata" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/camp" element={<CampPage />} />
                  <Route path="/addcadet" element={<CadetReg />} />

                  <Route path="/edit/:id" element={<UpdateCadet />} />
                  <Route path="/addcamp/:index" element={<AddCampPage />} />
                
                  <Route path="/finance" element={<Finance />} />
                  

                  <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
              </Routes>
            </BrowserRouter> */}
          </AuthState>
        </div>
      )}
    </>
  );
}

export default App;
