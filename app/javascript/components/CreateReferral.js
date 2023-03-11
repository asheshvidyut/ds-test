import React from 'react';
import NavBar from "./NavBar";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {validRegex} from "../utils/emailHelper";
import fetchWithCsrf from "../utils/fetchWithCsrf";

export default class CreateReferral extends React.Component {
    constructor() {
        super();
        this.getUserDetails();
        this.state = {
            invalidEmail: null
        }
    }

    createReferral = () => {
        let email = document.getElementById("email").value;
        if (email.match(validRegex)) {
            fetchWithCsrf('/user/' + this.state.user.id + '/referrals', {method: 'POST', body: JSON.stringify({
                email: email
            })}, true).then((response) => {
                if (response.status === 201) {
                    window.location.href = '/';
                }
                else {
                    response.json().then((data) => {
                        this.setState({invalidEmail: data.message})
                    })
                }
            })
        }
        else {
            this.setState({invalidEmail: "Email invalid"})
        }
    }

    navigateToHome = () => {
        this.props.history.push('/');
    }

    getUserDetails = () => {
        fetch('/user_details').then((response) => {
            response.json().then((data) => {
                this.setState({user: data})
            })
        })
    }

    render() {
        return <div>
            <NavBar></NavBar>
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
                <Button onClick={this.navigateToHome}>
                    Home
                </Button>
            </div>
            <div>
                <div className='createReferralForm'>
                    {this.state.invalidEmail ?
                        <TextField error label="Email" variant="outlined" id="email" type="email"/>
                        : <TextField label="Email" variant="outlined" id="email" type="email"/>
                    }
                    <p>
                        {this.state.invalidEmail}
                    </p>
                    <Button variant="text" onClick={this.createReferral}>Create Referral</Button>
                </div>
            </div>
        </div>
    }
}