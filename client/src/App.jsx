import { useState } from 'react'
import './App.css'
import NavbarPrimary from "./components/Navbar";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Index from "./pages/Index";
function App() {


  return (
    <>
    <NavbarPrimary/>

      
      
<Routes>
<Route path="/" element={<Index />} />
<Route path="/home" element={<Home />} />
<Route path="/signup" element={<Signup />} />
</Routes>
    </>
  )
}

export default App
