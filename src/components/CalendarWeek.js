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
    const { dumpWeek } = this.props;
    dumpWeek();
  }
  render() {
    const {
      dumpWeek, changeWeek, week, tasks
    } = this.props;
    return (
      <div>
        <Paper>
          <p>Календарь</p><p>Неделя с {week.firstWeekDate} по {week.lastWeekDate}</p>
          <br/>
          <button onClick={() => changeWeek({
            selectFirst: week.firstWeekDate,
            selectLast: week.lastWeekDate,
            side: 'prev'
          }
          )}
          >
            Предыдущая неделя
          </button>
          <button onClick={dumpWeek}>Текущая неделя</button>
          <button onClick={() => changeWeek({
            selectFirst: week.firstWeekDate,
            selectLast: week.lastWeekDate,
            side: 'next'
          }
          )}
          >
            Следующая неделя
          </button>
          {tasks.map(d =>
            <ExpansionPanel key={d.date} disabled={!d.tasks.length}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <p>
                  {d.date} {d.tasks.length}
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
          )}
        </Paper>
      </div>
    );
  }
}

export default CalendarWeek;
