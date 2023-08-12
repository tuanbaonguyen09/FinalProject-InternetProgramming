import React from "react";

//LINK
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import Upload from "../components/Upload/Upload";

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// // Router 
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";


import '../scss/App.scss'



const App = () => {
  library.add(fas)

  return (
    <Router>
      <div className="App">
        <div className="AppInner">
          <SideBar/>
          <div className="Content">
            <Header/>
            <Routes>
              <Route path='/' Component={Home} />
              <Route path='/upload' Component={Upload} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>

  )
};

export default App;