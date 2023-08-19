import * as React from 'react'
import './Home.css'

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import axios from 'axios'
//React route
import {Outlet, useNavigate} from "react-router-dom";
export default function Home(){
  const navigate = useNavigate()
  React.useEffect(() => {
    axios.get('/api/login').then((response) => {
      if(response.data.loggedIn == false){
        navigate('/login')
      } 
    })
  }, [])

  return(
    <div className="Home">
      <div className="HomeInner">
        <SideBar/>
        <div className="Content">
          <Header/>
            <Outlet/>
        </div>
      </div>
    </div>
)
}



