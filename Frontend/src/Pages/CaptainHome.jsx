import axios from 'axios'
import {
  ClockFading,
  Gauge,
  LogOut,
  NotebookPen,
  User
} from 'lucide-react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CaptainDetails } from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);


  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  const navigate = useNavigate();

  const logout = () => {
    const token = localStorage.getItem('token')


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
    <div className="h-screen bg-[#FFD700]/80 ">

      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      {/* Logout */}
      <button
        onClick={logout}
        className="absolute right-5 top-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow"
      >
        <LogOut size={18} />
      </button>

      {/* Map */}
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
      </div>

      {/* Bottom Panel */}
      <div className="h-1/2 p-4 pt-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp
          // ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        //confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp

          // ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />


      </div>



    </div>
  )
}

export default CaptainHome
