import * as React from 'react'
import './Card.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
export default function Card(props) {
    const navigate = useNavigate()
    const imageName = props.item.name
    const imageBuffer = props.item.imgBuffer
    const imageDate = props.item.date
    const setModalStatus = props.setModal
    const setJsonObject = props.setJson
    const [data,setData] = React.useState()
    const configuration = {
        method: "post",
        url: "https://detect.roboflow.com/bkcbscountingsdataset/3",
        withCredentials: false,
        params: {
            api_key: "CJAwJ4fjzKXsuYskTEf1"
        },
        data: imageBuffer,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    const DeleteConfiguration = {
        method: "post",
        url: "http://localhost:5000/api/deleteIMG/",
        data: {
            id:props.item.id,
          },
    }


    const sampleTestingHandler = () =>{
        axios(configuration).then((response)=>{
            setData(response.data)
            alert('Detect hình ảnh thành công !')
        }).catch((err) => {
            console.log(err.message)
        })

    }

    const deleteHandler = () => {
        axios(DeleteConfiguration).then(response => {
            alert(response.data.message)
            window.location.reload();
        }).catch(error => console.log(error))
    }


    React.useEffect(()=>{
        data && setJsonObject(data)
    },[data])

    return (
        <>
            <li className="Card">
                <div className="CardInner relative">
                    <button onClick={deleteHandler} className="absolute top-1 right-2 "><FontAwesomeIcon icon="fa-solid fa-xmark" className='z-20 text-[#D71313] text-xl' /></button>
                    <div className="imgContainer">
                        <img src={`data:image/png;base64,${imageBuffer}`} />
                    </div>
                    <div className="Infor">
                        <div className="sub-item">
                            <p className="font-bold">Tên: </p>
                            {imageName}
                        </div>
                        <div className="sub-item">
                            <p className="font-bold">Ngày up: </p>
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