import { ClockFading, Gauge, NotebookPen, User } from 'lucide-react'
import React from 'react'

export const CaptainDetails = () => {
    return (
        <div>
            {/* Profile Card */}
            <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-md">

                <div className="flex items-center gap-3">
                    {/* Dummy Captain Image */}
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-yellow-500">
                        <User size={24} className="text-gray-700" />
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold">Rakib Alam</h4>
                        <p className="text-sm text-gray-500">Captain</p>
                    </div>
                </div>

                <div className="text-right">
                    <h4 className="text-xl font-bold text-black">₹295</h4>
                    <p className="text-sm text-gray-500">Earned</p>
                </div>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">

                <div className="bg-[#FFF3B0] rounded-xl p-3 text-center shadow-sm">
                    <ClockFading size={22} className="mx-auto mb-1" />
                    <h5 className="font-semibold">10.2</h5>
                    <p className="text-xs text-gray-600">Hours</p>
                </div>

                <div className="bg-[#FFF3B0] rounded-xl p-3 text-center shadow-sm">
                    <Gauge size={22} className="mx-auto mb-1" />
                    <h5 className="font-semibold">45 km</h5>
                    <p className="text-xs text-gray-600">Distance</p>
                </div>

                <div className="bg-[#FFF3B0] rounded-xl p-3 text-center shadow-sm">
                    <NotebookPen size={22} className="mx-auto mb-1" />
                    <h5 className="font-semibold">12</h5>
                    <p className="text-xs text-gray-600">Trips</p>
                </div>

            </div>
        </div>
    )
}
