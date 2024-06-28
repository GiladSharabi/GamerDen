import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";
import React from 'react';

type NavBarBaseProps = {
    links: {
        to: string;
        icon: React.ReactNode;
        label: string;
        onClick?: () => void
    }[];
}

const NavBarBase: React.FC<NavBarBaseProps> = ({ links }) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar color="navbar" position="sticky">
                <Toolbar>
                    <IconButton color="primary">
                        <Typography variant="h6">
                            <Link to="/">GamerDen</Link>
                        </Typography>
                    </IconButton>
                    <Grid style={{ flexGrow: 1 }} />
                    {links.map((link, index) => (
                        <Link key={index} to={link.to} onClick={link.onClick}>
                            <IconButton color="primary">
                                {link.icon}
                                <Typography sx={{ ml: 1 }}>{link.label}</Typography>
                            </IconButton>
                        </Link>
                    ))}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default NavBarBase;
