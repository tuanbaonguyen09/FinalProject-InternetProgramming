import * as React from 'react'
import {Component} from 'react'
import './Home.css'

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Upload from "../Upload/Upload";

//React route
import {Route, Routes } from "react-router-dom";

// Axios
import axios from 'axios';


export default class Home extends Component {
    constructor (props){
      super(props)
      this.state = {
        accounts:[],
      }

    };

    componentDidMount(){
      axios.get('/api/accounts').then(result => {
        this.setState({accounts:  result.data.accounts})
      }).catch(error => console.log(error))

      // axios.get('/api/test')
      // .then(result => this.setState({ test: result.data.message }))
    }

    render(){
      return(
          <div className="Home">
          <div className="HomeInner">
            <SideBar/>
            <div className="Content">
              <h1 className="text-white">
              Message: {this.state.accounts.map((item,index) => (
                <div key={item.id}>
                  <h1>{item.email}</h1>
                  <h2>{item.password}</h2>
                </div>
              ))} <br></br>

              </h1>
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