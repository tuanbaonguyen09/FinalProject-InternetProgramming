import * as React from 'react'  
import axios from 'axios'
import { UserContext } from '../../context/UserContext.jsx';

export default function Upload(){

    const [file, setFile] = React.useState()
    const {userName,setUserName} = React.useContext(UserContext)

    const handleFileSelected = (event) => {
        setFile(event.target.files[0])
    }

    const uploadHandler = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        formData.append("userName", userName)
        axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return(
        <>
            <div>
                <h1>Upload your image here</h1>
                <form medthod="POST">
                    <input type="file" name="image" id="image" onChange={handleFileSelected}/>
                    <button onClick={uploadHandler}
                    className="bg-gray-800 w-1/5 text-white">
                        Upload
                    </button>
                </form>
                
            </div>
        </>
    )
}