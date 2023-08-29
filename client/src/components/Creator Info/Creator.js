import * as React from 'react'
//font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Creator.css'

import CreatorIMG from '../../img/Creator/Creator.jpg'
import BKLogo from '../../img/Creator/CreatorLogo.png'
export default function Creator () {

    return (
        <>
            <div className="CreatorMain
            ">
                <div className="CreatorInner">
                    <div className="w-full max-w-[450px] hidden xl:flex">
                        <img className="MainBanner object-cover " src={CreatorIMG} alt="" />
                    </div>

                    <div className="max-w-[650px] w-full flex flex-col relative text-[#0C356A] justify-between">
                        <div>

                        </div>
                        <div className="hidden xl:flex font-bold text-[60px] absolute top-8 -left-28">
                            HELLO,
                        </div>
                        <div className="hidden xl:flex top-28 absolute font-bold text-[50px]">
                            I'm Nguyen Hoang Tuan Bao
                        </div> 
                        <div className="font-bold text-[24px] xl:hidden md:text-[30px]">
                            I'm Nguyen Hoang Tuan Bao - 2012667
                        </div> 

                        <div className="flex flex-col gap-4 mb-12">
                            <div className="uppercase text-[20px] max-w-[50%] font-bold relative">
                                <div className="mb-8 hidden xl:flex">STUDENT ID</div>
                                <div className="text-[35px] absolute bottom-0 right-3 hidden xl:flex">2012667</div>
                            </div>
                            <div className="flex gap-4 items-center font-bold">
                                <div>
                                    <img className="max-w-[80px] max-h-[80px] object-cover" src={BKLogo} alt="" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="uppercase text-[18px]">HO CHI MINH city university of technology</div>
                                    <div className="uppercase text-[18px]">4TH YEAR Student</div>
                                </div>
                            </div>
                            <div className="flex gap-6 mt-16">
                                <a className="" href="https://www.facebook.com/bao.nguyenhoangtuan/">
                                    <FontAwesomeIcon icon="fa-brands fa-facebook" className='w-8 h-8 hover:opacity-50'/>
                                </a>
                                <a className="" href="https://www.instagram.com/tunbaong/">
                                    <FontAwesomeIcon icon="fa-brands fa-instagram" className='w-8 h-8 hover:opacity-50'/>
                                </a>
                                <a className="" href="mailto:tuanbaonguyen09@gmail.com">
                                    <FontAwesomeIcon icon="fa-solid fa-envelope" className='w-8 h-8 hover:opacity-50'/>
                                </a>
                                <a className="" href="https://github.com/tuanbaonguyen09">
                                    <FontAwesomeIcon icon="fa-brands fa-github" className='w-8 h-8 hover:opacity-50'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}