
import React from 'react';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{
      marginTop: { xs: "-64px" }
    }}>
      <img
        src="https://source.unsplash.com/random?wallpapers" 
        alt="bg-home"
        style={{
          width: "100%",
          height: "100vh",
          maxHeight: "100vh",
          position: "absolute",
          zIndex: "-1",
          objectFit: "cover"
        }}
      />
    </Box>
  )
}

export default Home





