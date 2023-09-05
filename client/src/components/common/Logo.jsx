import { Typography } from '@mui/material';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Typography variant='subtitle1' color="secondary" fontSize="1.7rem">
      <Link to="/" style={{textDecoration:"none"}}>
      <Typography textAlign="center" color="primary" variant="h6" lineHeight={1}> Authorization <br/> system </Typography>
      </Link>
    </Typography>
  );
};

export default Logo;