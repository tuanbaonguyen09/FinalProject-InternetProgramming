import * as React from "react";

//LINK
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Upload from "../components/Upload/Upload";
import Gallery from "../components/Gallery/Gallery";
import Creator from "../components/Creator Info/Creator";
import Main from "../components/MainPage/Main";

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// // Router 
import {BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";


import '../scss/App.scss'





const App = () => {
  const [isLogin, setIsLogin] = React.useState(false)
  
  library.add(fas,fab)
  return (
    <Router>
      <Routes>
        <Route path="/"  element={isLogin ? <Navigate to="home"/> : <Navigate to="/login"/>}
          />
          <Route path="home" Component={Home}>
            <Route path='' Component={Main} />
            <Route path='creator' Component={Creator} />
            <Route path='upload' Component={Upload} />
            <Route path='gallery' Component={Gallery} />
          </Route>
          <Route path="login" Component={Login}/>
          <Route path="register" Component={Register}/>
      </Routes>
    </Router>

  )
};

export default App;