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
      <div class="whole" style={{backgroundImage: `url(${Home0})`, backgroundRepeat:"repeat"}}>
      <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />

      <div className="page-wrapper">
        <div className="nav-wrapper">
          <nav className="navbar">
            <h3 style={{paddingLeft: 10}}><a href="/main" style={{textDecoration:"none", color:"#f2df9d",fontFamily: "'Satisfy', cursive"}}>HabitAble</a></h3>
            <div className="menu-toggle" id="mobile-menu">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </div>
            <ul className="nav no-search">
              <li className="nav-item"><a href="/main">HOME</a></li>
              <li className="nav-item"><a href="#" onClick={this.TriggerOutlook}>FEEDBACK</a></li>
              <li className="nav-item"><a href="#">CONTACT US</a></li>
              <li className="nav-item"><a href="/profile">PROFILE</a></li>
              <li className="nav-item"><a href="/">LOGOUT</a></li>
            </ul>
          </nav>
          <div className="grad-bar" />

        </div>
        <div id="mainpg">
        <section className="headline">

        <div id="page">
       <div className="mcontainer">
       <div className="mbody" style={{marginLeft:"-5%"}}>
       <p>
       HabitAble
       <span style={{fontSize:"1.5vw", textShadow:"0px 0px 20px #f7e6ad", fontFamily:"'Chakra Petch', sans-serif"}}> <br/>SCHEDULE. CREATE. REPEAT.<br/></span>
       <span style={{fontSize:"3.5vw",fontFamily: "'Satisfy', cursive"}}>{this.state.time}</span>
       </p>
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
        <div id="page">
       <div className="mcontainer" style={{marginBottom:"0px", marginTop:"66px", border:"none",
        boxShadow: "0px 0px 22px #fcfcc7, inset 0px 0px 22px  #fcfcc7", padding:"10px"}}>
       <div className="mbody" style={{marginLeft:"-20px"}}>
       <p style={{fontSize:"4.5vw", textShadow:"1px 2px #000", textAlign:"left"}}>
       About Us<br/>
       <p style={{fontSize:"3vw", textAlign:"justify",fontFamily: "Papyrus, Fantasy"}}>HabitAble is in an initiative started by two coding buddies
       who aim to make task management and tracking of habits, schedules and routines not only simple, but efficient, interactive and fun!
       By making use of this app, we want to encourage people to be more focused, productive and disciplined as it is the need of the hour for developing population experiencing lower attention span
        and poor time management skills. <br/><br/>
       </p>
       </p>
       </div>
       </div>

       </div>

        </div>
      </div>
      <div class="cbody">
      <div className="container">
      <p style={{fontSize:"4.5vw", textShadow:"1px 2px #c9b36b", textAlign:"center", borderBottom:"1px solid #c9b36b"}}><br/>
      Contact Us<br/></p>
      <div className="row">
      <div className="col-12 col-sm-6 ">
      <div className="our-team">
       <div className="picture">
         <img className="img-fluid" src={Sho} />
       </div>
       <div className="team-content">
         <h3 className="name"  style={{fontFamily: "Papyrus, Fantasy", fontWeight:"bold"}}>Shlok Naik</h3>
         <h4 className="title"  style={{fontFamily: "Papyrus, Fantasy", fontWeight:"bold"}}>Frontend Developer<br/><br/><br/><br/></h4>
       </div>
       <ul className="social">
         <li><a href="https://www.instagram.com/spacejamart/?hl=en" className="fab fa-instagram" aria-hidden="true" /></li>
         <li><a href="https://www.github.com/shlok00/" className="fab fa-github" aria-hidden="true" /></li>
       </ul>
      </div>
      </div>
      <div className="col-12 col-sm-6">
      <div className="our-team">
       <div className="picture">
         <img className="img-fluid" src={Shab} />
       </div>
       <div className="team-content" >
         <h3 className="name"  style={{fontFamily: "Papyrus, Fantasy", fontWeight:"bold"}}>Shabarish Ramaswamy</h3>
         <h4 className="title"  style={{fontFamily: "Papyrus, Fantasy", fontWeight:"bold"}}>Backend Developer<br/><br/><br/><br/></h4>
       </div>
       <ul className="social">
         <li><a href="https://www.instagram.com/shabarishramaswamy/?hl=en/" className="fab fa-instagram" aria-hidden="true"/></li>
         <li><a href="https://www.github.com/ShabarishRamaswamy/" className="fab fa-github" aria-hidden="true" /></li>
       </ul>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }


}

export default Cont;
