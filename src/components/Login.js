import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/login.css';
import Logo from '../images/logos.png';
import axios from 'axios';


class Log extends Component
{
  constructor()
  {
    super()

      this.state = {
        email: null,
        password: null,
        age: null,
        username: null,
        hash: null
    }
  }

   toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
  };


  handleHash = (event) => {
    event.preventDefault();

    axios.post(`/user/confirm/${this.hash}`,this.token ).then(response=>{
       console.log(response.status);
       alert("Email verification successful!");
  }).catch(error=>{ alert("Unsuccessful! Try again!")});

  }



  handleLoginSubmit = (event) =>
   { event.preventDefault();
     const data1 = {
       email: this.email,
       password: this.password
     };

   axios.post('/user/login',data1).then(response=>{
      if(response.status == 200)
      { console.log(response.data);
        this.token = response.data;
        alert("Login Successful!");
        localStorage.setItem('email', JSON.stringify(this.email));
        localStorage.setItem('token', JSON.stringify(this.token));

      }
     }
   ).catch(error=>{if(error.status != 200){
     console.log(error.status);
      alert("Login Error Detected!");
      console.log(error.data);
   }});


}



  handleSignupSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: this.username,
      age: this.age,
      email: this.email,
      password: this.password
    };

    axios.post(`/signup`,data).then(response=>{
        alert('SIGNUP successful!');
        localStorage.setItem('uname', JSON.stringify(this.username));
        localStorage.setItem('age', JSON.stringify(this.age));

   }
 ).catch(err=> {alert('SIGNUP ERROR!!')});

}


  render(){
    const {email} = this.state;
    const {password} = this.state;
    const {age} = this.state;
    const {username} = this.state;
    const {token} = this.state;



  return(
    <div>
    <section>
      <div className="container">
      <h3 className="glow">HabitAble</h3>
        <div className="user signinBx">
          <div className="imgBx">
          <img src={Logo} alt="" />
          </div>
          <div className="formBx">
            <form action onsubmit="return false;">
              <h2>Sign In</h2>
              <input type="text" name placeholder="Email"  onChange={event => this.email = event.target.value} />
              <input type="password" name placeholder="Password"  onChange={event => this.password = event.target.value} />
              <input type="submit" name value="Login" onClick={this.handleLoginSubmit}/>
              <input type="text" name placeholder="Enter Hash Code"  onChange={event => this.hash = event.target.value} />
              <input type="submit" name value="Verify" />
              <p className="signup">
                Don't have an account ?
                <a href="#" onClick={this.toggleForm}>Sign Up.</a>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form action onsubmit="return false;">
              <h2>Create an account</h2>
              <input type="text" name placeholder="Username"  onChange={event => this.username = event.target.value}/>
              <input type="number" name placeholder="Age"  onChange={event => this.age = event.target.value} />
              <input type="email" name placeholder="Email Address"  onChange={event => this.email = event.target.value} />
              <input type="password" name placeholder="Create Password"  onChange={event => this.password = event.target.value}/>
              <input type="submit" name defaultValue="Sign Up" onClick={this.handleSignupSubmit} />
              <p className="signup">
                Already have an account ?
                <a href="#" onClick={this.toggleForm}>Sign in.</a>
              </p>
            </form>
          </div>
          <div className="imgBx">          <img src={Logo} alt="" />

          </div>
        </div>
      </div>
    </section>

    </div>

);
};

}

export default Log;
