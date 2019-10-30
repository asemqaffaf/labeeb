import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import cookie from "react-cookies";
export default class VehicleInfoForm extends Component {
  state = {
    
    
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    vinNumber: "",
    color: "",
    engine: "",
    uploadRegId: "",
    ownerTransactionKey:"mohammad@example.com",
    //optional or additional data:
    additionalInformation:  {
        buyerKey: "",
        paymentMethod: { both: 0, cash: "", transactionKey: null },
        imagesPaths: [],
        //Path For Dummy pdf File
        authorizeForms: [
          /*../Authorize Froms/dummy buyer Form.pdf", "../Authorize Froms/sellerForm.pdf*/
        ],
        status: {
          initialAccept: false,
          finalAccept: false
        }
      }
    ,
    //data for controlling display (cash/trade) input fields
    // both: 0,
    tradeStyle: "none",
    cashStyle: "block"
  };

  getAllYears = () => {
    let currentYear = new Date().getFullYear()
    let years = []
      for (let index = 1900; index <= currentYear; index++) {
        years.unshift(
          <option value={index} key={index}>
            {index}
          </option>
        );
      
    }
  
    return years;
  };
  readInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  optionsDisplay = key => {

    let display = key.target.value;

    if (display == 0) {
      this.setState({
        tradeStyle: "none",
        cashStyle: "block",
      });
    }
     else if (display == 1) {
      this.setState({
        cashStyle : "none",
        tradeStyle: "block",

      }) 
    } 
      else {
      this.setState({
        cashStyle: "block",
        tradeStyle: "block",
      });
    }
  };

  changeBoth = bothValue => {
    this.setState({ both: bothValue.target.value });
  };

  addTransaction=()=>{
    axios.post(`http://localhost:3020/addTransaction/${cookie.load("isLoggedIn")}`,this.state).then((response)=>
    {
      // console.log(response.data)
      this.props.history.push('/dash')
      
    });
  
    // console.log(this.props)
    // console.log(this.state);

    // this.props.history.push(path);
    // console.log(this.props.location)
  }



  formOnChangeHandler=(event)=>{
    try{
      this.setState({
        [event.target.name] : event.target.value
    })
    }
    catch{
      if( document.querySelector("#root > div:nth-child(34) > div:nth-child(2) > input[type=text]")){
        event.additionalInformation.paymentMethod.cash = document.querySelector("#root > div:nth-child(34) > div:nth-child(2) > input[type=text]").value
         this.setState({
           additionalInformation : event
         })
       }
   if(document.querySelector("#root > div:nth-child(34) > div:nth-child(1) > input[type=text]")){
    
  event.additionalInformation.paymentMethod.transactionKey =  document.querySelector("#root > div:nth-child(34) > div:nth-child(1) > input[type=text]").value
  this.setState({
    additionalInformation : event
  })   
    }
  if(document.querySelector("#root > div.vehicle-container > div:nth-child(12) > div:nth-child(1) > input[type=text]").value !== '' && document.querySelector("#root > div.vehicle-container > div:nth-child(12) > div:nth-child(1) > input[type=text]").value !== ''){
  // if(document.querySelector("#root > div:nth-child(35) > div:nth-child(1) > input[type=text]").value !== '' && document.querySelector("#root > div:nth-child(35) > div:nth-child(1) > input[type=text]").value !== ''){
    event.additionalInformation.paymentMethod.both = 2
    this.setState({
      additionalInformation : event
    })
    }
  }
  }
  render() {
    if(cookie.load("isLoggedIn") === undefined){
      return <div>Not Allowed</div>
    }else
    return (
        <div className="vehicle-container">  

        <div>
          <label>Make</label>
          <input name="make" onChange={this.formOnChangeHandler} type="text" placeholder="Car manufacturer" />
        </div>

        <div>
          <label>Model</label>
          <input  name="model" onChange={this.formOnChangeHandler} type="text" placeholder="Car model" />
        </div>

        <div>
          <label>Year</label>
          <select name="year" defaultValue="select" onChange={this.formOnChangeHandler}>
            <option value="select" disabled>--Year--</option>
          {this.getAllYears()}
          </select>
          </div>

          <div>
          <label>License Plate</label>
          <input  name="licensePlate" onChange={this.formOnChangeHandler}  type="text" placeholder="License plate" />
          </div>

          <div>
          <label>VIN Number</label>
          <input name="vinNumber" onChange={this.formOnChangeHandler} type="text" placeholder="Enter VIN number" />
          </div>

          <div>
          <label>Color</label>
          <input name="color" onChange={this.formOnChangeHandler} type="text" placeholder="Car color" />
          </div>

          <div>
          <label>Engine</label>
          <input name="engine" onChange={this.formOnChangeHandler} type="text" placeholder="Engine displacement" />
          </div>

          <div>
          <label>Upload Registration ID (PDF)***</label>
          <input name="uploadRegId" onChange={this.formOnChangeHandler} type="text"  placeholder="up load your ID" />
          </div>

          <div>
          <label>Owner Transaction Email: </label>
          <input name="ownerTransactionKey" onChange={this.formOnChangeHandler} type="text"  placeholder="ownerTransactionKey" value={this.state.ownerTransactionKey} />
          </div>


          <div>
          <label>Buyer key</label>
          <input name="additionalInformation.buyerKey" onChange={this.formOnChangeHandler} type="text" placeholder="Buyer key" />
          </div>


        <div>
          <label>Payment Method</label>
          <select onChange={this.optionsDisplay} >
            <option value="0"> Cash </option>
            <option value="1">Trade</option>
            <option value="2">Both</option>
          </select>
        </div>


          <div>
            <div style={{ display: this.state.tradeStyle }}>
              <label></label>
              <input placeholder="Transaction Key" onChange={this.formOnChangeHandler.bind(this,{ additionalInformation: { paymentMethod: { both: 1, transactionKey: "" }} })}  type="text" />
            </div>
            <div style={{ display: this.state.cashStyle }}>
              <label></label>
              <input placeholder="Price" onChange={this.formOnChangeHandler} type="text"  />
            </div>
          </div>
          <button onClick={this.addTransaction}>Submit Now</button>
          </div>
    );
  }
  // obj = { additionalInformation: { paymentMethod: { both: 0 }} }
}
