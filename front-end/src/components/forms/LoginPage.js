import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import DashboardPage from "../dashboard/DashboardPage"
import cookie from "react-cookies"

export default class LoginPage extends Component {

    state = {email: null, password: null , userID:null, message:null}
    getData = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }

    loginMethod = () =>{
        let userAccount = {email:this.state.email , password:this.state.password};
        axios.post("http://localhost:3020/login", userAccount)
        .then((response) => { 
            console.log(response)
                // if(response !== undefined)
                // {
                //     this.setState({message:"Invalid Email Or Password"})
                // }
                // else
                // {
                 cookie.save('isLoggedIn',response.data);

                    this.setState({userID:response.data , message:""}) ;
                    this.props.history.push('/dash') 
                    console.log(cookie.load("isLoggedIn"))
                    window.location.reload()

                // }
            
       
    
    })
    .then((t)=>{
        this.setState({message:"Invalid Email Or Password"})
    })


    }

    render() {
        if(cookie.load("isLoggedIn") !== undefined){
            return <div></div>
          }else{
        return ( 
            <div className="login-page">
                <input type="email" name="email" onChange={this.getData} placeholder="Enter your e-mail address"/>
                <input type="password" name="password" onChange={this.getData} placeholder="Enter your password"/>
                <button onClick={this.loginMethod}>OK</button>
                <span style={{color:"red"}}> {this.state.message}</span> 
                {/* <div style={{color:"red"}}>{(this.state.userID !== null)?<Redirect to={{pathname:'/dash'}}/>:this.state.message}</div> */}
                <p>Don't have an account? <Link to="/register">Click Here . . .</Link></p>
                <a href="#">Forgot you password?</a>
            </div>
        )
          }
    }
}
