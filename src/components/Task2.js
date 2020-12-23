import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import '../styles/main.css';
import '../styles/task2.css';
import axios from 'axios';
import $ from 'jquery';

var token = localStorage.getItem('token');
const tkx = JSON.parse(token);
Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.scale.ticks.beginAtZero = true;
var color=['#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370','#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370','#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370'];
var icount = 1;
var habitvalue='';


// BarChart
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'horizontalBar',
      options: {
      maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.color,
          barThickness: 6,
        }]
      }
    });
  }

  render() {
    return (
        <canvas ref={this.canvasRef} />
    );
  }
}



// Doughnut
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'pie',
      options: {
        legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: 'white'
                }},
      maintainAspectRatio: false
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.colors,
          borderColor: '#0c1926',
          borderWidth: 3
        }]
      }
    });

  }


  render() {
    return <canvas ref={this.canvasRef} />;
  }
}


class Task2 extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
        data: [{title:'habit', data: [{label:'', value:0, id:'', color:''}]}]
      };
    }

  componentDidMount(){
    const mai = document.querySelector("main");

    var date = new Date();
    var day = date.getDate();
    var year = date.getFullYear();

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var monthLabel = document.getElementsByClassName('month-label')[0].innerHTML = monthNames[date.getMonth()];

    var dayLabel = document.getElementsByClassName("day-label")[0].innerHTML = day;

    var weekdayLabel = document.getElementsByClassName("weekday-label")[0].innerHTML = dayNames[date.getDay(0)];
    const ce = {accessToken: tkx.accessToken};

    axios.post('/habits',ce).then(response=>{console.log(response.data);
      var data = response.data;
      var x = this.state.data[0].data;
      for(var i =0; i<data.length; i++)
      {
        x.push({ label: data[i].title,
               value: data[i].streak, id: data[i]._id, color: data[i].color});
         this.setState({
     data: [{title:'habit', data:x}]});
     document.getElementById('habstreak').append(new Option(`${data[i].title}`, `${data[i].title}`));
     document.getElementById('delhabstreak').append(new Option(`${data[i].title}`, `${data[i].title}`));
     document.getElementById('delhab').append(new Option(`${data[i].title}`, `${data[i].title}`));
      }
}).catch(error=>{console.log(error.data)});

  mai.addEventListener("click", (e) => {

  if (e.target.tagName === "DIV") {
    const { name } = e.target.dataset;
    if (name === "add-bt") {
      console.log('caught!');
      document.getElementById('habstreak').append(new Option(`${habitvalue}`, `${habitvalue}`));
      document.getElementById('delhabstreak').append(new Option(`${habitvalue}`, `${habitvalue}`));
      document.getElementById('delhab').append(new Option(`${habitvalue}`, `${habitvalue}`));
      var x = this.state.data[0].data;
      var id ='';
      console.log(x);
      const datahabit = {
         habit: {
           title: habitvalue,
                   description: '',
                   completedToday: false,
                   streak: 0,
                   color: color[icount]
      },
       accessToken: tkx.accessToken
      };
            axios.post(`/habit`,datahabit).then(response=>{ console.log(response.data); id = response.data._id; console.log(id);   x.push({ label: habitvalue,
                    value: 0, id: id, color: color[icount]});
              this.setState({
          data: [{title:'habit', data:x}]
        }); }).catch(e=>{alert("err!");});

      console.log(this.state.data[0].data);
      const hablis = mai.querySelector('[data-name="hab-input"]');
        hablis.value = "";
        icount++;
      }

      else if(name === "upd-btn")
      {
         var tag = document.getElementById('habstreak').value;
         console.log(tag);
         var numt =0;
         var ds = this.state.data[0].data;
         var id ='';
         var col = '';
         for( var i =0; i<ds.length; i++)
         {
           if(ds[i].label == tag)
            {ds[i].value = ds[i].value + 1; numt = ds[i].value; id = ds[i].id; col = ds[i].color; console.log(id);}
       }

             const datahabit = {
                habit: {
                          title: tag,
                          description: '',
                          completedToday: true,
                          streak: numt,
                          color: col
             },
              accessToken: tkx.accessToken
             };
                   axios.patch(`/habit/${id}`,datahabit).then(response=>{ console.log(response.data);       this.setState({
                      data: [{title:'habit', data: ds}]
                    });
}).catch(e=>{alert("err!");});

}
      else if(name === "delh-btn")
      {
         var tag = document.getElementById('delhabstreak').value;
         console.log(tag);
         var ds = this.state.data[0].data;
         var numt=0;
         var id ='';
         var col = '';
         for( var i =0; i<ds.length; i++)
         {
           if(ds[i].label == tag)
            {ds[i].value = ds[i].value - 1;  numt = ds[i].value; id = ds[i].id; col = ds[i].color; console.log(id);}
       }
       const datahabit = {
          habit: {
                    title: tag,
                    description: '',
                    completedToday: false,
                    streak: numt,
                    color: col
       },
        accessToken: tkx.accessToken
       };
             axios.patch(`/habit/${id}`,datahabit).then(response=>{ console.log(response.data);       this.setState({
                data: [{title:'habit', data: ds}]
              });
 }).catch(e=>{alert("err!");});
      }

      else if(name === "del-btn")
      {
         var tag = document.getElementById('delhab').value;
         console.log(tag);
         var ds = this.state.data[0].data;
         var id='';
         for( var i =0; i<ds.length; i++)
         {
           if(ds[i].label == tag)
            { console.log(ds[i])
              const ce = {accessToken: tkx.accessToken};
              id = ds[i].id;
              axios.patch(`/habit/delete/${id}`,ce).then(response=>{console.log('');}).catch(error=>{alert("ERROR!");});
              ds.splice(i, 1);
              var b = document.getElementById("habstreak");
              var c= b.selectedIndex;
              b.options[c].remove();
              var b = document.getElementById("delhabstreak");
              b.options[c].remove();
              var b = document.getElementById("delhab");
              b.options[c].remove();
            }
       }

       this.setState({
   data: [{title:'habit', data: ds}]
 });
      }

    }
}

);
    $('.menu-toggle').click(function(){
       $(".nav").toggleClass("mobile-nav");
       $(this).toggleClass("is-active");
    });

  }
