
import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPanel from '../components/LocationSearchPanel'
import { User } from 'lucide-react'
import { ChevronDown } from 'lucide-react';
import { VehiclePanel } from '../components/VehiclePanel.jsx'
import ConfirmedRide from '../components/ConfirmedRide.jsx'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(true)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  /* GSAP animations (unchanged) */
  useGSAP(() => {
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
    })
  }, [panelOpen])

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
    })
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  return (
    <div className="h-screen relative overflow-hidden">

      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      {/* Map */}
      <img
        className="w-full h-full object-cover"
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt="map"
      />
      <div className="h-screen w-screen bg-gray-200" />

      {/* ===== Bottom Sheet ===== */}
      <div
        className={`
          absolute left-0 w-full bg-white z-30 flex flex-col
          transition-all duration-500 ease-in-out
          ${panelOpen ? 'top-0 h-screen' : 'bottom-0 h-[30%] rounded-t-2xl'}
        `}
      >
        {/* ===== Top Fixed Section ===== */}
        <div className="p-5 pt-4 shrink-0 relative">

          <button
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute right-3 top-3 text-2xl opacity-0"
          >
            <ChevronDown />
          </button>

          <h4 className="text-2xl font-bold">Find a trip</h4>

          <form className="relative py-3">
            <div className="absolute h-16 w-1 top-[55%] -translate-y-1/2 left-5 bg-black rounded-full"></div>

            <input
              onFocus={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eeee] px-12 py-2 rounded-lg border mt-5 w-full text-lg"
              placeholder="Add a pick-up location"
            />

            <input
              onFocus={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eeee] px-12 py-2 rounded-lg border mt-3 w-full text-lg"
              placeholder="Enter your destination"
            />
          </form>

          <button className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full font-semibold">
            Find Trip
          </button>
        </div>

        {/* ===== Scrollable Section ===== */}
        {panelOpen && (
          <div
            ref={panelRef}
            className="flex-1 overflow-y-auto bg-white px-2 pb-6"
          >
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}

            />
          </div>
        )}
      </div>

      {/* ===== Vehicle Panel ===== */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setPanelOpen={setPanelOpen}
          setVehiclePanel={setVehiclePanel}
          vehiclePanel={vehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}

        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-40 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmedRide
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          confirmRidePanel={confirmRidePanel}

        />
      </div>





    </div >
  )
}

export default Home



