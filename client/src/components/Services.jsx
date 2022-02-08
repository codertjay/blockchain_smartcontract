import React from 'react';
import {BsShieldFillCheck} from "react-icons/all";
import {BiSearchAlt} from "react-icons/all";
import {RiHeart2Fill} from "react-icons/all";
import {color} from "tailwindcss/lib/util/dataTypes";

const ServiceCard = ({color,icon,subtitle,fontSize,title,className}) => (
    <div className={'flex flex-row justify-start items-center white-glassmorphism m-2 cursor-pointer p-3  ' +
    'hover:shadow-xl '}>
        <div className={`w-10 h-10 rounded-full flex justify-center items-center color  ${color}`}>
            {icon}
        </div>
        <div className={'ml-5 flex flex-col flex-1'}>
            <h1 className={'mt-2 text-white text-lg'}>{title}</h1>
            <p className={'mt-2 text-white text-sm md:w-9/12'}>{subtitle}</p>
        </div>

    </div>
)

const Services = () => {
    return (
        <div className={'flex w-full flex-col md:flex-row justify-center items-center gradient-bg-services'}>
            <div className={'flex mf:flex-row flex-col ' +
            'items-center justify-between md:p-20 py-12'}>
                <div className={'flex-1 flex flex-col justify-start items-start '}>
                    <h1 className={'text-white  text-3xl sm:text-5xl py-2 text-gradient'}>Services that
                        we <br/> continue to improve</h1>
                </div>
            </div>
            <div className={'flex-1 flex  flex-col justify-start items-center'}>
                <ServiceCard color={'bg-[#2952e3]'}
                             title={'Security Guaranteed'}
                             icon={<BsShieldFillCheck
                             fontSize={21}
                             className={'text-white'}
                             />}

                             subtitle={"Security is guaranteed . " +
                             "we always maintain privacy and " +
                             "maintaining the quality of our product "}
                />  <ServiceCard color={'bg-[#8945f8]'}
                             title={'Best Exchange Rate'}
                             icon={<BiSearchAlt
                             fontSize={21}
                             className={'text-white'}/>}
                             subtitle={"Security is guaranteed . " +
                             "we always maintain privacy and " +
                             "maintaining the quality of our product "}
                />  <ServiceCard color={'bg-[#f84550]'}
                             title={'Fastest Transactions'}
                             icon={<RiHeart2Fill
                             fontSize={21}
                             className={'text-white'}
                             />}
                             subtitle={"Security is guaranteed . " +
                             "we always maintain privacy and " +
                             "maintaining the quality of our product "}
                />
            </div>
        </div>
    );
};

export default Services;
