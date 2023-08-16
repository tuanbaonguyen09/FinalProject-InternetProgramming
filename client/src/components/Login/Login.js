import * as React from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'
// Axios
import axios from 'axios';

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            db_accounts: [],
            value : '',
            emailInput:'',
            passwordInput:'',
            emailCheck :'',
            passwordCheck: '',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
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
        return "Vui lòng nhập password hợp lệ";
    }

    render(){
        return(
            <div className="Login w-screen h-screen flex">
                <div className="LoginInner w-full ">
                    <div className="LoginWindow">
                        <h1>Please Login</h1>
                        <form className="LoginForm" action="">
                            <div className="item">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Email" onChange={this.handleEmailChange} />
                                <div className="validation" id="email_validation">{this.state.emailCheck}</div>
                            </div>
                            <div className="item">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="Password"  onChange={this.handlePasswordChange}/>
                                <div className="validation" id="password_validation">{this.state.passwordCheck}</div>
                            </div>
                            <button className="LoginButton" onClick={this.handleFormSubmit}>
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

}