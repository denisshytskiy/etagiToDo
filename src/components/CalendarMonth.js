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
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Star from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

import moment from 'moment';
import FormTask from '../containers/FormTaskPage';

import './css/Calendar.css'

class CalendarWeek extends Component {
  componentDidMount(){
    const { dumpMonth } = this.props;
    dumpMonth();
  }
  
  render() {
    const {
      dumpMonth, month, tasks, changeMonth, editTaskFromForm,
      addTask, formTask, cleanForm, editTask, delTask
    } = this.props;
    return (
      <div>
        <Paper className="calendarContainer">
          <p className="calendarTitle">Календарь на месяц</p>
          <p>Месяц с {month.firstMonthDate} по {month.lastMonthDate}</p>
          <div>
            <FormTask
              sendEditTask={(body) => editTaskFromForm(body, {filterType: 'monthGroup', filterProps: month.firstMonthDate})}
              addTask={(body) => addTask(body, {filterType: 'monthGroup', filterProps: month.firstMonthDate})}
              formTask={formTask}
            />
          </div>
          <div className="buttonGroup">
            <div>
              <Button
                className="buttonGroup-button"
                size="small"
                variant="outlined"
                onClick={() => changeMonth({
                selectFirst: month.firstMonthDate,
                selectLast: month.lastMonthDate,
                side: 'prev'
              }
              )}
              >
                Предыдущий месяц
              </Button>
              <Button
                className="buttonGroup-button"
                size="small"
                variant="outlined"
                onClick={dumpMonth}>Текущий месяц</Button>
              <Button
                className="buttonGroup-button"
                size="small"
                variant="outlined"
                onClick={() => changeMonth({
                selectFirst: month.firstMonthDate,
                selectLast: month.lastMonthDate,
                side: 'next'
              }
              )}
              >
                Следующий месяц
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={cleanForm}
              >
                Создать задачу
              </Button>
            </div>
          </div>
          {tasks.length>0 ? tasks.map((d, i) =>
            <ExpansionPanel
              key={i}
              disabled={d.tasks && !d.tasks.length}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="expansionPanelSummaryContainer">
                  <p className="expansionPanelSummaryTitle"><strong>{d.date}</strong>
                  </p>
                  <p className="expansionPanelSummarySubtitle">На этот день запланировано {d.tasks && d.tasks.length} задания(ий)</p>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableHeadName" align="center">
                        Название
                      </TableCell>
                      <TableCell className="tableHeadDescription" align="center">
                        Описание
                      </TableCell>
                      <TableCell className="tableHeadDate" align="center">
                        Дата начала
                      </TableCell>
                      <TableCell className="tableHeadDate" align="center">
                        Дата окончания
                      </TableCell>
                      <TableCell className="tableHeadImportant" align="center">
                        Важность
                      </TableCell>
                      <TableCell className="tableHeadImportant" align="center">
                        Участники
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {d.tasks && d.tasks.map(t =>
                      <TableRow key={t.id}>
                        <TableCell className="tableHeadName" align="center">{t.name}</TableCell>
                        <TableCell className="tableHeadDescription" align="center">
                          <Tooltip TransitionComponent={Fade} title={t.description}>
                            <p>{t.description}</p>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="tableHeadDate" align="center">{moment(t.dateStart).format('DD.MM.YYYY HH:mm')}</TableCell>
                        <TableCell className="tableHeadDate" align="center">{moment(t.dateEnd).format('DD.MM.YYYY HH:mm')}</TableCell>
                        <TableCell className="tableHeadImportant" align="center">
                          <Badge color="secondary" badgeContent={t.important ? t.important : '0'}>
                            <Star />
                          </Badge>
                        </TableCell>
                        <TableCell className="tableHeadImportant" align="center">
                          <Tooltip
                            TransitionComponent={Fade}
                            title={t.members ? t.members.map(member => <p key={member.id}>{member.name}</p>) : ''}>
                            <p>{t.members ? t.members.length : '0'}</p>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => editTask(t.id, {filterType: 'monthGroup', filterProps: month.firstMonthDate})}
                          >
                            Редактировать
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => delTask(t.id, {filterType: 'monthGroup', filterProps: month.firstMonthDate})}
                          >
                            Удалить
                          </Button>
                        </TableCell>
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
