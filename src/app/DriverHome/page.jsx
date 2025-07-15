"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import DriverHeader from "../Components/DriverHeader"
import { useDriver } from "../useContext/DriverContext"
import RideRequestCard from "../Components/RideRequestCard"
import LocationMap from "../Components/LocationMap"
import Footer from "../Components/Footer"

function Page() {
  const { driver } = useDriver()
  const [hasRideRequest, setHasRideRequest] = useState(false)
  const [rideRequestData, setRideRequestData] = useState(null)
  const [socket, setSocket] = useState(null)

  console.log("👤 Driver context:", driver)

  useEffect(() => {
    const socketConnection = io("http://localhost:5000")
    setSocket(socketConnection)

    socketConnection.on("connect", () => {
      console.log("✅ Connected to server with socket id:", socketConnection.id)

      // Get driverId from localStorage
      const driverId = localStorage.getItem("driverId")

      // Check if driverId exists in localStorage (more reliable)
      if (driverId) {
        console.log("📤 Emitting driverId:", driverId)
        socketConnection.emit("driverId", { driverId: driverId })
      } else {
        console.warn("⚠️ Driver ID not found in localStorage. Will not emit.")
      }
    })

    socketConnection.on("rideRequest", (data) => {
      console.log("🛎️ New ride request received:", data)

      const rideData = {
        start: data.rideDetails.start,
        end: data.rideDetails.end,
        duration: data.rideDetails.duration,
        distanceKm: data.rideDetails.distanceKm,
        fare: data.rideDetails.fare,
        requestId: data.requestId, // From the root level
        driverId: data.driverId, // From the root level (useful for validation)
      }

      setRideRequestData(rideData)
      setHasRideRequest(true)
    })

    return () => {
      socketConnection.disconnect()
      console.log("❌ Disconnected from server")
    }
  }, [])

  // Handle accept ride
  const handleAcceptRide = (rideData) => {
    console.log("✅ Ride accepted:", rideData)
    setHasRideRequest(false) // Hide the card
    setRideRequestData(null) // Clear the data
    // Add any additional logic here (e.g., navigate to ride tracking screen)
  }

  // Handle reject ride
  const handleRejectRide = (rideData) => {
    console.log("❌ Ride rejected:", rideData)
    setHasRideRequest(false) // Hide the card
    setRideRequestData(null) // Clear the data
    // Add any additional logic here
  }

  return (
    <div>
      <DriverHeader />
      {hasRideRequest && rideRequestData && (
        <RideRequestCard
          rideData={rideRequestData}
          socket={socket}
          onAccept={handleAcceptRide}
          onReject={handleRejectRide}
        />
      )}
      <LocationMap />
      <Footer />
    </div>
  )
}

export default Page
