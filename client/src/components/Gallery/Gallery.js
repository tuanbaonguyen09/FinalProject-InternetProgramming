import * as React from 'react'
import './Gallery.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Card from '../Card/Card';
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


axios.defaults.withCredentials = true;


export default function Gallery() {
    const navigate = useNavigate()
    const [imageList, setImageList] = React.useState([])
    const configuration = {
        method: "post",
        url: "http://localhost:5000/api/gallery",
    }
    React.useEffect(() => {
        axios.get('http://localhost:5000/api/login').then((response) => {
            if(response.data.loggedIn == false){
              navigate('/login')
            } 
          })
        axios(configuration).then(result => {
            setImageList(result.data.gallery)
        }).catch(error => console.log(error))
    }, []);






    const LoadingCards = ({currentCards}) => {
        return (
            <>
                {
                    currentCards &&
                    currentCards.map((item, index) =>{
                        return <Card 
                        item={item} key={index} 
                        />                                  
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
            <div className="w-full flex flex-col justify-between">
                    <ul className="grid grid-cols-3 gap-x-4 gap-y-8">  
                        <LoadingCards currentCards={currentCards}  />
                    </ul>
                    <div className="Pagination self-center">
                        <ReactPaginate 
                            breakLabel="..."
                            nextLabel={<FontAwesomeIcon icon="fa-solid fa-chevron-right" />}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel={<FontAwesomeIcon icon="fa-solid fa-chevron-left" />}
                            renderOnZeroPageCount={null}
                        />
                    </div>

            </div>

            </>
        )
    
    }


    return (
        <>


            <div className="Gallery w-full h-full">
                {imageList ? (
                    <div className="GalleryInner flex w-full p-4">
                        <PaginatedCards cardPerPage={6} />                       
                    </div>
                ):(
                    <div className="p-4 text-[30px] font-bold">
                        THƯ VIỆN TRỐNG !
                    </div>
                )}

            </div>
        </>
    )
}