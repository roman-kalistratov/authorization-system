import { Box, Container, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Box component="footer" paddingY={2.5} sx={{ backgroundColor: '#383838' }}>
            <Container maxWidth="xl">
                <Typography variant="body1" color="primary.main" align="center">
                    {"Copyright © "}
                    <Link color="inherit" to="https://www.romank.co.il/" style={{ textDecoration: "none", color: "#e78d3d" }}>
                        RK
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Container>
        </Box >
    )
}

export default Footer;