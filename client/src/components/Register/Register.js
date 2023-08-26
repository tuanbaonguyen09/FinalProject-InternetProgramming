import * as React from 'react'
import './Register.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RegisterBanner from '../../img/Login & Register/RegisterBanner.jpg'

import { NavLink } from 'react-router-dom';
axios.defaults.withCredentials = true;


export default function Register() {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState()
    const [emailErr, setEmailErr] = React.useState(true)

    const [password, setPassword] = React.useState()
    const [passwordErr, setPasswordErr] = React.useState(true)
    
    const [rePassword, setRePassword] = React.useState()
    const [rePasswordErr, setRePasswordErr] = React.useState(true)

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if(emailErr || passwordErr || rePasswordErr){
            alert("Vui lòng nhập đúng thông tin đăng ký")
            return
        }
        const configuration = {
            method: "post",
            url: "http://localhost:5000/api/register",
            data: {
              email : email,
              password: password,
            },
        }
        axios(configuration).then(result => {
            alert(result.data.message)
            if(result.data.redir)
            navigate('/login') 
            else return
        }).catch(error => console.log(error))
    }

    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value)
        if(rePasswordValidation(event.target.value)) setRePasswordErr(false)
        else setRePasswordErr(true)
    }

    const rePasswordValidation = (value) => {
        return (value == password)
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
        <div className="Register">
            <div className="RegisterInner">
                <div className="RegisterWindow w-full">
                    <div className="text-[32px] mb-8 font-bold ">Đăng Ký</div>
                    <form className="RegisterForm" action="">
                        <div className="item">
                            <FontAwesomeIcon className='absolute top-3 text-sm' icon="fa-solid fa-user" />
                            <input type="email" name="email" id="email" placeholder="Your Email" onChange={handleEmailChange} />
                            <div className="validation" id="email_validation">{emailErr ? "Vui lòng nhập email hợp lệ":""}</div>
                        </div>
                        <div className="item">  
                            <FontAwesomeIcon className='absolute top-3 text-sm' icon="fa-solid fa-key" />
                            <input type="password" name="password" id="password" placeholder="Your Password"  onChange={handlePasswordChange}/>
                            <div className="validation" id="password_validation">{passwordErr ? "Vui lòng nhập mật khẩu hợp lệ (<5 ký tự)":""}</div>
                        </div>
                        <div className="item">
                            <FontAwesomeIcon className='absolute top-3 text-sm' icon="fa-solid fa-arrows-rotate" />
                            <input type="password" name="repassword" id="repassword" placeholder="Retype Your Password" onChange={handleRePasswordChange}/>
                            <div className="validation">{rePasswordErr ? "Mật khẩu nhập lại không giống":""}</div>
                        </div>
                        <button className="RegisterButton" onClick={handleFormSubmit}>
                            Đăng Ký
                        </button>
                        <div className="flex gap-2 items-center text-[14px]">
                            <div className="opacity-40">Đã có tài khoản ?</div>
                            <NavLink to="/login">Đăng nhập</NavLink>
                        </div>
                    </form>
                
                </div>
                <div className="w-full h-full">
                    <img className="object-cover object-center" src={RegisterBanner} alt="" />
                </div>
            </div>

        </div>
    )
}