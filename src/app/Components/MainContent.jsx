"use client"
import { useState } from "react"
import { MapPin, Loader2 } from "lucide-react"
import DriverAxios from "../Axios/DriverAxios"
import DriverConfirmationCard from "./DriverConfirmationCard"
import dynamic from "next/dynamic"

const position = [9.5916, 76.5222] // Static user location

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
})

export default function MainContent() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [DriverData, setDriverData] = useState(null)
  const [showRoute, setShowRoute] = useState(false)
  const [driverCoords, setDriverCoords] = useState(null)

  const handleSeePrices = async () => {
    setError("")
    if (!pickupLocation?.trim() || !dropLocation?.trim()) {
      setError("Please enter both pickup and drop locations")
      return
    }
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await DriverAxios.get(`/nearby`, {
        params: {
          start: pickupLocation.trim(),
          end: dropLocation.trim(),
        },
        timeout: 10000
      })

      if (response.data) {
        const { acceptedDriver, ridedetails } = response.data.availableDrivers
        setDriverData({ acceptedDriver, ridedetails })
        if (!acceptedDriver) {
          setError("No drivers found in your area. Please try again later.")
        }
      } else {
        setError("No data received from server. Please try again.")
      }
    } catch (error) {
      console.error("Error fetching nearby drivers:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Ride</h2>
              <p className="text-gray-600 mb-8">Where would you like to go today?</p>

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">{error}</div>
                )}

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter pickup location"
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-gray-700 text-lg disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Drop Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    <input
                      type="text"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      placeholder="Enter destination"
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-gray-700 text-lg disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSeePrices}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Searching Drivers...
                    </>
                  ) : (
                    "See Prices & Book Ride"
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[500px] z-0">
              <MapComponent position={position} showRoute={showRoute} driverCoords={driverCoords} />
            </div>
          </div>
        </div>
      </main>

      {DriverData?.acceptedDriver && (
        <DriverConfirmationCard
          driverData={DriverData}
          onAction={(action) => {
            if (action === "cancel") {
              setDriverData(null)
              setShowRoute(false)
            } else if (action === "confirm") {
              console.log("Ride confirmed!")
              setDriverCoords([DriverData.acceptedDriver.latitude, DriverData.acceptedDriver.longitude])
              setShowRoute(true)
              setDriverData(null)
            }
          }}
        />
      )}
    </>
  )
}