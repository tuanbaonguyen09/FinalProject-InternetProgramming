import * as React from 'react'
import './Home.css'

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import axios from 'axios'
//React route
import {Outlet, useNavigate} from "react-router-dom";
export default function Home(){
  const navigate = useNavigate()
  const [user, setUser] = React.useState()
  const [logOut,checkLogOut] = React.useState(false)

  async function getUser() {
    let output = await axios.get('/api/login').then((response) => {
        if(response.data.loggedIn == false){
          navigate('/login')
        } else{
          return response.data.user
        }
      })
      return setUser(output)
  }

  React.useEffect(() => {
    getUser()
  }, [logOut])

  return(
    user && (
     <div className="Home">
      <div className="HomeInner">
        <SideBar/>
        <div className="Content">
          <Header user={user} handleLogout={checkLogOut}/>
            <Outlet/>
        </div>
      </div>
    </div> 
    )
  )
}


