import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import moment from 'moment';
import FormTask from '../containers/FormTaskPage';
import Tasks from './Tasks';

import './css/ListTask.css'

class ListTasks extends PureComponent {
  componentDidMount() {
    const { searchTasks } = this.props;
    searchTasks({filterType: 'all', selectedButton: 'all'});
  }
  
  render() {
    const {
      tasks, formTask, addTask, editTaskFromForm,
      searchTasks, cleanForm, selectedButton, editTask, delTask
    } = this.props;
    return (
      <div>
        <Paper>
        <div>
          <FormTask
            sendEditTask={(body) => editTaskFromForm(body, selectedButton)}
            addTask={(body) => addTask(body, selectedButton)}
            formTask={formTask}
          />
        </div>
          <p className="listTitle">Список дел</p>
          <div className="buttonGroup">
            <div>
              <Button
                className="buttonGroup-button"
                size="small"
                variant={selectedButton === 'all' ? "contained" : "outlined"}
                onClick={() => searchTasks({selectedButton: 'all', filterType: 'all'})}
              >
                Все
              </Button>
              <Button
                className="buttonGroup-button"
                size="small"
                variant={selectedButton === 'today' ? "contained" : "outlined"}
                onClick={() => searchTasks({ selectedButton: 'today', filterType: 'day', filterProps: moment().format("DD-MM-YYYY")})}
              >
                Сегодня
              </Button>
              <Button
                className="buttonGroup-button"
                size="small"
                variant={selectedButton === 'tomorrow' ? "contained" : "outlined"}
                onClick={() => searchTasks({ selectedButton: 'tomorrow', filterType: 'day', filterProps: moment().add(1, 'day').format("DD-MM-YYYY")})}
              >
                Завтра
              </Button>
              <Button
                className="buttonGroup-button"
                size="small"
                variant={selectedButton === 'week' ? "contained" : "outlined"}
                onClick={() => searchTasks({ selectedButton: 'week', filterType: 'weekList'})}

              >
                Неделя
              </Button>
              <Button
                className="buttonGroup-button"
                size="small"
                variant={selectedButton === 'month' ? "contained" : "outlined"}
                onClick={() => searchTasks({ selectedButton: 'month', filterType: 'monthList'})}
              >
                Месяц
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => cleanForm(selectedButton)}
              >
                Создать задачу
              </Button>
            </div>
          </div>
          <Divider/>
          <Tasks {...this.props} />
        </Paper>
      </div>
    );
  }
}

export default ListTasks;
