import * as React from 'react'
import './Register.css'
import { NavLink, useNavigate} from 'react-router-dom'

import axios from 'axios';


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
            url: "/api/register",
            data: {
              email : email,
              password: password,
            },
        }
        axios(configuration).then(result => {
            alert(result.data.message)
            navigate('/login')
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
        <div className="Register w-screen h-screen flex">
            <div className="Wallpaper w-full bg-green-600">
            </div>
            <div className="RegisterInner w-full ">
                <div className="RegisterWindow">
                    <h1>Please Register</h1>
                    <form className="RegisterForm" action="">
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
                        <div className="item">
                            <label htmlFor="repassword">Retype your Password</label>
                            <input type="password" name="repassword" id="repassword" placeholder="Retype Password" onChange={handleRePasswordChange}/>
                            <div className="validation">{rePasswordErr ? "Mật khẩu nhập lại không giống":""}</div>
                        </div>
                        <button className="RegisterButton" onClick={handleFormSubmit}>
                            Register
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}