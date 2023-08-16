import * as React from 'react'
import './Home.css'

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Upload from "../Upload/Upload";

//React route
import {Route, Routes } from "react-router-dom";

export default class Home extends React.Component {
    constructor (props){
      super(props)
    };
    render(){
      return(
          <div className="Home">
          <div className="HomeInner">
            <SideBar/>
            <div className="Content">
              <Header/>
              <Routes>
                <Route path='/home/upload' Component={Upload} />
              </Routes>
            </div>
          </div>
        </div>
      )
    }
}