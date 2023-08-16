import * as React from 'react';
import './Header.css'
//font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {NavLink} from 'react-router-dom'
export default function Header() {

    return ( 
        <header className="Header">
            <div className="HeaderInner flex justify-between items-center px-6 py-6 border-b border-[#F9F9F9]">
                <div className="Title text-heading">
                     This is HEader   
                </div>
                {/* <div className="User flex gap-4">
                    <div className="Avatar w-9 h-9 rounded-full bg-red-300">

                    </div>
                    <div className="Name">
                        
                    </div>
                    <div className="DropDownButton">
                    </div>
                </div> */}
                <NavLink to='/login' className="LoginButton px-9 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-400">
                    Login
                </NavLink>
            </div>
        </header>
    )
}