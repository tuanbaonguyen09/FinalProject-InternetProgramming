import * as React from 'react'
import './Home.css'

import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

//React route
import {Outlet} from "react-router-dom";
export default function Home(){
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



