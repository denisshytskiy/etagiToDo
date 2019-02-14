import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormTask from '../containers/FormTaskPage';
import moment from 'moment';

import './css/FirstPage.css'

class ListTasks extends Component {
  componentDidMount() {
    const { searchAllTasks } = this.props;
    searchAllTasks();
  }
  newTask = () => {
    const { cleanForm } = this.props;
    cleanForm()
  };
  editTask = (id) => {
    const { editTask } = this.props;
    editTask(id);
  };
  deleteTask = (id) => {
    const { delTask } = this.props;
    delTask(id);
  };
  render() {
    const {
      tasks, formTask, addTask, sendEditTask,
      searchAllTasks, searchTodayTasks, searchTomorrowTasks,
      searchWeekTasks, searchMonthTasks
    } = this.props;
    return (
      <div>
        <Paper>
          <button onClick={this.newTask}>Новая таска</button>
        <div>
          <FormTask sendEditTask={sendEditTask} addTask={addTask} formTask={formTask}/>
        </div>
          <button onClick={searchAllTasks}>Все</button>
          <button onClick={searchTodayTasks}>Сегодня</button>
          <button onClick={searchTomorrowTasks}>Завтра</button>
          <button onClick={searchWeekTasks}>Неделя</button>
          <button onClick={searchMonthTasks}>Месяц</button>
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
              {tasks.map(t =>
                <TableRow key={t.id}>
                  <TableCell align="center">{t.name}</TableCell>
                  <TableCell align="center">{t.description}</TableCell>
                  <TableCell align="center">{moment(t.dateStart).format('DD.MM.YYYY HH:mm')}</TableCell>
                  <TableCell align="center">{moment(t.dateEnd).format('DD.MM.YYYY HH:mm')}</TableCell>
                  <TableCell align="center">
                    <button onClick={() => this.editTask(t.id)}> red </button>
                    <button onClick={() => this.deleteTask(t.id)}> удалить </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default ListTasks;
