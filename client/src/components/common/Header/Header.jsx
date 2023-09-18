import React, { useState } from 'react';

import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Box, AppBar, Toolbar, Container } from '@mui/material';

import Navbar from './Navbar';
import ProfileSection from './ProfileSection';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Logo';

const ResponsiveAppBar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr:"-85px" }}>
            <Logo />
          </Box>
          {matchUpMd && <Navbar />}
          {/* desctop */}


          {/* mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
              sx={{ p: 0 }}
            >
              <MenuIcon fontSize="1rem" />
            </IconButton>

            <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          </Box>

          <Box sx={{ m: "auto", display: { xs: 'flex', md: 'none' } }}>
            <Logo />
          </Box>
          {/* mobile */}

          <ProfileSection />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
