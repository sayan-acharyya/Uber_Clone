import React from 'react'
import { MapPin } from 'lucide-react'

const LocationSearchPanel = (props) => {

    const locations = [
        {
            id: 1,
            address: "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
        },
        {
            id: 2,
            address: "M.P. Nagar Zone 2, Near DB Mall, Bhopal",
        },
        {
            id: 3,
            address: "New Market, TT Nagar, Bhopal",
        },
    ]

    return (
        <div>
            {locations.map((location) => (
                <div
                    onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }}
                    key={location.id}
                    className="bg-white rounded-xl border-2 border-gray-100 active:border-black p-3 mx-2 my-2"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex p-2 items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                            <MapPin size={20} className="text-black" />
                        </div>

                        <h4 className="text-base font-semibold text-gray-900 leading-snug">
                            {location.address}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel
