import * as React from 'react'
import './Card.css'
import axios from 'axios';

export default function Card(props) {
    const imageBuffer = props.item.imgBuffer
    const imageDate = props.item.date
    const configuration = {
        method: "post",
        url: "https://detect.roboflow.com/bkcbscountingsdataset/3",
        params: {
            api_key: "23lFCaU640c69z7UxN1y"
        },
        data: imageBuffer,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    const sampleTestingHandler = () =>{
        axios(configuration).then((response)=>{
            console.log(response.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }



    return (
        <>
            <li className="flex flex-col gap-4 bg-red-500">
                <img src={`data:image/png;base64,${imageBuffer}`} />
                <div className="text-white">{imageDate}</div>
                <button onClick={sampleTestingHandler} >Kiểm tra</button>
            </li>
        </>
    )
}