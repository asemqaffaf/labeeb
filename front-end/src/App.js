// import React, { Component } from 'react';
// import Router from '../src/components/Router';
// import Auth, {  } from "./components/forms/auth";
import React, { Component } from 'react';
import DashboardPage from "./components/dashboard/DashboardPage"
import { BrowserRouter, Route, Link ,Switch,Redirect } from "react-router-dom";
import Home from "./components/Home";
import DetailsPage from "./components/confirmations/DetailsPage";
// import AuthPage from "./components/dashboard/AuthPage";
import LoginPage from "./components/forms/LoginPage";
import RegisterPage from  "./components/forms/RegisterPage";
import VehicleInfoForm from "./components/forms/VehicleInfoForm";
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from "./components/forms/Auth"
import cookie from "react-cookies"

class App extends Component {
  state = {
    cookieItem : cookie.load("isLoggedIn"),
    // Dummy Data
    users:
      [
        {
          id: 1, firstName: "Mohammad", secondName: "Yousef", middleName: "Samih", lastName: "Albitar",
          phoneNumbers: ["077777777777", "077777777855"],
          email: "mohammad@example.com", password: "12345687@as",
          uploadID: "ID.pdf"
        },
        {
          id: 2, firstName: "assem", secondName: "assem", middleName: "assem", lastName: "assem",
          phoneNumbers: ["077777777777", "077777777855"],
          email: "assem@example.com", password: "12345687@as",
          //Path For Dummy pdf File
          uploadID: "../Copy Of Identifications/dummy ID.pdf"
        }
      ],
    vehicleINFO:
      [
        {
          id: 1, make: "Toyota", model: "Camry", licensePlate: "10-135165", year: 1995,
          vinNumber: "15632154", engine: "1500cc", uploadRegId: "registrationID.pdf",
          additionalINFO: [{
            buyerKey: "assem@example.com", paymentMethode:
              { both: 0, cash: "2000$", traditionKey: null },
            imagesPaths: [],
            //Path For Dummy pdf File
            authorizeForms: ["../Authorize Froms/dummy buyer Form.pdf", "../Authorize Froms/sellerForm.pdf"],
            status: {
              initialAccept: false, finalAccept: false
            }
          }
          ]
        }
      ]
  }
  // window.location.reload()
  render() {
    // console.log(cookie.load("isLoggedIn"))
    // if(cookie.load("isLoggedIn") === undefined){
      // console.log('this.state.cookieItem',this.state.cookieItem)
      if(this.state.cookieItem === undefined){
      return( 
      <> 
      <BrowserRouter>
        <Header />
          <Route exact path="/" component={Home} state={this.state}/>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Footer />

      </BrowserRouter>
      </>
        
        )
    }else{
    return (
      <>
      <BrowserRouter>
        <Header />
        
          <Route exact path="/" component={Home} state={this.state}/>
          <Route path="/dash" component={DashboardPage} />
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/details" component={DetailsPage}></Route>
          <Route path="/vehicleInfoForm" component={VehicleInfoForm}></Route>
          <Route path="/auth" component={Auth}></Route>
        <Footer />
      </BrowserRouter>
      </>
    );
    }
  }
}
export default App;
