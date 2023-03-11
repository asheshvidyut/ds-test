import React from "react";
import fetchWithCsrf from "../utils/fetchWithCsrf";
import Referral from "./Referral";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class ListReferral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.getReferral();
    }

    getReferral = () => {
        fetchWithCsrf('/user/' + this.props.user.id + '/referrals', {})
            .then((response) => {
                response.json().then((data) => {
                    this.setState({loading: false,
                        referrals: data
                    })
                })
            })
    }

    render() {
        return <div>
            {this.state.loading ?
                <span>Loading</span> :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Referred Email</TableCell>
                                <TableCell align="right">Referred At</TableCell>
                                <TableCell align="right">Signed Up At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.referrals.map((referral, index) => {
                                return <Referral referral={referral} key={index}></Referral>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    }
}