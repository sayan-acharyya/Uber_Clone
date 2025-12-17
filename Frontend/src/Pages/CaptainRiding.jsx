import axios from 'axios';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide';
const CaptainRiding = () => {

    const navigate = useNavigate();
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride



    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])



    const logout = () => {
        const token = localStorage.getItem('token');


        axios.get("http://localhost:4000/captains/logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Logout Successfully");
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        })

    }
    return (
        <div className="h-screen relative">

            {/* ✅ Upper panel & logo — KEPT AS IT IS */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img
                    className='w-16'
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt=""
                />

                {/* Logout Buttonn */}
                <button
                    onClick={logout}
                    className="absolute right-5 top-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow"
                >
                    <LogOut size={18} />
                </button>
            </div>
            {/* Map / Animation — unchanged */}
            <div className='h-4/5'>
                <img
                    className='h-full w-full object-cover'
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>

            {/* ✅ Lower panel — beautified only */}
            <div className='h-1/5 relative bg-yellow-400 rounded-t-3xl p-6 shadow-xl flex items-center justify-between'>

                {/* Drag handle */}
                <h5
                    className='absolute top-2 left-1/2 -translate-x-1/2 text-gray-700'
                    onClick={() => {

                    }}
                >
                    <ChevronUp size={28} />
                </h5>

                {/* Distance info */}
                <div>
                    <h4 className='text-xl font-semibold text-gray-900'>
                        4 KM away
                    </h4>
                    <p className='text-sm text-gray-700'>
                        Heading towards pickup
                    </p>
                </div>

                {/* Action button */}
                <button  onClick={() => {
                    setFinishRidePanel(true)
                }} className='px-6 py-3 font-semibold text-white text-md bg-gray-800 hover:bg-gray-900 transition rounded-xl shadow'>
                    Complete Ride
                </button>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>


        </div>
    )
}

export default CaptainRiding;
