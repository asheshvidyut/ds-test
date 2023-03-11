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
import {TextField} from "@mui/material";

export default class SignInForm extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidEmail: false,
            invalidPassword: false,
            invalidEmailOrPasswordError: '',
        }
    }

    signin = () => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (email.match(validRegex) && password.length > 0) {
            let newState = {...this.state};
            newState.invalidPassword = false;
            newState.invalidEmail = false;
            this.setState(newState);
            let formData = new FormData();
            formData.append("user[email]", email);
            formData.append("user[password]", password);
            formData.append("user[remember_me]", 0);
            formData.append("commit", "Log in")
            fetch("/users/sign_in", {method: 'POST',
                body: formData}).then((response) => {
                console.log(response)
                if (response.status === 200) {
                    window.location.href = "/";
                } else {
                    this.setState({invalidEmailOrPasswordError: true})
                }
            });
        }
        else {
            let newState = {...this.state};
            if (!email.match(validRegex)) {
                newState.invalidEmail = true;
            }
            if (!(password.length > 0)) {
                newState.invalidPassword = true;
            }
            this.setState(newState);
        }
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
            <Container maxWidth="sm">
                <p className='textAlignCenter'>
                    Sign In
                </p>
                <div className='signinForm'>
                    {this.state.invalidEmail ?
                        <TextField error label="Email" variant="outlined" id="email" type="email"/>
                        : <TextField label="Email" variant="outlined" id="email" type="email"/>
                    }
                    {this.state.invalidPassword ?
                        <TextField error label="Password" variant="outlined" id="password" type="password"/>
                        : <TextField label="Password" variant="outlined" id="password" type="password"/>
                    }
                    {this.state.invalidEmailOrPasswordError ?
                        <span>Invalid Email or password.</span>
                        : null
                    }
                    <Button variant="text" onClick={this.signin}>Login</Button>
                </div>
            </Container>
        </div>)
    }
};