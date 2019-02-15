import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormTask from '../containers/FormTaskPage';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import './css/FirstPage.css'

class ListTasks extends Component {
  state = {
    top: false
  };
  
  componentDidMount() {
    const { searchAllTasks } = this.props;
    searchAllTasks();
  }
  
  editTask = (id) => {
    const { editTask } = this.props;
    editTask(id);
    this.toggleDrawer('top', true)
  };
  
  deleteTask = (id) => {
    const { delTask } = this.props;
    delTask(id);
  };
  
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
    const { cleanForm } = this.props;
    cleanForm();
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
        <div>
          <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
            <FormTask isClose={this.toggleDrawer('top', false)} sendEditTask={sendEditTask} addTask={addTask} formTask={formTask}/>
          </Drawer>
        </div>
          <div className="buttonGroup">
            <div>
              <Button className="buttonGroup-button" size="small" variant="outlined" onClick={searchAllTasks}>Все</Button>
              <Button className="buttonGroup-button" size="small" variant="outlined" onClick={searchTodayTasks}>Сегодня</Button>
              <Button className="buttonGroup-button" size="small" variant="outlined" onClick={searchTomorrowTasks}>Завтра</Button>
              <Button className="buttonGroup-button" size="small" variant="outlined" onClick={searchWeekTasks}>Неделя</Button>
              <Button className="buttonGroup-button" size="small" variant="outlined" onClick={searchMonthTasks}>Месяц</Button>
            </div>
            <div>
              <Button variant="contained" size="small" color="primary" onClick={this.toggleDrawer('top', true)}>Создать задачу</Button>
            </div>
          </div>
          <Divider/>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Название</TableCell>
                <TableCell align="center">Описание</TableCell>
                <TableCell align="center">Дата начала</TableCell>
                <TableCell align="center">Дата окончания</TableCell>
                <TableCell></TableCell>
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
                    <Button onClick={() => this.editTask(t.id)}> Редактировать </Button>
                    <Button onClick={() => this.deleteTask(t.id)}> Удалить </Button>
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
