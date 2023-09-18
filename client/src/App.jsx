
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import themeConfigs from "./configs/theme.configs";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "./components/layout/MainLayout";
import SignupForm from "./pages/SignupForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './global.css';
import { useDispatch, useSelector } from "react-redux";
import { setAppState } from "./redux/features/appStateSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("Not authorized!")
    dispatch(setAppState("home"));
    return <Navigate to="/home" />;
  }

  else if (accessToken && user?.role !=="admin") {
    toast.error("Access denied. Not admin!")
    dispatch(setAppState("home"));
    return <Navigate to="/home" />;
  }

  return children;
};

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
            <Route path="/home" element={<Home />} />
            <Route path="/protected" element={
              <ProtectedRoute>
                <Protected />
              </ProtectedRoute>}
            />
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
