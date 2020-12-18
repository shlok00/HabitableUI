import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Main from './components/Main';
import Prof from './components/Prof';
import Task1 from './components/Task1';
import Task2 from './components/Task2';
import Task3 from './components/Task3';

import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://habitable-productivityapp.herokuapp.com';

const rootElement = document.getElementById("root");
   ReactDOM.render(
     <Router>
      <Switch>
       <Route exact path="/" component={App} />
       <Route path="/main" component={Main} />
       <Route path="/profile" component={Prof} />
       <Route exact path="/taskmanager" component={Task1} />
       <Route path="/habittracker" component={Task2} />
       <Route path="/challenges" component={Task3} />
     </Switch>
     </Router>,
     rootElement
   );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
