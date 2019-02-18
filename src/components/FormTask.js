import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MembersForm from './MembersForm';

import './css/FormTask.css'

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
		const {formTask, sendEditTask} = this.props;
		sendEditTask(formTask);
	};
	
	render() {
		const { formTask, isOpenForm, closeForm } = this.props;
		return (
			<div>
				<Drawer
					anchor="top"
					open={isOpenForm}
					onClose={closeForm}
				>
					<div className="formContainer">
						<div className="formContainer-left">
							<TextField
								className="formInputName"
								label="Название задачи"
								inputProps={{ maxLength: "40"}}
								value={formTask.name}
								helperText="Обязательное поле для заполнения"
								onChange={(e) => this.changeField('name', e.target.value)}
								margin="normal"
								fullWidth
								required={true}
							/>
							<TextField
								className="formInputDate"
								label="Дата начала задачи"
								type="datetime-local"
								value={formTask.dateStart}
								onChange={(e) => this.changeField('dateStart', e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Дата окончания задачи"
								type="datetime-local"
								inputProps={{ min: formTask.dateStart}}
								value={formTask.dateEnd}
								helperText="Дата окончания не может быть раньше даты начала"
								onChange={(e) => this.changeField('dateEnd', e.target.value)}
								margin="normal"
							/>
							<TextField
								label="Описание задачи"
								inputProps={{ maxLength: "70"}}
								multiline
								helperText="Обязательное поле для заполнения"
								rowsMax="4"
								value={formTask.description}
								onChange={(e) => this.changeField('description', e.target.value)}
								margin="normal"
								fullWidth
								required={true}
							/>
							<TextField
								label="Важность"
								type="number"
								inputProps={{ min: "0", max: "5", step: "1", maxLength: "1"}}
								value={formTask.important ? formTask.important : "0"}
								onChange={(e) => this.changeField('important', e.target.value)}
								margin="normal"
							/>
							<div>
							<Button
								type="submit"
								size="small"
								variant="contained"
								color="primary"
								className="buttonControls"
								disabled={formTask.name.length===0 || formTask.description.length===0 || formTask.important > 5  || formTask.dateEnd < formTask.dateStart}
								onClick={(formTask.typeForm === 'create') ? this.addTask : this.editTask}
							>
								{(formTask.typeForm === 'create') ? 'Создать' : 'Редактировать'}
							</Button>
							<Button
								size="small"
								variant="contained"
								onClick={closeForm}
							>
								Закрыть
							</Button>
							</div>
						</div>
						<div className="formContainer-right">
							<MembersForm
								members = {formTask.members}
								updateMembers={(arr) => this.changeField('members', arr)}
							/>
						</div>
					</div>
				</Drawer>
			</div>
		)
	}
}

export default FormTask;
