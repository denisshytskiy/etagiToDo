import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './css/FirstPage.css'
import moment from 'moment';

class CalendarWeek extends Component {
  componentDidMount(){
    const { dumpMonth } = this.props;
    dumpMonth();
  }
  render() {
    const {
      dumpMonth, month, tasks, changeMonth
    } = this.props;
    return (
      <div>
        <Paper>
          <p>Календарь</p><p>Месяц с {month.firstMonthDate} по {month.lastMonthDate}</p>
          <br/>
          <button onClick={() => changeMonth({
            selectFirst: month.firstMonthDate,
            selectLast: month.lastMonthDate,
            side: 'prev'
          }
          )}
          >
            Предыдущая неделя
          </button>
          <button onClick={dumpMonth}>Текущая неделя</button>
          <button onClick={() => changeMonth({
            selectFirst: month.firstMonthDate,
            selectLast: month.lastMonthDate,
            side: 'next'
          }
          )}
          >
            Следующая неделя
          </button>
          {tasks.length>0 ? tasks.map(d =>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <p>
                  {d.date}
                </p>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Название</TableCell>
                      <TableCell align="right">Описание</TableCell>
                      <TableCell align="right">Дата начала</TableCell>
                      <TableCell align="right">Дата окончания</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {d.tasks.map(t =>
                      <TableRow key={t.id}>
                        <TableCell align="center">{t.name}</TableCell>
                        <TableCell align="center">{t.description}</TableCell>
                        <TableCell align="center">{moment(t.dateStart).format('DD.MM.YYYY HH:mm')}</TableCell>
                        <TableCell align="center">{moment(t.dateEnd).format('DD.MM.YYYY HH:mm')}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )  : null }
        </Paper>
      </div>
    );
  }
}

export default CalendarWeek;
