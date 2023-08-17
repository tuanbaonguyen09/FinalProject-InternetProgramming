import * as React from 'react'
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
// Axios
import axios from 'axios';
import { UserContext } from '../../context/UserContext.jsx';

export default function Login(){
    const navigate = useNavigate()
    const {isLogin,setIsLogin} = React.useContext(UserContext)
    const {userName,setUserName} = React.useContext(UserContext)

    const [email, setEmail] = React.useState()
    const [emailErr, setEmailErr] = React.useState(true)

    const [password, setPassword] = React.useState()
    const [passwordErr, setPasswordErr] = React.useState(true)

    axios.defaults.withCredentials = true;

    React.useEffect(() => {
      axios.get('/api/login').then((response) => {
        if(response.data.loggedIn == true){
            setIsLogin(true)
        }
      })
    }, [])

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if(emailErr || passwordErr){
            alert("Vui lòng nhập đúng thông tin đăng nhập")
            return
        }
        const configuration = {
            method: "post",
            url: "/api/login",
            data: {
                email : email,
                password: password,
              },
        }
        axios(configuration).then(response => {
            if(response.data.message){
                alert(response.data.message)
            }else {
                alert('Đăng nhập thành công')
                setUserName(email)
                navigate('/home')
            }
        }).catch(error => console.log(error))
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        if(passwordValidation(event.target.value)) setPasswordErr(false)
        else setPasswordErr(true)
    }

    const passwordValidation = (value) => {
        return (value.length >= 5)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        if(emailValidation(event.target.value)) setEmailErr(false)
        else setEmailErr(true)
    }
    const emailValidation = (value) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        return value.match(regex)
    }
    return(
        <div className="Login w-screen h-screen flex">
            <div className="LoginInner w-full ">
                <div className="LoginWindow">
                    <h1>Please Login</h1>
                    <h1>{isLogin ? "Welcome" : ""}</h1>
                    <form className="LoginForm" action="">
                        <div className="item">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" onChange={handleEmailChange} />
                            <div className="validation" id="email_validation">{emailErr ? "Vui lòng nhập email hợp lệ":""}</div>
                        </div>
                        <div className="item">  
                            <label htmlFor="password">Your Password</label>
                            <input type="password" name="password" id="password" placeholder="Password"  onChange={handlePasswordChange}/>
                            <div className="validation" id="password_validation">{passwordErr ? "Vui lòng nhập mật khẩu hợp lệ":""}</div>
                        </div>
                        <button className="LoginButton" onClick={handleFormSubmit}>
                            Log in
                        </button>
                        <div className="flex gap-2 items-center text-[13px]">
                            <div className="opacity-40">Don’t have an account?</div>
                            <NavLink to="/register">Sign Up</NavLink>
                        </div>
                    </form>
                </div>
            </div>
            <div className="Wallpaper w-full bg-blue-800">

            </div>
        </div>
    )
}