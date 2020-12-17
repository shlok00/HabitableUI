import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Main from './components/Main';
import Prof from './components/Prof';
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
     </Switch>
     </Router>,
     rootElement
   );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
