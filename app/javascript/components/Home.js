import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import fetchWithCsrf from "../utils/fetchWithCsrf";

export default class Home extends React.Component {
    constructor() {
        super();
        this.getUserDetails();
        this.state = {
            user: null
        }
    }

    getUserDetails = () => {
        fetch('/user_details').then((response) => {
            response.json().then((data) => {
                this.setState({user: data})
            })
        })
    }

    signOut = () => {
        const token = document.querySelector('[name=csrf-token]').content
        fetchWithCsrf('/users/sign_out', {method: 'DELETE'}).then((response) => {
            window.location.href = '/signin';
        });
    }


    render() {
        return (<div>
            <AppBar position="static">
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
            <div className='signOutBar'>
                <p>
                    {this.state.user ?
                        <span>{this.state.user.email}</span>
                        : null
                    }
                </p>
                <Button onClick={this.signOut}>
                    Sign Out
                </Button>
            </div>
        </div>)
    }
};