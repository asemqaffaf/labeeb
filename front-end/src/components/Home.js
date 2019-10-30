import React, { Component } from 'react'
import Options from "./Options"
import cookie from "react-cookies"
import {Route} from "react-router-dom"
import LoginPage from "./forms/LoginPage";

export default class Home extends Component {
  render() {

    return (
      <>
        <Options />

      </>
    )
  }
}
