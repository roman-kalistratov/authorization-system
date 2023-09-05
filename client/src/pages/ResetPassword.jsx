import * as Yup from "yup";
import React, { useState } from "react";
import { Box, Grid, Stack, TextField, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import userApi from "../api/modules/user.api";

const ResetPassword = () => {
    const { token } = useParams();
    const [isRequest, setIsRequest] = useState(false);
    const navigate = useNavigate();

    const resetPasswordForm = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(3, "password minimum 3 characters")
                .required("password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "confirmPassword not match")
                .min(3, "confirmPassword minimum 3 characters")
                .required("confirmPassword is required")
        }),
        onSubmit: async values => {
            setIsRequest(true);

            const { response, err } = await userApi.resetPassword(values, token);

            if (response) {
                navigate('/')
                toast.success("Reset password success");
            }
            if (err) toast.error(err.message);

            setIsRequest(false)
            resetPasswordForm.resetForm();
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
                                Home
                            </Link>
                        </Typography>
                    </Stack>

                    <Typography component="h1" variant="h2">
                        Reset Password
                    </Typography>

                    <Box component="form" onSubmit={resetPasswordForm.handleSubmit} sx={{ mt: 1, paddingX: { xs: 2, md: 2, xl: 5 }, width: { xl: "80%" } }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            color="secondary"
                            type="password"
                            label="Password"
                            name="password"
                            value={resetPasswordForm.values.password}
                            onChange={resetPasswordForm.handleChange}
                            error={resetPasswordForm.touched.password && resetPasswordForm.errors.password !== undefined}
                            helperText={resetPasswordForm.touched.password && resetPasswordForm.errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            color="secondary"
                            type="password"
                            label="Confirm Password"
                            name='confirmPassword'
                            value={resetPasswordForm.values.confirmPassword}
                            onChange={resetPasswordForm.handleChange}
                            error={resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword !== undefined}
                            helperText={resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword}
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

export default ResetPassword