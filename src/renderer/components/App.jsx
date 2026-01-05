import { Routes, Route, Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Home from './Home/Home.jsx'
import Settings from './Settings/Settings.jsx'
import { Retrieve, Found } from './Retrieve/Retrieve.jsx'
import { Upload, Uploading, Uploaded } from './Upload/Upload.jsx'
import { useLocation } from "react-router-dom";
import { createContext } from "react";
import LoadingWrapper from "./LoadingWrapper";

export const RetrieveContext = createContext(null);
export function RetrieveProvider ({ children }) {
  const [image, setImage] = useState(null);

  return (
    <RetrieveContext.Provider value={{ image, setImage }}>
      {children}
    </RetrieveContext.Provider>
  );
}

export const UploadContext = createContext(null);
export function UploadProvider ({ children }) {
  const [image, setImage] = useState(null);
  return (
    <UploadContext.Provider value={{ image, setImage }}>
      {children}
    </UploadContext.Provider>
  );
}
export default App;

function App() {
  return (
    <>
      <RetrieveProvider>
        <UploadProvider>
          <LoadingWrapper pathsWithLoading={["/retrieve/found", "/upload/uploading", "/upload/uploading/uploaded"]}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/upload" element={<Outlet />}>
                <Route index element={<Upload />} />
                <Route path="uploading" element={<Outlet />}>
                  <Route index element={<Uploading />} />
                  <Route path="uploaded" element={<Uploaded />} />
                </Route>
              </Route>

              <Route path="/retrieve" element={<Outlet />}>
                <Route index element={<Retrieve />} />
                <Route path="found" element={<Found />} />
              </Route>

              <Route path="/settings" element={<Settings />} />
            </Routes>
          </LoadingWrapper>
        </UploadProvider>
      </RetrieveProvider>
    </>
  );
}
