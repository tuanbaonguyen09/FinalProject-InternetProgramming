import * as React from 'react'
import './Main.css'
import MainBanner from '../../img/Main/mainBanner.png'

export default function Main(){
    
    return ( 

        <>
            <div className="Main font-lato">
                <div className="MainInner w-full h-full max-w-7xl mx-auto flex flex-col py-12 justify-center items-center">
                    <div className="text-[50px] text-white font-bold rounded-lg px-10 py-2 bg-[#0C356A] w-fit">Internet Programming Final Project</div>
                    <div className="flex gap-4 mt-4">
                        <img className="w-full max-w-[500px] max-h-[500px] -mt-6 h-full object-cover object-center" src={MainBanner} alt="" />
                        <div className="
                        w-full flex flex-col gap-4 text-[#0C356A] h-fit px-2 py-12  rounded-lg">
                            <div className="text-[30px] font-bold">
                                Detection Application
                                <div className="pl-12"> Using Roboflow API </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-2 pl-6 text-[18px]">
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