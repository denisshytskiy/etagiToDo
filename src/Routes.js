import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import ListTasksPage from './containers/ListTasksPage';
import CalendarWeekPage from './containers/CalendarWeekPage';
import CalendarMonthPage from './containers/CalendarMonthPage';
import NavBar from './additionalComponent/NavBar'
import NavigationMenu from './additionalComponent/NavigationMenu'
import './MainPage.css'

export default () => (
  <App>
    <div>
      <NavBar/>
      <div className="firstPageContainer">
        <div className="firstPageLeft">
          <NavigationMenu/>
        </div>
        <div className="firstPageRight">
        <Switch>
            <Route path="/month" component={CalendarMonthPage} />
            <Route path="/week" component={CalendarWeekPage} />
            <Route path="/" component={ListTasksPage} />
          </Switch>
        </div>
      </div>
    </div>
  </App>
);
