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
    const [anoStatus, setAnoStatus] = React.useState(false)

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
                                        Detection Result
                                    </div>
                                    <div className="">
                                        Image Size: {imagedata && imagedata.width}x{imagedata && imagedata.height}
                                    </div>
                                    <div>
                                        Time: {time && time}
                                    </div>
                                    <div className="text-[24px]">Object List</div>
                                    <div className="text-[12px]">(Click vào đối tượng để xem thông tin chi tiết)</div>
                                    <div className="predictionList px-3 py-1.5  grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1">
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

    const PredictionWindow =  ({item}) => {
        const scaleHeight = 400/imagedata.height
        const scaleWidth = 600/imagedata.width
        const left = item.x*scaleWidth-40+ "px"
        const top = item.y*scaleHeight-40+ "px"
        const width = item.width*scaleWidth-4 + "px"
        const height = item.height*scaleHeight-4 + "px"
        return (
                <div className={`PredictionWindow 
                absolute
                border-2 border-rose-700
                z-50
                `}
                style={
                    {
                        left: `${left}`,
                        top: `${top}`,
                        width: `${width}`,
                        height: `${height}`,
                    }
                }
                >
                <div className="w-fit bg-red-600 text-red-800 absolute -top-2 text-[6px] font-bold">{item.class}</div> */
                </div>
        )
    }

    const IMG = () => {
        return (
            <>
                <img className="w-[600px] h-[400px]" src={`data:image/png;base64,${imageBuffer}`} alt="" />
            </>
        )
    }

    const Annotation = ({anoStatus}) => {
        
        return (
            <>
                {
                    anoStatus && (
                        <div className="overflow-hidden
                        font-lato rounded-lg shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]
                        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        AnnotationMain absolute z-30 bg-white w-[66%] h-[65%] flex items-center px-12 py-4 gap-12">
                        <button onClick={()=>setAnoStatus((anoStatus)=>false)} className="z-50 absolute top-0.5 right-1.5 "><FontAwesomeIcon icon="fa-solid fa-xmark" className='text-[#D71313] text-2xl' /></button>
                            <div className="AnnotationInner w-fit h-fit flex  min-w-[600px]">
                                <div className=" imgContainer w-full h-full relative">
                                <IMG/>
                                {
                                    prediction.map((item, index) => {
                                        return (
                                            <PredictionWindow 
                                                key={index}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                            </div>
                            </div>
                            <div className="flex-col hidden xl:flex">
                                <div className="text-[30px] font-bold uppercase">Visual Detection representation</div>
                                <div className="flex flex-col pl-6 text-[16px] mt-6">
                                    <div>Name: {imageName}</div>
                                    <div>Upload Time: {imageDate.slice(0,10)}</div>
                                    <div>Detection Time: {time}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }


    
    return (
        <>  
            <Annotation anoStatus={anoStatus}/>
            <Modal modalStatus={modalStatus}/>
            <ItemInfor itemStatus={itemStatus} currItem={currentItem}/>
            <li className="Card">
                <div className="CardInner relative">
                    <button onClick={deleteHandler} className="absolute top-0.5 right-1.5 "><FontAwesomeIcon icon="fa-solid fa-xmark" className='z-20 text-[#D71313] text-base' /></button>
                    <div className="imgContainer">
                        <IMG/>
                    </div>
                    <div className="flex gap-px">
                        <div className="Infor w-full">
                            <div className="sub-item">
                                <p>Name: {imageName}</p>
                                
                            </div>
                            <div className="sub-item">
                                <p>Upload Time: </p>
                                <p>{imageDate.slice(0,10)}</p>
                            </div>
                        </div>
                        <div className="w-full justify-between flex flex-col gap-1">
                            <button className="checkBtn w-full" onClick={sampleTestingHandler}>Detect</button>
                            <button disabled={!check} className="CheckButton checkBtn w-full" onClick={() => setModalStatus(true)} >
                                Result(JSON)
                            </button>
                        </div>

                    </div>
                    <button disabled={!check} onClick={() => setAnoStatus((anoStatus)=>true)} className="w-full md:flex justify-center hidden checkBtn">Annotation</button>
                </div>
            </li>
        </>
    )
}