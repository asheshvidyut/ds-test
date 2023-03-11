import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
export default class NavBar extends React.Component {
    render() {
        return<AppBar position="static">
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    marginLeft: '10px'
                }}
            >
                DIRECTSHIFT
            </Typography>
        </AppBar>
    }
}