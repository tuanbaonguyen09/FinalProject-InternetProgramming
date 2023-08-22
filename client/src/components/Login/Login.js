import * as React from 'react'
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
// Axios
import axios from 'axios';
import { UserContext } from '../../context/UserContext.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginBanner from '../../img/Login & Register/LoginBanner.jpg'



export default function Login(){
    const navigate = useNavigate()
    const {isLogin,setIsLogin} = React.useContext(UserContext)
    const {userName,setUserName} = React.useContext(UserContext)

    const [email, setEmail] = React.useState()
    const [emailErr, setEmailErr] = React.useState(true)

    const [password, setPassword] = React.useState()
    const [passwordErr, setPasswordErr] = React.useState(true)

    const configuration = {
        method: "post",
        url: "/api/login",
        data: {
            email : email,
            password: password,
          },
    }
    
    React.useEffect(() => {
        axios.get('/api/login').then((response) => {
            if(response.data.loggedIn == false){
              navigate('/login')
            } 
          })
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if(emailErr || passwordErr){
            alert("Vui lòng nhập đúng thông tin đăng nhập")
            return
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
        <div className="Login">
            <div className="LoginInner">
                <div className="w-full h-full">
                    <img className="object-center" src={LoginBanner} alt="" />
                </div>
                <div className="LoginWindow w-full">
                    <div className="text-[32px] mb-8 font-bold">Đăng Nhập</div>
                    <form className="LoginForm" action="" >
                        <div className="item">
                            <FontAwesomeIcon className='absolute top-3 text-sm' icon="fa-solid fa-user" />
                            <input type="email" name="email" id="email" placeholder="Your Email" onChange={handleEmailChange} />
                            <div className="validation" id="email_validation">{emailErr ? "Vui lòng nhập email hợp lệ":""}</div>
                        </div>
                        <div className="item">  
                            <FontAwesomeIcon className='absolute top-3 text-sm' icon="fa-solid fa-key" />
                            <input type="password" name="password" id="password" placeholder="Your Password"  onChange={handlePasswordChange}/>
                            <div className="validation" id="password_validation">{passwordErr ? "Vui lòng nhập mật khẩu hợp lệ":""}</div>
                        </div>
                        <button className="LoginButton" onClick={handleFormSubmit}>
                            Đăng Nhập
                        </button>
                        <div className="flex gap-2 items-center text-[14px]">
                            <div className="opacity-40">Chưa có tài khoản ?</div>
                            <NavLink to="/register">Đăng ký</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}