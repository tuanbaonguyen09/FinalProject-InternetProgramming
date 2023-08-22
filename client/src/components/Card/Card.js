import * as React from 'react'
import './Card.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

axios.defaults.withCredentials = false;

export default function Card(props) {
    const imageName = props.item.name
    const imageBuffer = props.item.imgBuffer
    const imageDate = props.item.date
    const setModalStatus = props.setModal
    const setJsonObject = props.setJson
    const [data,setData] = React.useState()
    const configuration = {
        method: "post",
        url: "https://detect.roboflow.com/bkcbscountingsdataset/3",
        params: {
            api_key: "CJAwJ4fjzKXsuYskTEf1"
        },
        data: imageBuffer,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }


    const sampleTestingHandler = () =>{
        axios(configuration).then((response)=>{
            setData(response.data)
            alert('Detect hình ảnh thành công !')
        }).catch((err) => {
            console.log(err.message)
        })

    }

    React.useEffect(()=>{
        data && setJsonObject(data)
    },[data])

    return (
        <>
            <li className="Card">
                <div className="CardInner">
                    <div className="imgContainer">
                        <img src={`data:image/png;base64,${imageBuffer}`} />
                    </div>
                    <div className="Infor">
                        <div className="sub-item">
                            <p className="font-bold">Tên: </p>
                            {imageName}
                        </div>
                        <div className="sub-item">
                            <p className="font-bold">Thời gian upload: </p>
                            {imageDate.slice(0,10)}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <button className="checkBtn w-full" onClick={sampleTestingHandler}>Lấy dữ liệu</button>
                        <button className="checkBtn w-full" onClick={() => setModalStatus(true)} >
                            Kiểm tra
                        </button>
                    </div>

                </div>
            </li>
        </>
    )
}