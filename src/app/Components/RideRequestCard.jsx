"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation, DollarSign } from "lucide-react"

const RideRequestCard = ({ rideData, onAccept, onReject, socket }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [driverId, setDriverId] = useState(null)
  const hasResponded = useRef(false)

  useEffect(() => {
    setIsClient(true)
    
    // Only access localStorage after client-side mounting
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("driverId")
      setDriverId(id)
    }

    return () => {
      hasResponded.current = false
    }
  }, [])

  const handleAccept = () => {
    if (hasResponded.current || !isClient) return
    hasResponded.current = true

    if (!driverId) {
      alert("Driver ID not found. Please log in again.")
      hasResponded.current = false
      return
    }

    if (!socket) {
      alert("Connection lost. Please refresh.")
      hasResponded.current = false
      return
    }

    const response = {
      driverId,
      accepted: true,
      requestId: rideData.requestId,
      timestamp: new Date().toISOString(),
    }

    socket.emit("rideResponse", response)
    setIsVisible(false)
    onAccept?.(rideData)
  }

  const handleReject = () => {
    if (hasResponded.current || !isClient) return
    hasResponded.current = true

    if (!driverId) {
      alert("Driver ID not found. Please log in again.")
      hasResponded.current = false
      return
    }

    if (!socket) {
      alert("Connection lost. Please refresh.")
      hasResponded.current = false
      return
    }

    const response = {
      driverId,
      accepted: false,
      requestId: rideData.requestId,
      timestamp: new Date().toISOString(),
    }

    socket.emit("rideResponse", response)
    setIsVisible(false)
    onReject?.(rideData)
  }

  // Don't render until client-side hydration is complete
  if (!isClient || !isVisible || !rideData) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      <div className="w-full max-w-sm mx-auto pointer-events-auto">
        <div className="w-full shadow-2xl bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden animate-in slide-in-from-bottom-4 border border-gray-200">
          <div className="space-y-4 pt-6 px-6 pb-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">New Ride Request</h3>
              <p className="text-sm text-gray-500">A passenger needs a ride</p>
            </div>

            {/* Pickup */}
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium text-gray-900">{rideData.start || "N/A"}</p>
                <p className="text-xs text-gray-400">Pickup Location</p>
              </div>
            </div>

            {/* Separator */}
            <div className="flex items-center space-x-3">
              <div className="w-3 flex flex-col items-center">
                <div className="w-0.5 h-6 bg-gray-300"></div>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Dropoff */}
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="font-medium text-gray-900">{rideData.end || "N/A"}</p>
                <p className="text-xs text-gray-400">Dropoff Location</p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-gray-50 rounded-lg p-3 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-sm">{rideData.duration || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Fare</p>
                    <p className="font-semibold text-sm">
                      ${rideData.fare || rideData.price || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {rideData.distanceKm || rideData.distance || "N/A"} km
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex space-x-3 px-6 pb-6">
            <button
              onClick={handleReject}
              disabled={hasResponded.current}
              className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 bg-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              disabled={hasResponded.current}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              Accept Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RideRequestCard