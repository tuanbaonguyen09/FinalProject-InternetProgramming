import * as React from 'react'
import './Home.css'
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import axios from 'axios'
import { LoadingContext } from '../../context/LoadingContext.jsx';
import ThreeDotsWave from '../Loading Motion/ThreeDotsWave';

//React route
import {Outlet, useNavigate} from "react-router-dom";
axios.defaults.withCredentials = true;

export default function Home(){
  const {isLoading} = React.useContext(LoadingContext)

  const navigate = useNavigate()
  const [user, setUser] = React.useState()
  const [logOut,checkLogOut] = React.useState(false)

  async function getUser() {
    let output = await axios.get('http://localhost:5000/api/login').then((response) => {
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
      <div className={isLoading ? `LoadingScreen flex`: `LoadingScreen hidden`}>
          <ThreeDotsWave/>
      </div>
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


