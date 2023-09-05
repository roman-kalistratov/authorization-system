import { createTheme } from "@mui/material/styles";

const themeConfigs = createTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
    h1: {      
      fontFamily: "Lora, sans-serif",     
      letterSpacing:2
    },  
    h2: {      
      fontFamily: "Lora, sans-serif",
      fontSize:35,
      letterSpacing:2
    },  
    subtitle1: {   
      fontFamily: "Lora, sans-serif",  
      fontSize: 20
    },   
    body2: {          
      fontWeight:600,
      opacity:.9,
      fontSize: 15
    },   
  },
  palette: {
    primary: {
      main: "#f3e9e8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e78d3d",
    }   
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '.9rem',
          color:"#000",
          borderColor:"#e78d3d",
          borderRadius:0,
          textTransform:"capitalize",
          transition:"transform .2s linear",
          "&:hover":{
           
            // boxShadow:"0px 2px 3px -1px rgba(0, 0, 0, 0.67)",
            borderColor:"#a7a7a7",
          }
        },
      },
    },
  },  
});

export default themeConfigs;
