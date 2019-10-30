import SignatureCanvas from 'react-signature-canvas'
import axios from "axios"
import React, { Component } from 'react'
import cookie from "react-cookies"
import {Link} from "react-router-dom"
export default class Auth extends Component {

state={
    userInfo : null,
    initConfVehicle : null
}
componentDidMount() {
    axios.get(`http://localhost:3020/getUser/${cookie.load("isLoggedIn")}`)
        .then((response) => {
            this.setState({ userInfo: response.data },()=>
            {
                console.log(this.state);
             
            })
        })
    axios.get(`http://localhost:3020/dashboard/${cookie.load("isLoggedIn")}`)
        .then((response) => {
            this.setState({ initConfVehicle: response.data })
            console.log('this.state', this.state)
        })
}
    render() {
        if(cookie.load("isLoggedIn") === undefined){
            return <div>Not Allowed</div>
          }else
         if(this.state.userInfo !== null && this.state.initConfVehicle !== null){
        return (
            <div style={{margin:"18px"}}>
                    {/* <span>My name is : {this.state !== null ? `${this.state.userInfo.firstName.toUpperCase()}  ${this.state.userInfo.middleName.toUpperCase()}  ${this.state.userInfo.lastName.toUpperCase()}` : ""}</span> */}
            <pre>
            <center>  <h3>Authorization Letter to Sell Car</h3></center>

Mrs. : {this.state.userInfo !== null ? `${this.state.userInfo.firstName.toUpperCase()}  ${this.state.userInfo.middleName.toUpperCase()}  ${this.state.userInfo.lastName.toUpperCase()}` : ""}<br></br>
Labeb corporation.<br></br>
Sales Manager <br></br>
AMMAN JORDAN<br></br><br></br>


 Dear Mrs. {this.state.userInfo !== null ? `${this.state.userInfo.firstName.toUpperCase()}  ${this.state.userInfo.middleName.toUpperCase()}  ${this.state.userInfo.lastName.toUpperCase()}` : ""}<br></br>


 I am the owner of the car {this.state.initConfVehicle !== null  ?   `${this.state.initConfVehicle[0].make},  ${this.state.initConfVehicle[0].model}  with color ${this.state.initConfVehicle[0].color} that has License Plate number ${this.state.initConfVehicle[0].licensePlate} `: ""}.<br></br>
<br></br>
I hereby authorized Labeb website to sell my car on my behalf of me. They will be my official personal agent since I am authorized them to sell my car.<br></br> 
<br></br>
I will not be able to attend for the legal processing of the selling of my car.Labeb website is a trustworthy and honest person since I have known this company personally.<br></br>
<br></br>
Through this letter, I am authorizing Labeb website to sell my car on behalf of my interest. they have the right to sign all necessary documents related to the selling of my car.<br></br>
<br></br>
After the selling of this property, a termination letter will be issued which informs that Labeb website will no longer be authorized to sell or buy property on my behalf.<br></br>
<br></br>
I hereby attached the Identification card of Labeb website for your perusal as well as other legal documents needed for this transaction.<br></br>
<br></br>
Sincerely yours, 
{this.state.userInfo !== null ? `${this.state.userInfo.firstName.toUpperCase()}  ${this.state.userInfo.middleName.toUpperCase()}  ${this.state.userInfo.lastName.toUpperCase()}` : ""}<br></br>
<br></br>
-signature-
<br></br>
</pre>

                 <div style={{border:"1px solid" , width:500 , height:200}}>
 <SignatureCanvas penColor='darkBlue' canvasProps={{width: 500, height: 200}} />
 </div>
<Link to="/dash">
 <button>Submit</button>
</Link>
            </div>
        )
       }else{
           return <div></div>
       }
    }
}
