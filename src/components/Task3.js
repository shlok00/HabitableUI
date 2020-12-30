import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.css';
import '../styles/task2.css';
import '../styles/task3.css';
import '../styles/login.css';

import Note from '../images/note.jpg';
import Chals from '../images/chals.png';
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

var token = localStorage.getItem('token');
const tkx = JSON.parse(token);
var chaltask='';
var maintasks='';
var maintasks1= '';
 var tasks = [];
 var code='';


class Task3 extends React.Component{

    checkdone = (event) => {
      event.preventDefault();

      alert('CONGRATULATIONS ON FINISHING YOUR CHALLENGE!!');
    }

    Setchal = (event) => {
      event.preventDefault();
      code = document.getElementById('code').value;
      const d = {
        challenge: {tasks: tasks, code: code},
        accessToken: tkx.accessToken
      };
      axios.put('/challenge',d).then(response=>{console.log(response.data); alert("CHALLENGE SET!");}).catch(error=>{alert("ERROR!")});
    }


  componentDidMount()
{    const mainz = document.querySelector("main");


      mainz.addEventListener("click", (e) => {
        e.preventDefault();
      if (e.target.tagName === "INPUT") {
        const { name } = e.target.dataset;
        if (name == "add1-bt") {
         maintasks = ' ' + ' ➜ ' + document.getElementById('tas-input').value + ' ' + '<br>';
         const tod = document.getElementById('taskchals');
         tod.insertAdjacentHTML("beforeend", maintasks);
        tasks.push(document.getElementById('tas-input').value);
         var hablis = document.getElementById('tas-input');
           hablis.value = "";
        }

      else if (name == "add2-bt"){
        code = document.getElementById('tas-input1').value;
        const d = {accessToken: tkx.accessToken};
        axios.post(`/challenge/${code}`,d).then(response=>{console.log(response.data);
          maintasks1 = response.data.tasks;
          console.log(maintasks1);
          const tod = document.getElementById('taskchals1');
          var len = maintasks1.length
          console.log(len);
         for(var ii=0; ii<len; ii++)
         {
          console.log(maintasks1[ii]);
          var l = 'task'+maintasks1[ii];
          var r = `<button id="task${ii}" style="font-size:17px; color:#820719; line-height: 3.5px; font-family: 'Papyrus', Fantasy;
          background:none;border:none; font-weight: bold; text-shadow:none; ">&nbsp;&nbsp;➜ &nbsp;${maintasks1[ii]}&nbsp;</button><br>`;
        tod.insertAdjacentHTML("beforeend", r);}}).catch(error=>{alert("ERROR!")});}



}

else if(e.target.tagName=="BUTTON"){
  console.log(e.target.id);
  for(var iq =0; iq<=9; iq++)
  {  var a = 'task'+iq;
    if(e.target.id === a)
    {
      console.log("hey!");
      if(e.target.style.textDecoration==="none")
      e.target.style.textDecoration="line-through";
      else {
        e.target.style.textDecoration="none";

      }
    }
  }
}
      });


      mainz.addEventListener("mouseover", (e) => {
        for(var i =0; i<=9; i++)
      {  var a = 'task'+i;
        if(e.target.id === a)
        {
          e.target.style.boxShadow="none";
        }
      }});


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
      <h3 style={{paddingLeft: 10}}><a href="/main" style={{textDecoration:"none", color:"#f2df9d",fontFamily: "'Satisfy', cursive"}}>HabitAble</a></h3>
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
  <main>
  <section style={{backgroundRepeat:"repeat-y", backgroundImage:"url('https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}}>
<br/>
<div className="chcontainer">
  <div className="chbox cha">
    <div className="chcolumn">
      <div className="chtext-wrapper">
      <form>
    <a style={{background:"#befc62", color:"black", paddingLeft:"70px", paddingRight:"70px", paddingTop:"10px", paddingBottom:"10px",
     width:"95%", boxShadow:"0px 0px 20px #befc62", borderRadius:"10px", fontWeight:"bold", textAlign:"center"}}>CHALLENGE MAKER</a>
     <br/>
      <input type="text" id="tas-input" placeholder="Add task for challenge"  onChange = {event => {chaltask = event.target.value;}}/><br/>
      <input type="submit" data-name="add1-bt" value="ADD TASK"
      style={{background:"green", cursor:"pointer", color:"white", boxShadow:"0px 0px 10px #6bffa4", border:"none", padding:"8px"}}/>
      <br/><br/>
      <div className="habitinput"
      style={{
        height:"auto",
        width:"90%",
        padding:"20px",
        color:"white",
        marginBottom:"20px",
        border:"none",
        backgroundImage:"url('https://media.istockphoto.com/photos/green-chalkboard-background-picture-id1150072676?k=6&m=1150072676&s=170667a&w=0&h=KkIib3qyjODFoBdAOWKrmkHYQhRzCI9qM-ugoFuAE7g=')"
    }}>

    <p id="taskchals" style={{fontFamily:"Papyrus, Fantasy", color:"white", fontSize:"15px"}}></p></div>
    <input type="text" id ="code" name placeholder="Set a code"  /><br/>
    <input type="submit" name value="SET!" onClick={this.Setchal} style={{background:"green", color:"white", boxShadow:"0px 0px 10px #6bffa4", border:"none", padding:"8px", cursor:"pointer"}}/>

</form>
      </div>
    </div>
  </div>
  <div className="chbox chb">
    <div className="chcolumn">
      <div className="chtext-wrapper">
      <form>
    <a style={{background:"#befc62", color:"black", paddingLeft:"70px", paddingRight:"70px", paddingTop:"10px", paddingBottom:"10px",
     width:"95%", boxShadow:"0px 0px 20px #befc62", borderRadius:"10px", fontWeight:"bold", textAlign:"center"}}>CHALLENGE ACCEPTED!</a>
     <br/>
      <input type="text" id="tas-input1" placeholder="Enter your code"  onChange={event => this.email = event.target.value} /><br/>
      <input type="submit" data-name="add2-bt" value="GET TASKS!"
       style={{background:"green", color:"white", boxShadow:"0px 0px 10px #6bffa4", border:"none", padding:"8px", cursor:"pointer"}}/>
      <br/><br/>
      <div className="habitinput" style={{
        height:"auto",
        width:"90%",
        padding:"20px",
        fontWeight:"bold",
        color:"red",
        marginBottom:"20px",
        border:"none",
        backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCb1W11VlLmO743sXitX7Vb4-nzHpg1pHsDw&usqp=CAU')"
    }}>

    <p id="taskchals1" style={{fontFamily:"Papyrus, Fantasy", color:"red", fontSize:"15px"}}></p></div>
    <input type="submit" name value="DONE!" onClick={this.checkdone} style={{background:"green", cursor:"pointer", color:"white", boxShadow:"0px 0px 10px #6bffa4", border:"none", padding:"8px"}}/>

</form>
      </div>
    </div>
  </div>
</div>

</section>

</main>
  </div>
);
}


}


export default Task3
