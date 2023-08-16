import React from "react";

//LINK
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
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
      <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
      </Routes>
    </Router>

  )
};

export default App;