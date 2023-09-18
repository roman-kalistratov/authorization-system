import { useState } from "react";
import { Box, Grid, TextField, Paper, Typography, Stack } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authApi from "../api/modules/auth.api";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const SignupForm = () => {
  const [isRegisterRequest, setIsRegisterRequest] = useState(false);
  const navigate = useNavigate();

  const registerForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(3, "firstname minimum 3 characters")
        .required("firstname is required"),
      email: Yup.string().email('Not a proper email'),
      password: Yup.string()
        .min(3, "password minimum 3 characters")
        .required("password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password not match")
        .min(3, "confirmPassword minimum 3 characters")
        .required("confirmPassword is required")
    }),
    onSubmit: async values => {
      setIsRegisterRequest(true);

      const { response, err } = await authApi.register(values);
      setIsRegisterRequest(false);

      if (response) {
        navigate('/');
        registerForm.resetForm();
        toast.success(response);
      }

      if (err) toast.error(err.message);
    }
  });


  const formInputs = [{
    type: "text",
    label: "First Name",
    name: 'firstname',
    value: registerForm.values.firstname,
    required: true,
    grid: `xs={6} sm={6}`,
    error: registerForm.touched.firstname && registerForm.errors.firstname !== undefined,
    helperText: registerForm.touched.firstname && registerForm.errors.firstname
  }, {
    type: "text",
    label: "Last Name",
    name: 'lastname',
    value: registerForm.values.lastname,
    required: false,
    grid: `xs={6} sm={6}`
  }, {
    type: "email",
    label: "Email Address",
    name: 'email',
    value: registerForm.values.email,
    required: true,
    error: registerForm.touched.email && registerForm.errors.email !== undefined,
    helperText: registerForm.touched.email && registerForm.errors.email
  }, {
    type: "password",
    label: "Password",
    name: 'password',
    value: registerForm.values.password,
    required: true,
    error: registerForm.touched.password && registerForm.errors.password !== undefined,
    helperText: registerForm.touched.password && registerForm.errors.password
  }, {
    type: "password",
    label: "Confirm Password",
    name: 'confirmPassword',
    value: registerForm.values.confirmPassword,
    required: true,
    error: registerForm.touched.confirmPassword && registerForm.errors.confirmPassword !== undefined,
    helperText: registerForm.touched.confirmPassword && registerForm.errors.confirmPassword
  }]


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
            paddingY: { xs: 4, md: 0 },
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

          <Typography component="h1" variant="h2" mt={3}>
            Register            
          </Typography>         

          <Box component="form" onSubmit={registerForm.handleSubmit} sx={{ paddingX: { xs: 2, md: 2, xl: 3 }, width: { xl: "80%" } }}>
            <Grid container columnSpacing={2}>
              {formInputs.map((input, index) => (
                <Grid key={index} item xs={input.type === "email" ? 12 : 6} sm={input.type === "email" ? 0 : 6}>
                  <TextField
                    margin="normal"
                    required={input.required}
                    fullWidth
                    color="secondary"
                    type={input.type}
                    label={input.label}
                    name={input.name}
                    value={input.value}
                    onChange={registerForm.handleChange}
                    error={input.error}
                    helperText={input.helperText}
                  />
                </Grid>
              ))}
            </Grid>

            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              sx={{ marginTop: 2 }}
              loading={isRegisterRequest}
            >
              Continue
            </LoadingButton>

            <Typography variant="body1" align="center" sx={{ mt: 2, alignSelf: "flex-end" }}>
              <Link color="secondary" to="/">
                Already have an account? <span style={{ color: "#e78d3d", marginLeft: ".2rem" }}> Sign in </span>
              </Link>
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: { xs: 6, md: 0 }, position: { xs: "block", md: "fixed" }, right: 20, bottom: 20 }}>
            {'Copyright © '}
            <Link color="secondary" to="https://romank.co.il" target="_blank" rel="noreferrer">
              RK
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignupForm;



