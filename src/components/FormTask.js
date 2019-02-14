import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class FormTask extends Component {
	changeField = (field, value) => {
		const { changeField } = this.props;
		const changes = {};
		changes[field] = value;
		changeField(changes);
	};
	
	addTask = () => {
		const {formTask, addTask} = this.props;
		addTask(formTask);
	};
	
	editTask = () => {
		const {formTask, editTaskFromForm} = this.props;
		editTaskFromForm(formTask);
	};
	
	render() {
		const { formTask } = this.props;
		return (
			<div>
				<TextField
					id="standard-name"
					label="Название задачи"
					value={formTask.name}
					onChange={(e) => this.changeField('name', e.target.value)}
					margin="normal"
				/>
				<br />
				<TextField
					id="standard-name"
					label="Описание задачи"
					multiline
					rowsMax="4"
					value={formTask.description}
					onChange={(e) => this.changeField('description', e.target.value)}
					margin="normal"
				/>
				<br />
				<TextField
					id="datetime-local"
					label="Дата начала задачи"
					type="datetime-local"
					value={formTask.dateStart}
					onChange={(e) => this.changeField('dateStart', e.target.value)}
				/>
				<br />
				<TextField
					id="datetime-local"
					label="Дата окончания задачи"
					type="datetime-local"
					value={formTask.dateEnd}
					onChange={(e) => this.changeField('dateEnd', e.target.value)}
				/>
				<br />
				<button onClick={(formTask.type === 'create') ? this.addTask : this.editTask}>{(formTask.type === 'create') ? 'создать' : 'редактировать'}</button>
			</div>
		)
	}
}

export default FormTask;
