import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from './components/page1/page1';
import Page2 from './components/page2/page2';
import Navbar from './components/navbar/navbar';
import { useState } from 'react';

function App() {
  return (
    <div className="App bg-gray-700 w-full min-h-[100vh]">
      <Navbar/>
      <BrowserRouter>
        <Routes>
            <Route index element={<Page1 />} />
            <Route path="page2" element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
