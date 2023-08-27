import * as React from 'react'  
import './Upload.css'

import axios from 'axios'
import {useNavigate } from 'react-router-dom'

import { FileUploader } from "react-drag-drop-files";
import UploadBanner from '../../img/Upload/UploadImage.png'
axios.defaults.withCredentials = true;



export default function Upload(){
    const navigate = useNavigate()

    React.useEffect(() => {
      axios.get('http://localhost:5000/api/login').then((response) => {
        if(response.data.loggedIn == false){
          navigate('/login')
        } 
      })
    }, [])
    const fileTypes = ["JPG", "PNG"]
    const [file, setFile] = React.useState()
    const [fileName, setFileName] = React.useState('')
    const handleFileSelected = (file) => {
        setFile(file)
    }

    const handleName = (event) => {
      setFileName(event.target.value)
    }

    const uploadHandler = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        formData.append("inputName", fileName)
        axios.post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return(
        <>
          <div className="Upload">
              <div className="UploadInner flex gap-8 items-center justify-center">
                <div className="banner">
                  <img src={UploadBanner} alt="" />
                </div>

                <div className="UploadMain">
                  <div className="title">UPLOAD HERE</div>
                  
                  <form className="uploadForm">
                      <div className="item">
                        <label className="font-semibold text-[20px]" htmlFor="name">File Name</label>
                        <input className="input-text" type="text" name="name" id="name" placeholder="Enter your file name" onChange={handleName}/>
                      </div>

                      <div className="item">
                        <label className="font-semibold text-[20px]" htmlFor="image">Choose File</label>
                        <FileUploader classes="dropZone"
                        maxSize="2"
                        dropMessageStyle={{backgroundColor:'#393E46', color:'white', opacity:'100%'}}
                        hoverTitle="Drop Here" handleChange={handleFileSelected} name="file" types={fileTypes}/>
                      </div>
                  </form>

                  <button onClick={uploadHandler}
                      className=" hover:opacity-70
                      bg-[#0C356A] text-[18 px] w-full px-8 py-5 rounded-lg text-white font-bold">
                          UPLOAD
                      </button>
                </div>
              </div>
          </div>
        </>
    )
}