import {Component} from "react";
import React from "react";
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './css/NavigationMenu.css'

class NavigationMenu extends Component {
	render() {
		return (
			<div>
				<div>
					<Paper>
						<ExpansionPanel>
							<ExpansionPanelSummary>
								<Link to="/">
									Список дел
								</Link>
							</ExpansionPanelSummary>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Link to="/week">
									Календарь
								</Link>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className="firstPageList">
								<List className="firstPageListItem">
									<ListItem role={undefined} dense button>
										<Link to="/week">
											Неделя
										</Link>
									</ListItem>
									<ListItem role={undefined} dense button>
										<Link to="/month">
											Месяц
										</Link>
									</ListItem>
								</List>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Paper>
				</div>
			</div>
		);
	}
}

export default NavigationMenu;
