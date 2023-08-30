import * as React from 'react'
import './Main.css'
import MainBanner from '../../img/Main/mainBanner.png'

export default function Main(){
    
    return ( 

        <>
            <div className="Main font-lato">
                <div className="MainInner">
                    <div className="title">Internet Programming Final Project</div>
                    <div className="flex gap-4 md:mt-4 mt-2">
                        <img className="Banner" src={MainBanner} alt="" />
                        <div className="Infor">
                            <div className="text-[16px] md:text-[22px] xl:text-[30px] font-bold text-center md:text-left">
                                Detection Application
                                <div className="pl-12"> Using Roboflow API </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-2 pl-6 text-[12px] md:text-[16px] xl:text-[18px] text-center md:text-left">
                                <div>
                                    Name: 
                                    <div>BKCBSCountingsDataset Computer Vision</div>
                                </div>
                                <div>
                                    Model: 
                                    <div>BK CBS DS Type1</div>
                                </div>
                                <div>
                                    Instructor: 
                                    <div>TS. Nguyen Quang Hung</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}