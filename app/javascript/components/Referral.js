import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Moment from 'moment';

export default class Referral extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {this.props.referral.email}
                </TableCell>
                <TableCell align="right">{Moment(this.props.referral.created_at).format("LLL")}</TableCell>
                <TableCell align="right">{this.props.referral.signed_up ?
                    Moment(this.props.referral.signed_up).format("LLL") : '-'}</TableCell>
            </TableRow>
        )
    }
}