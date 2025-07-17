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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Patch Leaflet marker icons only on client
    const patchLeafletIcons = async () => {
      if (typeof window === "undefined") return;

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

    // Geolocation - only on client side
    if (typeof window !== "undefined" && "geolocation" in navigator) {
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
    } else if (typeof window !== "undefined") {
      setError("Geolocation is not supported in this browser.");
    }
  }, []);

  // Don't render anything until client-side hydration
  if (!isClient) {
    return (
      <div className="h-150 w-full border rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 p-4">Error: {error}</p>;
  }

  if (!position) {
    return (
      <div className="h-150 w-full border rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your current location…</p>
        </div>
      </div>
    );
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