import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Box } from '@mui/material'
import Header from "../common/Header/Header"
import Footer from "../common/Footer"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../redux/features/userSlice"
import userApi from "../../api/modules/user.api"

const MainLayout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const rememberUser = localStorage.getItem("rememberUser");

      if (accessToken && rememberUser) {
        const { response, err } = await userApi.auth(user)
        if (response) dispatch(setUser(response));
        if (err) dispatch(setUser(null));
      }
    };

    authUser();
  }, [user, dispatch]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh !important",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%"
        }}>

        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout