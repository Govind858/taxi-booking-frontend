"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation, DollarSign } from "lucide-react"

const RideRequestCard = ({ rideData, onAccept, onReject, socket }) => {
  const [isVisible, setIsVisible] = useState(true)
  const hasResponded = useRef(false) // Prevent double responses

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      hasResponded.current = false
    }
  }, [])

  const handleAccept = () => {
    // Prevent multiple responses
    if (hasResponded.current) return
    hasResponded.current = true

    console.log("Accepting ride request:", rideData)

    // Validate required data
    const driverId = localStorage.getItem("driverId")
    if (!driverId) {
      console.error("Driver ID not found in localStorage")
      alert("Driver ID not found. Please log in again.")
      hasResponded.current = false // Reset if validation fails
      return
    }

    if (!socket) {
      console.error("Socket not available")
      alert("Connection lost. Please refresh the page.")
      hasResponded.current = false // Reset if validation fails
      return
    }

    // Send response matching backend expectations exactly
    const response = {
      driverId: driverId, // This must match the driver.id from backend
      accepted: true,
      requestId: rideData.requestId, // Include requestId for backend validation
      timestamp: new Date().toISOString(),
    }

    console.log("Sending accept response:", response)
    socket.emit("rideResponse", response)

    // Hide the card immediately
    setIsVisible(false)

    // Call the parent callback to update parent state
    if (onAccept) {
      onAccept(rideData)
    }
  }

  const handleReject = () => {
    // Prevent multiple responses
    if (hasResponded.current) return
    hasResponded.current = true

    console.log("Rejecting ride request:", rideData)

    // Validate required data
    const driverId = localStorage.getItem("driverId")
    if (!driverId) {
      console.error("Driver ID not found in localStorage")
      alert("Driver ID not found. Please log in again.")
      hasResponded.current = false // Reset if validation fails
      return
    }

    if (!socket) {
      console.error("Socket not available")
      alert("Connection lost. Please refresh the page.")
      hasResponded.current = false // Reset if validation fails
      return
    }

    // Send response matching backend expectations exactly
    const response = {
      driverId: driverId, // This must match the driver.id from backend
      accepted: false,
      requestId: rideData.requestId, // Include requestId for backend validation
      timestamp: new Date().toISOString(),
    }

    console.log("Sending reject response:", response)
    socket.emit("rideResponse", response)

    // Hide the card immediately
    setIsVisible(false)

    // Call the parent callback to update parent state
    if (onReject) {
      onReject(rideData)
    }
  }

  // Don't render anything if card is not visible
  if (!isVisible) {
    return null
  }

  // Validate rideData exists
  if (!rideData) {
    console.error("No rideData provided to RideRequestCard")
    return null
  }

  return (
    // Transparent Overlay Container - Card floats above map
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
      {/* Card Container */}
      <div className="w-full max-w-sm mx-auto pointer-events-auto">
        <div className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden animate-in slide-in-from-bottom-4 border border-gray-200">
          <div className="space-y-4 pt-6 px-6 pb-4">
            {/* Header */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">New Ride Request</h3>
              <p className="text-sm text-gray-500">A passenger needs a ride</p>
            </div>

            {/* Pickup Location */}
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium text-gray-900">{rideData.start || "N/A"}</p>
                <p className="text-xs text-gray-400">Pickup Location</p>
              </div>
            </div>

            {/* Route Line */}
            <div className="flex items-center space-x-3">
              <div className="w-3 flex flex-col items-center">
                <div className="w-0.5 h-6 bg-gray-300"></div>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Dropoff Location */}
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="font-medium text-gray-900">{rideData.end || "N/A"}</p>
                <p className="text-xs text-gray-400">Dropoff Location</p>
              </div>
            </div>

            {/* Trip Details */}
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
                    <p className="font-semibold text-sm">${rideData.fare || rideData.price || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="text-center">
              <p className="text-sm text-gray-500">{rideData.distanceKm || rideData.distance || "N/A"} km</p>
            </div>

            {/* Debug Info (remove in production) */}
            {/* {process.env.NODE_ENV === "development" && (
              <div className="text-xs text-gray-400 bg-gray-100 p-2 rounded">
                Driver ID (localStorage): {localStorage.getItem("driverId") || "Not found"}
                <br />
                Driver ID (from request): {rideData.driverId || "Not provided"}
                <br />
                Request ID: {rideData.requestId || "Not provided"}
                <br />
                Socket Connected: {socket?.connected ? "Yes" : "No"}
                <br />
                Socket ID: {socket?.id || "Not available"}
              </div>
            )} */}
          </div>

          {/* Footer */}
          <div className="flex space-x-3 px-6 pb-6">
            <button
              onClick={handleReject}
              disabled={hasResponded.current}
              className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              disabled={hasResponded.current}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
