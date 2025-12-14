 import { ChevronDown, IndianRupee, LocateFixed, MapPin } from 'lucide-react'
import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="relative px-4 pt-8 pb-4">

      {/* Close Arrow */}
      <h5
        className="absolute top-0 right-2 p-2 cursor-pointer text-gray-600 hover:text-black "
        onClick={() => {
          props.setWaitingForDriver(false)
        }}
      >
        <ChevronDown size={26} />
      </h5>

      {/* Driver Header */}
      <div className="flex items-center justify-between bg-white rounded-xl border shadow-sm p-4">
        
        {/* Driver Photo + Car */}
        <div className="flex items-center gap-3">
          <img
            className="h-14 w-14 rounded-full object-cover border"
            src="data:image/jpeg;base64,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"
            alt="driver"
          />
          <img
            className="h-10"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="car"
          />
        </div>

        {/* Driver Info */}
        <div className="text-right">
          <h2 className="text-lg font-semibold capitalize">
            Rakib Alam
          </h2>
          <h4 className="text-base font-bold -mt-1">
            WB 323/2645
          </h4>
          <p className="text-sm text-gray-600">
            Maruti Suzuki Alto
          </p>
          <h1 className="text-sm font-semibold text-gray-800">
            OTP: 889654
          </h1>
        </div>
      </div>

      {/* Trip Details */}
      <div className="w-full mt-5 bg-white rounded-xl border shadow-sm overflow-hidden">

        {/* Pickup */}
        <div className="flex items-start gap-4 p-4 border-b">
          <MapPin size={22} className="text-black mt-1" />
          <div>
            <h3 className="text-base font-semibold">562/11-A</h3>
            <p className="text-sm text-gray-500 -mt-1">
              Kankariya Talab, Ahmedabad
            </p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 p-4 border-b">
          <LocateFixed size={22} className="text-black mt-1" />
          <div>
            <h3 className="text-base font-semibold">236/11-A</h3>
            <p className="text-sm text-gray-500 -mt-1">
              J.P Nagar, Ahmedabad
            </p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4 p-4">
          <IndianRupee size={22} className="text-black mt-1" />
          <div>
            <h3 className="text-base font-semibold">₹223</h3>
            <p className="text-sm text-gray-500 -mt-1">
              Cash Payment
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WaitingForDriver
