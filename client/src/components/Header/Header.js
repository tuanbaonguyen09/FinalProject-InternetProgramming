import * as React from 'react';
import './Header.css'
//font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
export default function Header(props) {
    const [user, setUser] = React.useState({})
    const [dropDown, setDropdown] = React.useState(false)

    const Login_configuration = {
        method: "get",
        url: "/api/users/login",
    }
    const Logout_configuration = {
        method: "post",
        url: "/api/users/logout",
    }

    React.useEffect(() => {
    axios(Login_configuration).then(response => {
        setUser(response.data.user)
    }).catch(error => console.log(error))
    }, []);

    const handleLogout = () => {
        axios(Logout_configuration).then(response => {
            alert(response.data.message)
            props.checkLogOut(true)
        }).catch(error => console.log(error))
    }

    const handleDropDown = () => {
        setDropdown(!dropDown)
    }


    return ( 
        <header className="Header">
            <div className="HeaderInner">
                <div className="Title text-[28px]">
                    Project Internet Programming  
                </div>
                <div className="flex gap-4 ">
                    Xin chào
                    <button onClick={handleDropDown}><FontAwesomeIcon icon="fa-solid fa-chevron-down"/></button>
                </div>
                
            </div>
            <div className={dropDown ? 'dropDown' : 'dropDown disabled'}>
                <div className="dropDownInner">
                    <div className="profile">
                        <div className="rounded-full w-9 h-9 p-2 flex items-center justify-center bg-[#393E46]">
                            <FontAwesomeIcon icon="fa-solid fa-user" className='text-white' />
                        </div>
                        <div className="text-[#393E46] text-[16px] font-bold">
                            {user.email}
                        </div>
                    </div>
                    <div className="list">
                        <div className='item'>
                            <FontAwesomeIcon icon="fa-solid fa-address-card" className="icon"/>
                            <div className="text">
                                Thông tin tài khoản
                            </div>
                        </div>
                        <button onClick={handleLogout} className='item'>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" className="icon"/>
                            <div className="text">
                               Đăng xuất
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}