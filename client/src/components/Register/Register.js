import * as React from 'react'
import './Register.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios';


export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            db_accounts: [],
            value : '',
            emailInput:'',
            passwordInput:'',
            retypePasswordInput:'',
            emailCheck :'',
            passwordCheck: '',
            retypePasswordCheck:'',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleRetypePasswordChange = this.handleRetypePasswordChange(this)
    }

    componentDidMount(){
        axios.get('/api/accounts').then(result => {
          this.setState({db_accounts:  result.data.accounts})
        }).catch(error => console.log(error))
    }   

    handleFormSubmit(event){
        event.preventDefault();
        //Handle Login Successful
        this.state.db_accounts.forEach( (item, index) => {
            if(item.email == this.state.emailInput && item.password == this.state.passwordInput && this.state.emailCheck.length < 1 && this.state.passwordCheck < 1){
                console.log('Successful')
            }
        })

    }
    handleRetypePasswordChange(event){
        this.setState({retypePasswordCheck: this.retypePasswordValidation(event.target.value)})
    }
    
    retypePasswordValidation(input){
        if (input == this.state.passwordInput){
            return ""
        }
        return "Mật khẩu không giống"
    }

    handleEmailChange(event){
        this.setState({emailInput:event.target.value ,emailCheck: this.emailValidation(event.target.value)})
    }

    emailValidation(input){
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        if(regex.test(input)) {
            return "";
        }
        return "Vui lòng nhập email hợp lệ";
    }

    handlePasswordChange(event){
        this.setState({passwordInput:event.target.value, passwordCheck: this.passwordValidation(event.target.value)})
    }

    passwordValidation(input){
        if(input.length  >= 5) {
            return "";
        }
        return "Vui lòng nhập password lớn hơn 4 kí tự";
    }
    render(){
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
                                <input type="email" name="email" id="email" placeHolder="Email"  onChange={this.handleEmailChange}/>
                                <div className="validation" id="email_validation">{this.state.emailCheck}</div>
                            </div>
                            <div className="item">
                                <label htmlFor="password">Your Password</label>
                                <input type="password" name="password" id="password" placeHolder="Password" onChange={this.handlePasswordChange}/>
                                <div className="validation" id="password_validation">{this.state.passwordCheck}</div>
                            </div>
                            <div className="item">
                                <label htmlFor="repassword">Retype your Password</label>
                                <input type="password" name="repassword" id="repassword" placeHolder="Retype Password" onChange={this.handleRetypePasswordChange}/>
                            </div>
                            <button className="RegisterButton">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
    
            </div>
        )
    }

}