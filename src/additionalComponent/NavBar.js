import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './css/NavBar.css'

class NavBar extends Component {
	render() {
		return (
			<div>
				<AppBar position="static" color="default" className="navBarContainer">
					<Toolbar>
						<Typography variant="h6" color="inherit">
							Планировщик заданий
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default NavBar;
