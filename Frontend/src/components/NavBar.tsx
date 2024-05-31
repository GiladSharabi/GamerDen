import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <a href="/user-loggedin-homepage">GamerDen</a>
                    </Typography>
                </IconButton>
                <div style={{ flexGrow: 1 }} />
                <IconButton color="inherit" aria-label="home">
                    <HomeIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                        <a href="/user-loggedin-homepage">Home</a>
                    </Typography>
                </IconButton>

                <IconButton color="inherit" aria-label="account">
                    <AccountCircleIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                        <a href="/account">Account</a>
                    </Typography>
                </IconButton>

                <IconButton color="inherit" aria-label="logout">
                    <ExitToAppIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                        <a href="/">Logout</a>
                    </Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
