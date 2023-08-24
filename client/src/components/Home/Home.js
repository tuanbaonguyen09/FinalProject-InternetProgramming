import * as React from 'react'
import './Home.css'

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import axios from 'axios'
//React route
import {Outlet, useNavigate} from "react-router-dom";
export default function Home(){
  const navigate = useNavigate()
  const [user, setUser] = React.useState({})
  const [logOut, setLogOut] = React.useState()
  
  React.useEffect(() => {
    axios.get('https://api-2012667.onrender.com/api/users/login').then((response) => {
        if(response.data.loggedIn == false){
          navigate('/login')
        } 
      })
  }, [logOut]);


  return(
     <div className="Home">
      <div className="HomeInner">
        <SideBar/>
        <div className="Content">
          <Header checkLogOut={setLogOut}/>
            <Outlet/>
        </div>
      </div>
    </div> 
  )
}


