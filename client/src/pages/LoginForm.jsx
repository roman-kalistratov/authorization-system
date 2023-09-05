import { useState } from "react";
import { Box, Grid, Stack, TextField, Paper, Typography, FormControlLabel, Checkbox, Tab } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { MuiOtpInput } from 'mui-one-time-password-input';
import { matchIsNumeric } from "../utils/matchIsNumeric";
import Timer from "../components/common/Timer";
import authApi from "../api/modules/auth.api";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import * as Yup from "yup";

const LoginForm = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [otp, setOtp] = useState('')
  const [isOtp, setIsOtp] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [timeLeft, setTimeLeft] = useState(undefined);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOtp = (newValue) => {
    setOtp(newValue)
  }

  const validateChar = (value, index) => {
    return matchIsNumeric(value)
  }

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Not a proper email'),
      password: Yup.string()
        .required("password is required")
    }),
    onSubmit: async values => {
      setIsRequest(true);

      if (values.remember)
        localStorage.setItem("rememberUser", values.remember);

      const { response, err } = await authApi.login(values);
      setIsRequest(false);

      if (response) {
        dispatch(setUser(response));
        navigate('/home');
        loginForm.resetForm();
      }

      if (err) toast.error(err.message);
    }
  });


  const loginFormCode = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Not a proper email')
    }),
    onSubmit: async values => {
      setIsRequest(true);

      const { response, err } = await authApi.sendLoginCode(values);
      setIsRequest(false);

      if (response) {
        setIsOtp(true);
        setUserEmail(values.email);
        setTimeLeft(60)
        loginForm.resetForm();
        toast.success(response);
      }

      if (err) toast.error(err.message);
    }
  });

  const handleComplete = async (value) => {
    const userData = {
      email: userEmail,
      code: value
    }
    const { response, err } = await authApi.loginWithCode(userData);

    if (response) {
      dispatch(setUser(response));
      setTimeLeft(undefined);
      setIsOtp(false)
      navigate('/home');
    }

    if (err) toast.error(err.message);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={6} lg={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
        }}
      />
      <Grid item xs={12} sm={8} md={6} lg={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>

          <Stack direction="row" alignItems="center" sx={{ position: "absolute", top: 20, left: 20 }}>
            <KeyboardArrowLeftIcon />
            <Typography variant="body1" align="left" >
              <Link color="secondary" to="/home">
                Back Home
              </Link>
            </Typography>
          </Stack>

          <Typography component="h1" variant="h2">
            Sign in
          </Typography>

          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab} aria-label="tabs" textColor="secondary" sx={{ mt: 1 }}>
                <Tab label="with a code" value="2" />
                <Tab label="with a password" value="1" />
              </TabList>
            </Box>

            {/* tabpanel 1 */}
            <TabPanel value="1">
              <Box component="form" onSubmit={loginForm.handleSubmit} sx={{ m: "auto", paddingX: { xs: 2, md: 2, xl: 5 }, width: { xl: "80%" } }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  color="secondary"
                  value={loginForm.email}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.firstname && loginForm.errors.firstname !== undefined}
                  helperText={loginForm.touched.firstname && loginForm.errors.firstname}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  color="secondary"
                  value={loginForm.password}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.firstname && loginForm.errors.firstname !== undefined}
                  helperText={loginForm.touched.firstname && loginForm.errors.firstname}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" name="remember" color="secondary" onChange={loginForm.handleChange} />}
                  label="Remember me"
                />

                <LoadingButton
                  type="submit"
                  fullWidth
                  size="large"
                  variant="outlined"
                  sx={{ marginTop: 3 }}
                  loading={isRequest}
                >
                  Sign In
                </LoadingButton>

                <Grid container mt={2}>
                  <Grid item md={6}>
                    <Typography variant="body1" align="left">
                      <Link to="/forgot-password">
                        Forgot Password?
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="body1" align="right">
                      <Link to="/register">
                        Don't have an account? <span style={{color:"#e78d3d"}}> Sign Up </span>
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: { xs: 2, md: 0 }, position: { xs: "block", md: "fixed" }, right: 20, bottom: 20 }}>
                  {'Copyright © '}
                  <Link to="https://romank.co.il" target="_blank" rel="noreferrer">
                    RK
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
              </Box>
            </TabPanel>
            {/* tabpanel 1 */}


            {/* tabpanel 2 Login with code */}
            <TabPanel value="2">
              <Box component="form" onSubmit={loginFormCode.handleSubmit} sx={{ m: "auto", minWidth: { lg: "450px", xl: "550px" }, paddingX: { xs: 1, md: 2, xl: 1 }, width: { sx: "100%", xl: "80%" } }}>
                {!isOtp ? (
                  <Box >
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      color="secondary"
                      value={loginFormCode.email}
                      onChange={loginFormCode.handleChange}
                      error={loginFormCode.touched.firstname && loginFormCode.errors.firstname !== undefined}
                      helperText={loginFormCode.touched.firstname && loginFormCode.errors.firstname}
                    />

                    <LoadingButton
                      type="submit"
                      fullWidth
                      size="large"
                      variant="outlined"
                      sx={{ marginTop: 3 }}
                      loading={isRequest}
                    >
                      Send me a code
                    </LoadingButton>
                  </Box>
                ) : (
                  <>
                    <MuiOtpInput
                      value={otp}
                      length={6}
                      onChange={handleOtp}
                      validateChar={validateChar}
                      onBlur={loginFormCode.handleBlur}
                      onComplete={handleComplete}
                      TextFieldsProps={{ placeholder: '-' }}
                      sx={{ gap: { xs: 1, md: 2.5 } }}
                    />

                    <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
                  </>
                )}
              </Box>
            </TabPanel>
            {/* tabpanel 2 */}
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;