"use client"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import dynamic from "next/dynamic"

// Dynamically import RoutingMachine with SSR disabled
const RoutingMachine = dynamic(() => import("./RoutingMachine"), { ssr: false })

const MapComponent = ({ position, showRoute, driverCoords }) => {
  const [taxiIcon, setTaxiIcon] = useState(null)
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    // Import Leaflet CSS dynamically
    import("leaflet/dist/leaflet.css")
    import("leaflet-routing-machine")
    import("leaflet-defaulticon-compatibility")
    import("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css")

    // Create taxi icon only on client side
    const icon = new L.Icon({
      iconUrl: "/taxi-icon.png",
      iconSize: [50, 50],
      iconAnchor: [20, 20],
    })

    setTaxiIcon(icon)
    setIsMapReady(true)
  }, [])

  if (!isMapReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Initializing map...</p>
        </div>
      </div>
    )
  }

  return (
    <MapContainer center={position} zoom={13} className="w-full h-full" scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>You are here – Kottayam</Popup>
      </Marker>
      {showRoute && driverCoords && taxiIcon && (
        <>
          <RoutingMachine from={driverCoords} to={position} />
          <Marker position={driverCoords} icon={taxiIcon} />
        </>
      )}
    </MapContainer>
  )
}

export default MapComponent
