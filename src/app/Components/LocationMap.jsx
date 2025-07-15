"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Import default marker icons using ?url for Next.js
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png?url";
import markerIcon from "leaflet/dist/images/marker-icon.png?url";
import markerShadow from "leaflet/dist/images/marker-shadow.png?url";

// ✅ Patch the default Leaflet marker icon paths
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LocationMap() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setPosition([latitude, longitude]);
          console.log(`✅ Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}m`);
          console.log(`🔗 Map link: https://www.google.com/maps?q=${latitude},${longitude}`);
        },
        (err) => setError(err.message),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  if (error) {
    return <p className="text-red-600 p-4">Error: {error}</p>;
  }

  if (!position) {
    return <p className="p-4">Loading your current location…</p>;
  }

  return (
    <div className="h-150 w-full border rounded-lg overflow-hidden">
      <MapContainer center={position} zoom={14} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>
            You are here<br />Accuracy: high
          </Popup>
        </Marker>
      </MapContainer>
      <p className="text-center mt-2 text-sm text-gray-600">
        📍 Latitude: {position[0].toFixed(6)}, Longitude: {position[1].toFixed(6)}
      </p>
    </div>
  );
}
