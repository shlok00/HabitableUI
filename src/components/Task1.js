import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.css';
import '../styles/task3.css';
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';



var token = localStorage.getItem('token');
const tkx = JSON.parse(token);


class Task1 extends React.Component{

    constructor()
    {
      super()

        this.state = {
             user: null,
             title: null,
             description: null,
             completed: null,
             scheduled: null

      }
    }

  componentDidMount(){

    const main = document.querySelector("main");
     var a = 1;
     axios.post('/tasks', tkx).then(response=>{ localStorage.setItem('taskdata',JSON.stringify(response.data)); console.log(response.data);}
   ).catch(error=>{console.log(error.status); console.log(tkx)});

   var tsks = localStorage.getItem('taskdata');
     var task = JSON.parse(tsks);

     for (var i=0; i<task.tasks.length; i++)
     {

     if(task.tasks[i].completed == "false")
     {  const template1 =
        `<div
        draggable="true"
        id="${task.tasks[i]._id}"
        class="habitinput"
        style="
          height:auto;
          width:100%;
          padding:20px;
          color:white;
          margin-bottom:20px;
          border:none;
          background:${task.tasks[i].color};">
      <div class="habitinput"
      id = "title"
      contenteditable="true"
      style="
        height:auto;
        width:50%;
        padding:5px;
        color:white;
        text-decoration: strikethrough;
        border:none;
        margin-bottom:20px;
        background:#0c4746;
        box-shadow:3px 3px 7px #000;">${task.tasks[i].title}</div>
        <div class="habitinput"
        name="remove-btn"
        style="
          height:25px;
          width:25px;
          padding:5px;
          color:white;
          border:none;
          background:green;
          float:right;
          cursor:pointer;
          margin-top:-50px;
          box-shadow:3px 3px 7px #000;">X</div>

      <div className="habitinput"
      id="desc"
      contenteditable="true"
      style="
        height:auto;
        width:100%;
        padding:5px;
        color:white;
        margin-bottom:20px;
        border:none;
        background:transparent;
        text-align:left;
        text-shadow:1px 1px 2px black;">${task.tasks[i].description}</div>
      <div className="habitinput"
      style="
        height:auto;
        width:100%;
        padding:5px;
        color:white;
        margin-bottom:20px;
        border:none;
        background:transparent;
        text-align:left;
      ">
     <input type="date" id="sched" value="${task.tasks[i].scheduled}"  contenteditable="true" style="width:55%;
               border:1px solid white; border-radius:10px; height:25px;"/>
      <input type="color" id="favcolor"  name="favcolor"  contenteditable="true"
      style="height:30px; outline: none; border: none; padding:0; margin-left:25%; width:30px; border-radius:50%; overflow: visible;"
      onchange="document.getElementById('${task.tasks[i]._id}').style.background = value" />
      <br/><br/>
      <input type="submit" value="UPDATE" data-name="edit-btn"
      style="background:green; cursor:pointer; color:white; box-shadow:4px 4px 6px #000; border:none; padding:6px; margin-left:10px;"/>
      <input type="submit" value="DONE" data-name="done-btn"
      style="background:green; cursor:pointer; color:white; box-shadow:4px 4px 6px #000; border:none; padding:6px; margin-left:10px;"/>

               </div>
      </div>`;
     const todosList = main.querySelector('[data-name="todos-list"]');
     todosList.insertAdjacentHTML("beforeend", template1);}
     else{
       const template1 = `
          <div
          id="${task.tasks[i]._id}"
          draggable="true"
          class="habitinput"
          style="
            height:auto;
            width:100%;
            padding:20px;
            color:white;
            margin-bottom:20px;
            border:none;
            background:${task.tasks[i].color};">
        <div class="habitinput"
        id = "title"
        style="
          height:auto;
          width:50%;
          padding:5px;
          color:white;
          text-decoration: strikethrough;
          border:none;
          margin-bottom:20px;
          background:#0c4746;
          box-shadow:3px 3px 7px #000;">${task.tasks[i].title}</div>
          <div class="habitinput"
          name="remove-btn"
          style="
            height:25px;
            width:25px;
            padding:5px;
            color:white;
            border:none;
            background:green;
            float:right;
            cursor:pointer;
            margin-top:-50px;
            box-shadow:3px 3px 7px #000;">X</div>
        <div className="habitinput"
        id="desc"
        style="
          height:auto;
          width:100%;
          padding:5px;
          color:white;
          margin-bottom:20px;
          border:none;
          background:transparent;
          text-align:left;
          text-shadow:1px 1px 2px black;">${task.tasks[i].description}</div>
        <div className="habitinput"
        style="
          height:auto;
          width:100%;
          padding:5px;
          color:white;
          margin-bottom:20px;
          border:none;
          background:#000;
          text-align:left;
          border-radius: 10px;
        ">
       Scheduled on: ${task.tasks[i].scheduled}


                 </div>
        </div>`;
       const compList = main.querySelector('[data-name="completed-list"]');
       compList.insertAdjacentHTML("beforeend", template1);
     }
   }

   main.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName === "INPUT") {
      const name = e.target.getAttribute('data-name');
      if (name === "add-btn") {
        const todoInput1 = main.querySelector('[data-name="todo-input"]');
        if (todoInput1.value.trim() !== "") {
          const value = todoInput1.value;
          const datatask = {
             task: {
              title: "Title",
              description: value,
              completed: "false",
              scheduled: new Date("2020-01-01")
         },
           accessToken: tkx.accessToken
          };
          axios.post(`/task`,datatask).then(response=>{ console.log(response.data);
            localStorage.setItem('tempid',JSON.stringify(response.data));
            var tempid = localStorage.getItem('tempid');
            var tmp = JSON.parse(tempid);
            console.log(tmp._id);
            var tmpid = tmp._id;
            var template2 =`
               <div
               id="${tmpid}"
               draggable="true"
               class="habitinput"
               style="
                 height:auto;
                 width:100%;
                 padding:20px;
                 color:white;
                 margin-bottom:20px;
                 border:none;
                 background:#54ab9e;">
             <div class="habitinput"
             id = "title"
             contenteditable="true"
             style="
               height:auto;
               width:50%;
               padding:5px;
               color:white;
               text-decoration: strikethrough;
               border:none;
               margin-bottom:20px;
               background:#0c4746;
               box-shadow:3px 3px 7px #000;">Title</div>

             <div className="habitinput"
             id="desc"
             contenteditable="true"
             style="
               height:auto;
               width:100%;
               padding:5px;
               color:white;
               margin-bottom:20px;
               border:none;
               background:transparent;
               text-align:left;
               text-shadow:1px 1px 2px black;">${value}</div>
             <div className="habitinput"
             style="
               height:auto;
               width:100%;
               padding:5px;
               color:white;
               margin-bottom:20px;
               border:none;
               background:transparent;
               text-align:left;
             ">
            <input type="text" id="sched" value="${task.tasks[i].scheduled}"   contenteditable="true" style="width:55%;
                      border:1px solid white; border-radius:10px; height:25px;"/>
             <input type="text" id="favcolor" name="favcolor"  contenteditable="true"
             style="height:30px; border-radius: 0; margin-left:25%;width:15%;"
             onchange="document.getElementById('${tmpid}').style.background = value" />
             <br/><br/>
             <input type="submit" value="UPDATE" data-name="edit-btn"
             style="background:green; cursor:pointer; color:white; box-shadow:4px 4px 6px #000; border:none; padding:6px; margin-left:10px;"/>
             <input type="submit" value="DONE" data-name="done-btn"
             style="background:green; cursor:pointer; color:white; box-shadow:4px 4px 6px #000; border:none; padding:6px; margin-left:10px;"/>

                      </div>
             </div>`;
              console.log('shalalal');
              const todosList1 = main.querySelector('[data-name="todos-list"]');
              todosList1.insertAdjacentHTML("beforeend", template2);
              todoInput1.value = "";
              window.location.reload();
              window.location.reload();
          }
        ).catch(error=>{ if(error.status === 500){alert("Error Creating Task!"); console.log(error.status);}});
          a++;
        }

      }

      else if (name === "done-btn") {
        e.preventDefault();
        const compList = main.querySelector('[data-name="completed-list"]');
        var q = e.target.parentElement.parentElement;
        var id = q.id;
        compList.insertAdjacentHTML("beforeend", q);
        q.remove();
        window.location.reload();

        const dd = {
          task: {
            completed: "True"
          },
          accessToken: tkx.accessToken
        };
        axios.patch(`/task/${id}`,dd).then(response=>{console.log('');}).catch(error=>{alert("Error in Completing Task!");});

       }

        else if (name === "edit-btn")
        { var id = e.target.parentElement.parentElement.id;
          var date = e.target.parentElement.childNodes[1].value;
          var desc= e.target.parentElement.parentElement.childNodes[5].innerHTML;
          var titl = e.target.parentElement.parentElement.childNodes[1].innerHTML;
          var col = e.target.parentElement.childNodes[3].value;
          console.log(id,date,desc,titl,col);

          const dd = {
            task: {
              scheduled: date,
              title: titl,
              description: desc,
              color: col
            },
            accessToken: tkx.accessToken
          };
          axios.patch(`/task/${id}`,dd).then(response=>{console.log('');}).catch(error=>{alert("Error in Updating Task!");});
    }

      }


else if (e.target.tagName === "DIV") {
  console.log(e.target.parentElement.parentElement.parentElement);
    const name = e.target.getAttribute('name');
        if (name === "remove-btn") {
  var id = e.target.parentElement.id;
  console.log(id);
  const d = {accessToken: tkx.accessToken};
  axios.put(`/task/${id}`,d
  ).then(response=>{console.log('');}).catch(error=>{alert("Error in Deleting Task!");});
  e.target.parentElement.remove();      }}});


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
<br/><br/>
<div style={{textAlign:"center"}}>

