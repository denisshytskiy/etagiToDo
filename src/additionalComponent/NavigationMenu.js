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

import './css/NavigationMenu.css'

class NavigationMenu extends Component {
	render() {
		return (
			<div>
				<div>
					<Paper>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								Календарь
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className="firstPageList">
								<List className="firstPageListItem">
									<Link to="/week">
										<ListItem role={undefined} dense button>
											Неделя
										</ListItem>
									</Link>
									<Link to="/month">
										<ListItem role={undefined} dense button>
											Месяц
										</ListItem>
									</Link>
								</List>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<List className="firstPageListItem">
							<Link to="/">
								<ListItem role={undefined} dense button>
								Список дел
								</ListItem>
							</Link>
						</List>
					</Paper>
				</div>
			</div>
		);
	}
}

export default NavigationMenu;
