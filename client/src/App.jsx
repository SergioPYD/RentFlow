import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./context/auth.context";
import NavbarPrimary from "./components/Navbar";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Propiedades from "./pages/Propiedades";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import NavbarUserActive from "./components/NavbarUserActive";
function App() {
  const { isUserActive } = useContext(AuthContext);
  return (
    <>
      {isUserActive ? <NavbarUserActive /> : <NavbarPrimary />}

      <div className="body">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/propiedades" element={<Propiedades />} />


          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
