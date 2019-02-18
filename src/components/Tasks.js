import React, { PureComponent } from 'react';
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

import './css/ListTask.css'

class Tasks extends PureComponent {
	render() {
		const {
			tasks, selectedButton, editTask, delTask
		} = this.props;
		return (
			<div>
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
						{tasks.map((t, i) =>
							<TableRow key={i}>
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
										title={(t.members && t.members.length>0) ? t.members.map(member => <p key={member.id}>{member.name}</p>) : ''}>
										<p>{t.members ? t.members.length : '0'}</p>
									</Tooltip>
								</TableCell>
								<TableCell align="center">
									<Button
										size="small"
										color="primary"
										onClick={() => editTask(t.id, selectedButton)}
									>
										Редактировать
									</Button>
									<Button
										size="small"
										color="secondary"
										onClick={() => delTask(t.id, selectedButton)}
									>
										Удалить
									</Button>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		);
	}
}

export default Tasks;
