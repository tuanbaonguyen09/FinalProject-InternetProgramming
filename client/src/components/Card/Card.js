import * as React from 'react'
import './Card.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoadingContext } from '../../context/LoadingContext.jsx';

export default function Card(props) {
    const {setIsLoading} = React.useContext(LoadingContext)

    const [currentItem, setCurrentItem] = React.useState()
    const [imagedata, setImageData] = React.useState()
    const [prediction, setPrediction] = React.useState()
    const [time, setTime] = React.useState()
    const [modalStatus, setModalStatus] = React.useState(false)
    const [itemStatus, setItemStatus] = React.useState(false)
    const [userRequest, setUserRequest] = React.useState({
        data: null,
        check:false
    })

    const  {data, check} = userRequest;

    const imageName = props.item.name
    const imageBuffer = props.item.imgBuffer
    const imageDate = props.item.date

    
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
        setIsLoading(true)
        axios(configuration).then((response)=>{
            setIsLoading(false)
            setUserRequest({
                data: response.data,
                check:true
            })
            alert('Detect hình ảnh thành công !')
        }).catch((err) => {
            console.log(err.message)
        })

    }



    React.useEffect(()=>{
        data && setImageData(data.image)
        data && setPrediction(data.predictions)
        data && setTime(data.time)
    },[data])
    
    const deleteHandler = () => {
        axios(DeleteConfiguration).then(response => {
            alert(response.data.message)
            window.location.reload();
        }).catch(error => console.log(error))
    }



    const ItemInfor = ({itemStatus, currItem}) => {
        
        return (
            <>
                {
                    currItem && itemStatus && (
                        <div className="Item relative">
                            <div className="ItemInner flex flex-col gap-1 justify-center">
                                <div className="text-[24px] font-bold text-center">Thông tin chi tiết</div>
                                <div className="mt-6">
                                    {
                                        Object.keys(currItem).map((key,index) => {
                                        return (
                                            <div className="text-[18px]" key={index}>{`- ${key}: ${currItem[key]}`}</div>
                                        )
                                        })
                                    }
                                </div>
 
                            </div>
                            <button onClick={() => setItemStatus(false)}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" className="absolute text-[21px] right-4 top-4 text-[#cc0000]" />
                            </button>  
                        </div>
                    )
                }
            </>
        )
    }


    const Modal = ({modalStatus}) => {
        const handleItemClick = (item) => {
            setItemStatus(true)
            setCurrentItem(item)
        }
        return (
            <>
                {
                    modalStatus && (
                        <div className="Modal">
                            <div className="ModalInner">
                                <div className="list">
                                    <div className="text-[32px] font-bold">
                                        Detection Result From Roboflow
                                    </div>
                                    <div className="">
                                        Image Size: {imagedata && imagedata.width}x{imagedata && imagedata.height}
                                    </div>
                                    <div>
                                        Time: {time && time}
                                    </div>
                                    <div className="text-[24px]">Object List Result</div>
                                    <div className="text-[12px]">(Click vào đối tượng để xem thông tin chi tiết)</div>
                                    <div className="predictionList px-3 py-1.5 grid grid-cols-2 gap-x-2 gap-y-1">
                                        {
                                            prediction.map((item,index)=>{
                                                return (
                                                    <button className="hover:opacity-40 max-w-[200px] text-left" onClick={() => handleItemClick(item)} key={index}>
                                                        {index} : {item.class}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <button onClick={() => setModalStatus(false)}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" className="absolute text-[21px] right-1.5 top-1 text-[#cc0000]" />
                                </button>                           
                            </div>
                        </div>
                    )
                }
            </>
        )
    }



    return (
        <>  
            <Modal modalStatus={modalStatus}/>
            <ItemInfor itemStatus={itemStatus} currItem={currentItem}/>
            <li className="Card">
                <div className="CardInner relative">
                    <button onClick={deleteHandler} className="absolute top-0.5 right-1.5 "><FontAwesomeIcon icon="fa-solid fa-xmark" className='z-20 text-[#D71313] text-base' /></button>
                    <div className="imgContainer">
                        <img src={`data:image/png;base64,${imageBuffer}`} />
                    </div>
                    <div className="Infor">
                        <div className="sub-item">
                            <p className="font-bold">Name: </p>
                            {imageName}
                        </div>
                        <div className="sub-item">
                            <p className="font-bold">Upload Time: </p>
                            {imageDate.slice(0,10)}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <button className="checkBtn w-full" onClick={sampleTestingHandler}>Detect</button>
                        <button disabled={!check} className="CheckButton checkBtn w-full" onClick={() => setModalStatus(true)} >
                            Result(JSON)
                        </button>
                    </div>

                </div>
            </li>
        </>
    )
}