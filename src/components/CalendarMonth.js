import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './css/FirstPage.css'

class CalendarMonth extends Component {
  render() {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Second PPPPPPAGE</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat</TableCell>
                <TableCell align="right">Carbs</TableCell>
                <TableCell align="right">Protein</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">123</TableCell>
                <TableCell align="right">222</TableCell>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">44</TableCell>
                <TableCell align="right">55</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default CalendarMonth;
