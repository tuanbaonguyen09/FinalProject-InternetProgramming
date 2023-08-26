import * as React from 'react'  
import './Upload.css'

import axios from 'axios'
import {useNavigate } from 'react-router-dom'

import { FileUploader } from "react-drag-drop-files";
import UploadBanner from '../../img/Upload/UploadImage.jpg'
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
                  <div className="title">Upload hình ảnh tại đây</div>
                  
                  <form className="uploadForm">
                      <div className="item">
                        <label className="font-semibold text-[20px]" htmlFor="name">Tên file</label>
                        <input className="input-text" value="" type="text" name="name" id="name" placeholder="Nhập tên file" onChange={handleName}/>
                      </div>

                      <div className="item">
                        <label className="font-semibold text-[20px]" htmlFor="image">Chọn file</label>
                        <FileUploader classes="dropZone"
                        dropMessageStyle={{backgroundColor:'#393E46', color:'white', opacity:'100%'}}
                        hoverTitle="Drop Here" handleChange={handleFileSelected} name="file" types={fileTypes}/>
                      </div>
                  </form>

                  <button onClick={uploadHandler}
                      className=" hover:opacity-70
                      bg-gray-800 text-[18 px] w-full px-8 py-5 rounded-lg text-white font-bold">
                          UPLOAD
                      </button>
                </div>
              </div>
          </div>
        </>
    )
}