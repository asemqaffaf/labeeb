import React, { Component } from 'react'
import {Link} from "react-router-dom"
import cookie from "react-cookies"

export default class DetailsPage extends Component {
    state={
        detailsKey : undefined,
        detailsValue : undefined,
        additionalINFO : undefined
    }
    componentDidMount(){
        if(this.props.location.state !== undefined){
        let detailsKey  = []
        let detailsValue = []
        let additionalINFO = []
        if(this.props.vehicleInfo !== null){
        // detailsKey = Object.keys(this.props.vehicleInfo)
        detailsKey = Object.keys(this.props.location.state)
        detailsValue = Object.values(this.props.location.state)
        // detailsValue = Object.values(this.props.vehicleInfo)
        additionalINFO = Object.values(this.props.location.state.additionaInformation)
        // additionalINFO = Object.values(this.props.vehicleInfo.additionalINFO)
        }
        this.setState({
            detailsKey,
            detailsValue,
            additionalINFO
        })
    }
    }
    render() {
        if(cookie.load("isLoggedIn") === undefined){
            return ( <div>Not Allowed</div>)
          }else
        return (
            <>
          
        <div className="details-page-title">
            <h1><i class="fas fa-info-circle"></i> Details Page</h1>
            <span><Link to="dash">back</Link></span>
        </div>

            {this.state.detailsKey && this.state.detailsKey.map((keys,i)=>{
                if(keys==="_id" || keys==="__v"){
                    return null;
                }
                return <h2 key={i}> <input className="details-page-input" value={keys+ ":" + this.state.detailsValue[i]}></input></h2>
            })}
         


          {/* {JSON.stringify(this.props.location.state && this.props.location.state.additionalInformation || "no data found")} */}
             </>
        )
        
    
    }
}
//{console.log(this.state.detailsKey)}
 