render(){

return(
  <div>
  <main>
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
  <div className="hbwrap">
  <div className="hbrow">
    <div className="hbcolumn" style={{backgroundColor: 'transparent'}}>
<div className="habitinput">
<br/><br/><br/><br/><br/>
          <div className="calendar-wrapper">
<div className="calendar-today">
<div className="month-label"></div>
<div className="day-label"></div>
<div className="weekday-label"></div>

    <div className="current-time"></div>
</div>

  </div>
<br/><br/><br/><br/>
  <div className="hbwrapper">
  <form action="#" className="hbform">
    <input type="text" className="hbinput" style={{float:"left", textAlign:"left"}}
     placeholder="New Habit"
                data-name="hab-input"
                onChange = {event => {habitvalue = event.target.value; console.log(habitvalue);}}/>
    <div className="hbbutton" style={{background:"#60397d", float:"left"}} data-name="add-bt">Add!</div>
  </form>
</div>
<div className="hbwrapper">
<form action="#" className="hbform">
<select
  className="hbinput"
  id="habstreak" style={{float:"left", textAlign:"left", height:"2rem"}}>  </select>
  <div className="hbbutton" style={{background:"#ba3c5d", float:"left"}} data-name="upd-btn">Streak!</div>
</form>
</div><div className="hbwrapper">
<form action="#" className="hbform">
<select
  className="hbinput"
  id="delhabstreak" style={{float:"left", textAlign:"left", height:"2rem"}} >
  </select>
  <div className="hbbutton" style={{background:"#cf59ad", float:"left"}} data-name="delh-btn">Miss!</div>
</form>
</div><div className="hbwrapper">
<form action="#" className="hbform">
<select
  className="hbinput"
  id="delhab" style={{float:"left", textAlign:"left", height:"2rem"}} >
  </select>
  <div className="hbbutton" style={{background:"#494ea3", float:"left"}} data-name="del-btn">Delete!</div>
</form>
</div>

  <div className="input-group">
        <div className="input-group-prepend">
        <br/><br/><br/><br/>
            <span className="input-group-text"  style={{background: "#60397d", color: "white", borderColor: "transparent"}}>New Habit: </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="What will you do today?"
            data-name="hab-input"
            onChange = {event => {habitvalue = event.target.value; console.log(habitvalue);}}
            style={{border:"3.5px solid #60397d"}}

          />
          <div className="input-group-append">
            <button className="btn btn-success" data-name="add-bt" style={{background: "#60397d", height: "38px", border: "1px solid #60397d", marginTop:"-96px", marginLeft:"350px"}}>
              Add
            </button>
          </div>
        </div>
    <div className="input-group" style={{maxWidth:"350px", marginLeft: "20px", marginTop: "180px", position: "fixed"}}>
          <div className="input-group-prepend">
          <br/><br/><br/><br/>
            <span className="input-group-text"  style={{background: "#ba3c5d", color: "white", borderColor: "transparent", height: "38px", width:"125px" }}>Habit Streak! </span>
          </div>
          <select
            className="form-control"
            id="habstreak"
            style={{border:"3.5px solid #ba3c5d"}}
            >

            </select>
          <div className="input-group-append">
            <button className="btn btn-success" data-name="upd-btn" style={{background: "#ba3c5d", height: "38px", border: "1px solid #ba3c5d", marginTop:"-96px", marginLeft:"350px"}}>
              Add
            </button>
          </div>
        </div>
        <div className="input-group" style={{maxWidth:"350px", marginLeft: "20px", marginTop: "240px", position: "fixed"}}>
              <div className="input-group-prepend">
              <br/><br/><br/><br/>
                <span className="input-group-text"  style={{background: "#cf59ad", color: "white", borderColor: "transparent", height: "38px", }}>Delete Streak! </span>
              </div>
              <select
                className="form-control"
                id="delhabstreak"
                style={{border:"3.5px solid #cf59ad"}}
                   >
                </select>
              <div className="input-group-append">
                <button className="btn btn-success" data-name="delh-btn" style={{background: "#cf59ad", height: "38px", border: "1px solid #cf59ad", marginTop:"-96px", marginLeft:"350px"}}>
                  Delete
                </button>
              </div>
            </div>
        <div className="input-group" style={{maxWidth:"350px", marginLeft: "20px", marginTop: "300px", position: "fixed"}}>
              <div className="input-group-prepend">
              <br/><br/><br/><br/>
                <span className="input-group-text"  style={{background: "#494ea3", color: "white", borderColor: "transparent", height: "38px", width:"125px" }}>Delete Habit: </span>
              </div>
              <select
                className="form-control"
                id="delhab"
                style={{border:"3.5px solid #494ea3"}}

                >
                </select>
              <div className="input-group-append">
                <button className="btn btn-success" data-name="del-btn" style={{background: "#494ea3", height: "38px", border: "1px solid #494ea3", marginTop:"-96px", marginLeft:"350px"}}>
                  Delete
                </button>
              </div>
            </div>
</div>
    </div>
    <div className="hbcolumn">
      <div className="habitinput" style={{height:"250px"}}>
      <BarChart
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            color={['#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370','#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370','#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370']}
          /></div>
    </div>
    <div className="hbcolumn">
    <div className="habitinput" style={{height:"250px"}}><PieChart
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            colors={['#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370','#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370','#a772ba', '#099ae3', '#ed79d8', '#60cc86','#cf7336', '#d6e060', '#bf6370']}
            style={{marginTop: "50px"}}
          /></div>
    </div>
  </div></div>
</main>
  </div>
);
}


}


export default Task2
