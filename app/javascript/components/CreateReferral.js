import React from 'react';
import NavBar from "./NavBar";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {validRegex} from "../utils/emailHelper";
import fetchWithCsrf from "../utils/fetchWithCsrf";
import { withRouter } from 'react-router-dom';

class CreateReferral extends React.Component {
    constructor(props) {
        super(props);
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
        window.location.href = "/";
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
        return <div>
            <NavBar></NavBar>
            <Button onClick={this.navigateToHome}>
                Home
            </Button>
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
export default withRouter(CreateReferral)