
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
import LoginForm from "./pages/LoginForm";
import themeConfigs from "./configs/theme.configs";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "./components/layout/MainLayout";
import SignupForm from "./pages/SignupForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import './global.css';

function App() {
  return (
    <ThemeProvider theme={themeConfigs}>
      {/* config toastify */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={"dark"}
      />
      {/* mui reset css */}
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />}/>
          </Route>

          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
