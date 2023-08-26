import * as React from 'react';
import './Header.css'
//font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

axios.defaults.withCredentials = true;


export default function Header(props) {
    const location = useLocation()

    let FirstTitle = location.pathname.slice(6,).toUpperCase()
    
    const user = props.user[0]
    const checkLogOut = props.handleLogout
    const [dropDown, setDropdown] = React.useState(false)

    const configuration = {
        method: "post",
        url: "http://localhost:5000/api/logout",
    }
    
    const handleLogout = () => {
        axios(configuration).then(response => {
            alert(response.data.message)
            checkLogOut(true)
        }).catch(error => console.log(error))
    }

    const handleDropDown = () => {
        setDropdown(!dropDown)
    }


    return ( 
        <header className="Header">
            <div className="HeaderInner">
                <div className="Title text-[#0C356A] font-bold text-[32px]">
                    {FirstTitle}

                </div>
                <div className="flex gap-2">
                    Xin chào
                    <button className={dropDown ? 'dropDownButton enabled' : 'dropDownButton disabled'} onClick={handleDropDown}><FontAwesomeIcon icon="fa-solid fa-chevron-down"/></button>
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