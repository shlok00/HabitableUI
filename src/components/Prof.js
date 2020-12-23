import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/profi.css';
import '../styles/main.css';
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

var token = localStorage.getItem('token');
const tkx = JSON.parse(token);
var ava='';
var avat='';
var url = '';
var fileurl = '';

const ImgUpload =({
  onChange,
  src
})=>

  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload" >
      <img for="photo-upload" src={src}/>
    </div>
    <input id="photo-upload" type="file" onChange={onChange}/>
  </label>


const Uname =({
  onChange,
  value
})=>
  <div className="field">
    <label htmlFor="uname" style={{color:"#f7ee74"}}>
      Name:
    </label>
    <input
      id="uname"
      type="text"
      onChange={onChange}
      maxlength="25"
      value={value}
      placeholder="Edit Name"
      required/>
  </div>


const Uage =({
  onChange,
  value
})=>
  <div className="field">
    <label htmlFor="uage" style={{color:"#f7ee74"}}>
      Age:
    </label>
    <input
      id="uage"
      type="number"
      onChange={onChange}
      maxLength="35"
      value={value}
      placeholder="Edit Age"
      required/>
  </div>


const Profile =({
  onSubmit,
  src,
  uname,
  uage,
})=>
<div className="prbody">
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1 style={{color:"#f7ec54", fontFamily:"Papyrus,Fantasy"}}>Profile</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img id="pic" for="photo-upload" src={src}/>
        </div>
      </label>
      <div className="uname" style={{color:"#f7ee74",fontFamily:"Papyrus,Fantasy", fontSize:"20px", fontWeight:"bold"}}>{uname}</div>
      <div className="uage" style={{color:"#f7ee74",fontFamily:"Papyrus,Fantasy", fontSize:"20px", fontWeight:"bold"}}>{uage} years old</div>
      <button type="submit" className="edit" style={{color:"#000", textShadow:"none",fontFamily:"Papyrus,Fantasy", fontWeight:"bold"}}>Edit Profile </button>
    </form>
  </div></div>


const Edit =({
  onSubmit,
  children,
})=>
<div className="prbody">
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1 style={{color:"#f7ec54", fontFamily:"Papyrus,Fantasy"}}>Update Profile</h1>
        {children}
      <button type="submit" className="save">Save </button>
    </form>
  </div></div>

class Prof extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    uuname:'',
    uage:'',
    active: 'edit'
  }

  componentDidMount(){
    $('.menu-toggle').click(function(){
       $(".nav").toggleClass("mobile-nav");
       $(this).toggleClass("is-active");
    });
  const tk = {accessToken: tkx.accessToken};
  axios.put('/user/profile/avatar',tk).then(response=>{console.log(response.data); url = response.data;
    url = 'data:image/png;base64,'+url;
    this.setState({imagePreviewUrl: url});
  }).catch(error=>{alert('error!')});

}


  photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    this.file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }
  editName = e =>{
    const uname = e.target.value;
    this.setState({
      uname,
    });
  }

  editAge = e => {
    const uage = e.target.value;
    this.setState({
      uage,
    });
  }

  handleSubmit= e =>{
    e.preventDefault();
    let file = this.file;
    console.log(file);
  var formdata = new FormData();
  formdata.append('avatar',file);
  formdata.append('accessToken', tkx.accessToken);

  axios.post('/user/profile/avatar',formdata,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}).then(response=>{console.log('success');}).catch(error=>{console.log(error.response.data);});

const datauser = {
        username: this.uname,
        age: this.uage,
        accessToken: tkx.accessToken
       };
     axios.patch('/user',datauser).then(response=>{
        if(response.status == 200)
        {
          alert('Information Updated!');
        }
       }
     ).catch(error=>{if(error.status != 200){
       alert('Error Encountered!');
       console.log(tkx);
     }});

    let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    this.setState({
      active: activeP,
    })
  }

  render() {
    const {imagePreviewUrl,
           uname,
           uage,
           active} = this.state;
    return (
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
              {(active === 'edit')?(
                <Edit onSubmit={this.handleSubmit}>
                  <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
                  <Uname onChange={this.editName} value={uname}/>
                  <Uage onChange={this.editAge} value={uage}/>
                </Edit>
              ):(
                <Profile
                  onSubmit={this.handleSubmit}
                  src={imagePreviewUrl}
                  uname={uname}
                  uage={uage}/>)}
                          </div>
                    </div>


                      </div>
    )
  }
}




export default Prof;
