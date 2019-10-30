import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cookie from "react-cookies"
import axios from "axios"

export default class Header extends Component {
    state={
        userInfo : null
    }
    signOut=()=>{
       if(cookie.load("isLoggedIn") !== undefined){

            console.log('kill')
            cookie.remove("isLoggedIn")
            // this.props.history.push('/')
            window.location.reload()
       }
    }
    componentDidMount(){
        axios.get(`http://localhost:3020/getUser/${cookie.load("isLoggedIn")}`)
        .then((response) => {
            this.setState({ userInfo: response.data },()=>
            {
                console.log(this.state);
             
            })
        })
    }
    render() {
        if(cookie.load("isLoggedIn") === undefined){
            return( 
            <> 
           <div class="header">

<Link to={"/"}>
    <img src="images/logo.png" width="181" height="45"/>
</Link>

                <ul>
                    <li><a href="#"><i class="fas fa-users"></i> ABOUT US</a></li>
                    <li><a href="#"><i class="far fa-handshake"></i> OUR SERVICES</a></li>
                    <li><a href="#"><i class="fas fa-envelope"></i> CONTACT US</a></li>
                </ul>



<div class="log-in">
    <Link to={cookie.load("isLoggedIn") === undefined ? "/login" : "/"}><i class="fas fa-sign-out-alt"></i> {cookie.load("isLoggedIn") === undefined ? "Log in" : "Log out"}</Link>
</div>

</div>
            </>
              
              )
          }else
        return (
            <div class="header">

                <Link to={"/"}>
                    <img src="images/logo.png" width="181" height="45"/>
                </Link>
        

                <ul>
                    <li><a href="#"><i class="fas fa-users"></i> ABOUT US</a></li>
                    <li><a href="#"><i class="far fa-handshake"></i> OUR SERVICES</a></li>
                    <li><a href="#"><i class="fas fa-envelope"></i> CONTACT US</a></li>
                </ul>



                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                    <div style={{fontStyle:'italic'}}>
                        {this.state.userInfo !== null ? `Welcome back ${this.state.userInfo.firstName.toUpperCase()} !` : ""}
                    </div>

                    <div className="dash-top-icon">
                        <Link to={"/dash"}><i class="fas fa-tasks"></i> {cookie.load("isLoggedIn") === undefined ? "" : "Dashboard"} </Link>
                    </div>

                    <span class="log-in" onClick={this.signOut}>
                        <Link to={ "/"}><i class="fas fa-sign-out-alt"></i> {"Log out"}</Link>
                    </span>

                </div>

            </div>
        )
    }
}
