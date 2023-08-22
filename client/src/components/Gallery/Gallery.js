import * as React from 'react'
import './Gallery.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Card from '../Card/Card';
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Gallery() {
    const navigate = useNavigate()
    const [imageList, setImageList] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)
    const [itemStatus, setItemStatus] = React.useState(false)
    const [jsonObject, setJsonObject] = React.useState()

    const [currentItem, setCurrentItem] = React.useState()

    const [imagedata, setImageData] = React.useState()
    const [prediction, setPrediction] = React.useState()
    const [time, setTime] = React.useState()

    const configuration = {
        method: "post",
        url: "/api/gallery",
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


    React.useEffect(()=>{
        jsonObject && console.log(jsonObject)
        jsonObject && setImageData(jsonObject.image)
        jsonObject && setPrediction(jsonObject.predictions)
        jsonObject && setTime(jsonObject.time)
    },[jsonObject])

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
            console.log(item)
        }
        return (
            <>
                {
                    modalStatus && (
                        <div className="Modal">
                            <div className="ModalInner">
                                <div className="list">
                                    <div className="text-[32px] font-bold">
                                        Kết quả từ Roboflow
                                    </div>
                                    <div className="">
                                        Kích thước ảnh: {imagedata && imagedata.width}x{imagedata && imagedata.height}
                                    </div>
                                    <div>
                                        Thời gian detect: {time && time}
                                    </div>
                                    <div className="text-[24px]">Kết quả</div>
                                    <div className="predictionList grid grid-cols-2 gap-x-4 gap-y-1">
                                        {
                                            prediction.map((item,index)=>{
                                                return (
                                                    <button className="hover:opacity-40" onClick={() => handleItemClick(item)} key={index}>
                                                        {index} : {item.class}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <button onClick={() => setModalStatus(false)}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" className="absolute text-[21px] right-4 top-4 text-[#cc0000]" />
                                </button>                           
                            </div>
                        </div>
                    )
                }
            </>
        )
    }


    const LoadingCards = ({currentCards}) => {
        return (
            <>
                {
                    currentCards &&
                    currentCards.map((item, index) =>{
                        return <Card setModal={setModalStatus}
                        jsonObject = {jsonObject} 
                        setJson={setJsonObject} item={item} key={index} />                                  
                    })
                }
            </>
        )
    }

    const PaginatedCards =  ({cardPerPage}) =>{
        const [itemOffset, setItemOffset] = React.useState(0)
        const [pageCount, setPageCount] = React.useState(0);
        const [currentCards, setCurrentCards] = React.useState(null);

        React.useEffect(() => {
            const endOffset = itemOffset + cardPerPage
            setCurrentCards(imageList.slice(itemOffset, endOffset))
            setPageCount(Math.ceil(imageList.length/ cardPerPage))
        },[itemOffset,cardPerPage])


        const handlePageClick = (event) => {
            const newOffset = (event.selected * cardPerPage) % imageList.length
            setItemOffset(newOffset)
        }

        return (
            <>  
            <div className="flex flex-col gap-12 justify-center items-center">
                    <ul className="grid grid-cols-4 gap-x-4 gap-y-8">  
                        <LoadingCards currentCards={currentCards}  />
                    </ul>
                    <div className="Pagination">
                        <ReactPaginate 
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                        />
                    </div>

            </div>

            </>
        )
    
    }


    return (
        <>
            <div className="Gallery w-full h-full p-6">
                <Modal modalStatus={modalStatus}/>
                <ItemInfor itemStatus={itemStatus} currItem={currentItem}/>
                <div className="GalleryInner flex justify-center">
                    <PaginatedCards cardPerPage={8} />                       
                </div>
            </div>
        </>
    )
}