"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Lazy load leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function LocationMap() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Patch Leaflet marker icons only on client
    const patchLeafletIcons = async () => {
      const L = await import("leaflet");

      const iconUrl = await import("leaflet/dist/images/marker-icon.png?url");
      const iconRetina = await import("leaflet/dist/images/marker-icon-2x.png?url");
      const shadowUrl = await import("leaflet/dist/images/marker-shadow.png?url");

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetina.default,
        iconUrl: iconUrl.default,
        shadowUrl: shadowUrl.default,
      });
    };

    patchLeafletIcons();

    // Geolocation
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
