import React, { Component } from 'react'
import Login from '../forms/LoginPage' 
import ConfirmationPage from '../confirmations/ConfirmationPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleInfoForm from '../forms/VehicleInfoForm';
import { Link} from "react-router-dom"
import cookie from "react-cookies"
import axios from "axios"
export default class DashboardPage extends Component {
    state = {
        signInEmail: null,
        ownerTransactionEmail: null,
        secondPartyEmail: null,
        initConfVehicle: [],
        userTransactions: [],
        userid: cookie.load("isLoggedIn"),
        userInfo: null
    }




    componentDidMount =()=> {
        axios.get(`http://localhost:3020/getUser/${this.state.userid}`)
            .then((response) => {
                this.setState({ userInfo: response.data },()=>
                {
                    console.log(this.state);
                })
            })

        axios.get(`http://localhost:3020/dashboard/${this.state.userid}`)
            .then((response) => {
                this.setState({ initConfVehicle: response.data })
            })

    }



    render() {
        if(cookie.load("isLoggedIn") === undefined){
            return <div><h1>Not Allowed</h1></div>
          }else
        return (
        <>

            <div className="dash-board-title">
                <h2>
                    <i class="fas fa-user-edit"></i>  Welcome <span>{(this.state.userInfo!==null)?this.state.userInfo.firstName + "  " + this.state.userInfo.lastName:null}</span>
                </h2>
                <div className="right-dashboard">
                    <h2><Link to="/auth"><i class="fas fa-sign-in-alt"></i>  Auth Page</Link></h2>
                    <h2><Link to="/vehicleInfoForm"><i class="fas fa-car"></i>  Add New Vehicle</Link></h2>
                </div>
            </div>


            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>year</th>
                        <th>license-Plate</th>
                        <th>Buyer id</th>
                        <th>owner Transaction </th>
                        <th>more information</th>
                    </tr>
                </thead>



                {this.state.initConfVehicle.map((item, index) => {
                    return <ConfirmationPage key={item._id} initConf={item} index={index + 1} />
                })}


            </table>

            {this.state.userTransactions.map((data, index) => {
                return <div>{data}</div>;



            })}



        </>)
    }
    // console.log(cookie.load("isLoggedIn"))


}