<input type="text" id="tas-input" data-name="todo-input" placeholder="what will you do today?"/>
<input type="submit" data-name="add-btn" value="NEW TASK"
style={{background:"green", cursor:"pointer", color:"white", boxShadow:"0px 0px 10px #6bffa4", border:"none", padding:"8px", marginLeft:"10px"}}/>
</div>
<section  style={{backgroundRepeat:"repeat-y", marginTop:"-100px",
backgroundImage:"url('https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"}} >
 <div className="chcontainer" style={{marginTop:"100px", width:"90%"}}>
 <br/>

   <div className="chbox cha">
     <div className="chcolumn">
       <div className="chtext-wrapper" style={{textAlign:"center"}}>
       <a style={{background:"transparent", color:"#befc62", paddingLeft:"70px", paddingRight:"70px", paddingTop:"10px", paddingBottom:"10px",
        width:"95%", textShadow:"0px 0px 4px #caff75", borderRadius:"10px", fontWeight:"bold", textAlign:"center",
        fontFamily:"'Papyrus', Fantasy", fontSize:"19px"}}>Scheduled Tasks</a>
        <br/><br/>
        <ul data-name="todos-list"></ul>

       </div>
       </div>
       </div>

       <div className="chbox cha">
         <div className="chcolumn">
           <div className="chtext-wrapper" data-name="completed-list" style={{textAlign:"center"}}>
           <a style={{background:"transparent", color:"#befc62", paddingLeft:"70px", paddingRight:"70px", paddingTop:"10px", paddingBottom:"10px",
            width:"95%", textShadow:"0px 0px 4px #caff75", borderRadius:"10px", fontWeight:"bold", textAlign:"center", fontFamily:"'Papyrus', Fantasy", fontSize:"19px"}}>Completed Tasks</a>
            <br/>
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


export default Task1
