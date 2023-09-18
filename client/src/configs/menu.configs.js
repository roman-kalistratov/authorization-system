
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "home",
    path: "/home",
    state: "home"
  },
  {
    display: "about",
    path: "/home",
    state: "about"
  }, 
  {
    display: "protected",
    path: "/protected",
    state: "protected"
  }  
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite"
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews"
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update"
  }
];


const menuConfigs = { main, user };

export default menuConfigs;