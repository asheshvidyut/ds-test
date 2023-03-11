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
import {validRegex} from "../utils/emailHelper";

export default class SingUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidEmail: false,
            invalidPassword: false,
            invalidEmailError: '',
            invalidPasswordError: ''
        }
    }

    signup = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if (email.match(validRegex) && password.length > 0) {
            let newState = {...this.state};
            newState.invalidPassword = false;
            newState.invalidEmail = false;
            newState.invalidEmailError = '';
            newState.invalidPasswordError = '';
            this.setState(newState);
            let formData = new FormData();
            formData.append("user[email]", email);
            formData.append("user[password]", password);
            formData.append("user[password_confirmation]", password);
            formData.append("commit", "Sign Up")
            fetch("/users/", {method: 'POST',
                body: formData}).then((response) => {
                response.json().then((data) => {
                    if (response.status === 201) {
                        window.location.href = "/signin";
                    } else {
                        if (data && data.errors) {
                            this.setState({
                                invalidEmailError: 'Email ' + data.errors.email.join(" "),
                                invalidPasswordError: 'Email ' + data.errors.password.join(" "),
                                invalidEmail: true
                            });
                        }
                    }
                })
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
            <Container maxWidth="sm" className='maxHeight formContainer'>
                <div className='signinForm'>
                    <p className='textAlignCenter'>
                        Sign Up
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
                        {this.state.invalidEmailError ?
                            <span>{this.state.invalidEmailError}</span> : null
                        }
                        {this.state.invalidPasswordError ?
                            <span>{this.state.invalidPasswordError}</span> : null
                        }
                        <div className='formbtn'>
                            <Button variant="text" onClick={this.signup}>Register</Button>
                            <Button variant="text" onClick={() => {
                                window.location.href = "/signin";
                            }
                            }>Sign In</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>)
    }
};