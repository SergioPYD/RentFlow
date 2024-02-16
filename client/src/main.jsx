
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AuthWrapper } from "./context/auth.context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
  <BrowserRouter>
    <AuthWrapper>
      <main>
        <App />
      </main>
    </AuthWrapper>
  </BrowserRouter>
</NextUIProvider>
)
