import * as React from 'react'
import './Gallery.css'
import { UserContext } from '../../context/UserContext.jsx';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import Card from '../Card/Card';
export default function Gallery() {
    const {userName,setUserName} = React.useContext(UserContext)
    const navigate = useNavigate()
    const [imageList, setImageList] = React.useState([])
    const configuration = {
        method: "post",
        url: "/api/gallery",
        data: {
          userName : userName,
        },
    }
    React.useEffect(() => {
        axios.get('/api/login').then((response) => {
            if(response.data.loggedIn == false){
              navigate('/login')
            } 
          })
        axios(configuration).then(result => {
            setImageList(result.data.gallery)
        }).catch(error => console.log(error))
    }, []);

    const refreshHandler = () =>{
        axios.get('/api/login').then((response) => {
            if(response.data.loggedIn == false){
              navigate('/login')
            } 
          })
        axios(configuration).then(result => {
            setImageList(result.data.gallery)
        }).catch(error => console.log(error))
    }
    return (
        <>
        
            <div className="w-full h-full bg-slate-400 p-4">
                <div className="w-full h-full flex justify-between bg-cyan-200">
                    {
                        imageList.length ? (
                        <ul className="grid grid-cols-4 gap-5">
                            {
                                imageList.map((item, index) =>{
                                    return <Card item={item} index={index} />                                  
                                })
                            }
                        </ul>) : (<h1></h1>)
                    }
                <div>
                        <button className="bg-slate-600" onClick={refreshHandler}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}