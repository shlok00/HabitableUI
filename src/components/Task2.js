import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.css';
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

class Task2 extends React.Component{

  componentDidMount(){
    $('.menu-toggle').click(function(){
       $(".nav").toggleClass("mobile-nav");
       $(this).toggleClass("is-active");
    });

  }
render(){

return(
  <div>
  <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
<div className="page-wrapper">
  <div className="nav-wrapper">
    <nav className="navbar">
      <h3 style={{paddingLeft: 10}}><a href="/main" style={{textDecoration:"none", color:"#e6cd2e"}}>HabitAble</a></h3>
      <div className="menu-toggle" id="mobile-menu">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
      <ul className="nav no-search">
        <li className="nav-item"><a href="/main">HOME</a></li>
        <li className="nav-item"><a onClick={this.TriggerOutlook}>FEEDBACK</a></li>
        <li className="nav-item"><a href="#">CONTACT US</a></li>
        <li className="nav-item"><a href="/profile">PROFILE</a></li>
        <li className="nav-item"><a href="/">LOGOUT</a></li>
      </ul>
    </nav>
    <div className="grad-bar" />
</div>
  </div>
TAKANA!
  </div>
);
}


}


export default Task2
