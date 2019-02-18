import React from 'react';
import uuid from 'uuid/v4';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

import './css/FormTask.css'

class MembersForm extends React.PureComponent {
	addMembers = () => {
		const { members, updateMembers } = this.props;
		let editMembers = (members) ? [...members] : [];
		if (this.input.value) {
			editMembers.push({
				id: uuid(),
				name: this.input.value
			})
		}
		updateMembers(editMembers);
		this.input.value = null
	};
	
	deleteMembers = (id) => {
		const { members, updateMembers } = this.props;
		const editMembers = members.filter(members => members.id !== id);
		updateMembers(editMembers);
	};
	
	render() {
		const { members } = this.props;
		return (
			<div>
				<div className="membersAdd">
					<TextField
						label="Имя участника"
						inputProps={{ maxLength: "15"}}
						inputRef={ref => {this.input = ref}} />
					<Button
						variant="contained"
						className="roundedButton-add"
						onClick={() => this.addMembers()} > <AddIcon/> </Button>
				</div>
				{
					members ?
						members.reverse().map(members =>
						<div key={members.id}>
							<div className="membersList" key={members.id}>
								<p>{members.name}</p>
								<Button className="roundedButton-delete" onClick={() => this.deleteMembers(members.id)}><DeleteIcon /></Button>
							</div>
							<Divider />
						</div>
						) : null
				}
			</div>
		);
	}
}
export default MembersForm;
