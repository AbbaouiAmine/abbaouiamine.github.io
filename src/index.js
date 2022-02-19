import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,Redirect } from 'react-router'
import HomeComponent from './components/mainPage/Home';
import history from './components/mainPage/history';
import ReactIndexComponent from './components/courseTemplate/ReactIndexComponent';
import styleDefault from "./css/style.default.css";
import themify from "./css/themify-icons.css"
import HibernateComponent from './components/hibernateCourse/HibernateComponent';
import JavaComponent from './components/javaCourse/JavaComponent';

ReactDOM.render(
  <Router history={history}>
    <Route path="/" >
      <Route path="/portfolioReact" component={HomeComponent} />
      <Route path="/react" component={ReactIndexComponent} />
      <Route path="/hibernate" component={HibernateComponent} />
      <Route path="/java" component={JavaComponent} />
    </Route>
  </Router>,
  document.getElementById('root')
);

