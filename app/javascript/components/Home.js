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
import ListReferral from "./ListReferral";
import NavBar from "./NavBar";
import {withRouter} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.getUserDetails();
        this.state = {
            user: null
        }
    }

    getUserDetails = () => {
        fetch('/user_details').then((response) => {
            response.json().then((data) => {
                this.setState({user: data})
                console.log(data);
            })
        })
    }

    navigateToCreateReferral = () => {
        this.props.history.push("/create-referral")
    }

    signOut = () => {
        const token = document.querySelector('[name=csrf-token]').content
        fetchWithCsrf('/users/sign_out', {method: 'DELETE'}).then((response) => {
            window.location.href = '/signin';
        });
    }


    render() {
        return (<div>
            <NavBar></NavBar>
            <Button onClick={this.navigateToCreateReferral}>
                Create Referral
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
            {this.state.user ?
                <div className='referrals'>
                    <ListReferral user={this.state.user} />
                </div>
                : null
            }
        </div>)
    }
};
export default withRouter(Home);