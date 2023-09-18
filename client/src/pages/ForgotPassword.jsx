import * as Yup from "yup";
import React, { useState } from "react";
import { Box, Grid, Stack, TextField, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import userApi from "../api/modules/user.api";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ForgotPassword = () => {
    const [isRequest, setIsRequest] = useState(false);
    const navigate = useNavigate();

    const forgotPassword = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Not a proper email')
        }),
        onSubmit: async values => {
            setIsRequest(true);

            const { response, err } = await userApi.forgotPassword(values);

            if (response) {
                navigate('/home')
                toast.success(response);
            }
            if (err) {
                toast.error(err.message)
            }
            setIsRequest(false)
            forgotPassword.resetForm();
        },
    });
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
                            <Link color="secondary" to="/">
                                Back
                            </Link>
                        </Typography>
                    </Stack>

                    <Typography component="h1" variant="h2" align="center">
                        Forgot Password
                    </Typography>

                    <Typography variant="body1" align="center" maxWidth="80%">
                        We will send you an email to reset your password
                    </Typography>

                    <Box component="form" onSubmit={forgotPassword.handleSubmit} sx={{ mt: 1, paddingX: { xs: 2, md: 2, xl: 5 }, width: { xl: "80%" } }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            color="secondary"
                            value={forgotPassword.email}
                            onChange={forgotPassword.handleChange}
                            error={forgotPassword.touched.email && forgotPassword.errors.email !== undefined}
                            helperText={forgotPassword.touched.email && forgotPassword.errors.email}
                        />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            size="large"
                            variant="outlined"
                            sx={{ marginTop: 3 }}
                            loading={isRequest}
                        >
                            Submit
                        </LoadingButton>

                        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: { xs: 2, md: 0 }, position: { xs: "block", md: "fixed" }, right: 20, bottom: 20 }}>
                            {'Copyright © '}
                            <Link color="secondary" to="https://romank.co.il" target="_blank" rel="noreferrer">
                                RK
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ForgotPassword