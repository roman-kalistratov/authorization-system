import { useState } from "react";
import { Box, Grid, TextField, Paper, Typography, Stack } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MuiFileInput } from 'mui-file-input'
import { MuiTelInput } from 'mui-tel-input'
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authApi from "../api/modules/auth.api";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp"
];

const SignupForm = () => {
  const [isRegisterRequest, setIsRegisterRequest] = useState(false);
  const [errorFileMessage, setErrorFileMessage] = useState(undefined);
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState('+972');
  const navigate = useNavigate();

  const handleChangeFile = (newFile) => {
    setErrorFileMessage(undefined)
    if (newFile) {
      newFile.size > 400000 ? setErrorFileMessage("Max allowed size is 400KB") :
        SUPPORTED_FORMATS.includes(newFile.type) ? setFile(newFile) : setErrorFileMessage("Not a valid image type")
    } else {
      setFile(null)
    }
  }

  const handleChangePhone = (newPhone) => {
    setPhone(newPhone)
  }

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
      setErrorFileMessage(undefined);
      setIsRegisterRequest(true);
      setFile(null);
      const formData = new FormData();

      let newData = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,       
        phone: phone.replace(/\s/g, '')
      }
      formData.append('data', JSON.stringify(newData));
      formData.append('file', file);

      const { response, err } = await authApi.register(formData);
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
    grid: `xs={6} sm={6}`
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
    required: true
  }, {
    type: "password",
    label: "Password",
    name: 'password',
    value: registerForm.values.password,
    required: true
  }, {
    type: "password",
    label: "Confirm Password",
    name: 'confirmPassword',
    value: registerForm.values.confirmPassword,
    required: true
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

          <Box component="form" onSubmit={registerForm.handleSubmit} sx={{ mt: 1, paddingX: { xs: 2, md: 2, xl: 5 }, width: { xl: "80%" } }}>
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
                    error={registerForm.touched.firstname && registerForm.errors.firstname !== undefined}
                    helperText={registerForm.touched.firstname && registerForm.errors.firstname}
                  />
                </Grid>
              ))}


              <Grid item xs={12} sm={6}>
                <MuiTelInput value={phone} required margin="normal" fullWidth onChange={handleChangePhone} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <MuiFileInput value={file}
                  placeholder="Select an avatar"
                  fullWidth
                  margin="normal"
                  onChange={handleChangeFile}
                  error={errorFileMessage && errorFileMessage !== undefined}
                  helperText={errorFileMessage}
                />
              </Grid>
            </Grid>

            <Typography variant="body1" marginY={1.5}>
              By creating an account, you agree to our
              <Link to="/register" style={{textDecoration:"underline",marginLeft:"4px"}}>Terms & Conditions,</Link>
              <span style={{marginLeft:"4px"}}>and</span>
              <Link to="/register" style={{textDecoration:"underline",marginLeft:"4px"}}>Privacy Policy</Link>
            </Typography>

            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              loading={isRegisterRequest}
            >
              Continue
            </LoadingButton>

            <Typography variant="body1" align="left" sx={{ mt: 2, alignSelf: "flex-end" }}>
              <Link color="secondary" to="/">
                Already have an account? <span style={{color:"#e78d3d"}}> Sign in </span>
              </Link>
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: { xs: 2, md: 0 }, position: { xs: "block", md: "fixed" }, right: 20, bottom: 20 }}>
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



