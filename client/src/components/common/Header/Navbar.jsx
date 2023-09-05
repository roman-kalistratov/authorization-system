import React from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, MenuItem, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setAppState } from "../../../redux/features/appStateSlice";
import { Link } from 'react-router-dom';
import menuConfigs from '../../../configs/menu.configs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const Navbar = ({handleDrawerToggle, mobileOpen}) => {   
    const { appState } = useSelector((state) => state.appState);
    const dispatch = useDispatch();  

    const drawer = (
        <Box>
            <Toolbar sx={{ display: 'flex', justifyContent: "flex-end" }}>
                <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            {menuConfigs.main.map((item, index) => (
                <Box key={index}>
                    <MenuItem onClick={handleDrawerToggle} sx={{ justifyContent: "center" }}>
                        <Typography textAlign="center" textTransform="capitalize">{item.state}</Typography>
                    </MenuItem>
                    <Divider />
                </Box>
            ))}
        </Box>
    );
  
    return (
        <>
            {/* desktop */}
            <List dense sx={{ mx: "auto", display: { xs: 'none', md: 'flex' }, position: "relative" }}>
                {menuConfigs.main.map((item, index) => (
                    <ListItemButton
                        key={item.state + index}
                        sx={{
                            color: appState.includes(item.state) ? "unset" : "unset",
                            "&:before": {
                                content: '""',
                                left: "50%",
                                transform: "translateX(-50%)",
                                bottom: "5px",
                                width: appState.includes(item.state) ? "80%" : "0",
                                height: "1px",
                                position: "absolute",
                                backgroundColor: "white",
                                transition: "all .2s ease-in-out"
                            },
                            "&:hover": {
                                backgroundColor: "transparent"
                            },
                            "&:hover:before": {
                                width: "80%",
                                left: "50%",
                                transform: "translateX(-50%)"
                            }
                        }}
                        onClick={() => dispatch(setAppState(item.state))}
                        component={Link}
                        to={item.path}
                        disableRipple
                        variant="raised"
                    >

                        <ListItemText
                            disableTypography
                            primary={<Typography
                                textTransform="capitalize"
                                color="primary"
                                fontSize="1.1rem"
                                fontWeight="500">
                                {item.display}
                            </Typography>} />
                    </ListItemButton>
                ))}
            </List>
            {/* desktop */}

            {/* mobile */}
            <Drawer               
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    zIndex: "9999",
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            {/* mobile */}
        </>
    )
}

export default Navbar