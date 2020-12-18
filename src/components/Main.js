import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.css';
import axios from 'axios';
import Back from '../images/back.jpg';
import Back1 from '../images/back1.png';
import Back2 from '../images/back2.png';
import Home from '../images/but.png';
import Home0 from '../images/buton.png';
import Sho from '../images/sho.png';
import Shab from '../images/shab.png';
import ScrollTo from "react-scroll-into-view";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { SocialIcon } from 'react-social-icons';
import $ from 'jquery';
import moment from 'moment';


var notnum = 0;
var token = localStorage.getItem('token');
const tkx = JSON.parse(token);


class Cont extends React.Component {
  constructor() {
        super()
        this.state = {
            time: moment().format('LTS'),
            one: true,
            two: false,
            three: false,
            four: false,
            background: {
                backgroundColor: "#fff"
            },
            class: ''
        }

    }


  componentDidMount() {
    AOS.init({
      duration: 1500
    });
    const d = {accessToken: tkx.accessToken};
    axios.put('/user/task/notification',d).then(response=>{notnum = response.data['Number of Notifications']; console.log(response.data['Number of Notifications']);}).catch(console.log(''));
    $('.menu-toggle').click(function(){
       $(".nav").toggleClass("mobile-nav");
       $(this).toggleClass("is-active");
    });

    setInterval(()=>{
        if(this.state.one == true) {
            this.setState({
                time: moment().format('LTS')
            })
        }
        else if(this.state.four == true){
            this.setState({
                time: moment().format('LT')
            })
        }
    },1000)
  }


  TriggerOutlook = (event) =>

          {    event.preventDefault();
              var body = escape('Send us your feedback' + String.fromCharCode(13));

              var subject = "FEED BACK!";
              window.location.href = "mailto:a.habitable_team@yahoo.com?body="+body+"&subject="+subject;

                  }

        Logout = (event) =>
                   { event.preventDefault();
                     window.history.go(-1);
                   }



  render() {
    return (
      <div  style={{backgroundImage: `url(${Home0})`}}>
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
        <div id="mainpg">
        <section className="headline">

        <div  className="slider-container">
        <div id="page">
       <div className="mcontainer">
       <div className="mbody">
       <p>
       HabitAble<br/>
       <span style={{fontSize:"7vw", textAlign:"center",fontFamily: "'Satisfy', cursive"}}>&nbsp;&nbsp;{this.state.time}</span>
       </p>
       </div>
       </div>

       </div>
               </div>

        </section>
        <section className="features" style={{background:"#transparent"}}>

          <div className="feature-container" >
          <a href="/taskmanager" style={{textDecoration:"none"}}>
            <img src={Back} alt="Flexbox Feature" />
            <h2 style={{background:"black", color:"white"}}>Task Manager</h2>
            <p>-Post New Tasks! < br / >
    -Edit Existing Tasks! < br / >
    -Schedule to Notify! < br / >
    -Color Coded!</p></a>
          </div>
          <div className="feature-container" >
          <a href="/habittracker" style={{textDecoration:"none"}}>
            <img src={Back1} alt="Flexbox Feature"  />
            <h2 style={{background:"black", color:"white"}}>Habit Tracker</h2>
            <p>         -Track your Habits! < br / >
                        -Make New Streaks! < br / >
                        -Beautiful Graphs! < br / >
                        -Schedule your Day!  </p>
          </a></div>
          <div className="feature-container" >
          <a href="/challenges" style={{textDecoration:"none"}}>
            <img src={Back2} alt="Flexbox Feature" />
            <h2 style={{background:"black", color:"white"}}>Challenge-A-Friend!</h2>
            <p>-Compete with your Friends! < br / >
    -Create Challenging Tasks! < br / >
    -Who finished first? < br / ><br/>
    </p>
          </a></div>
        </section>
        </div>
      </div>

      </div>
    );
  }


}

export default Cont;
