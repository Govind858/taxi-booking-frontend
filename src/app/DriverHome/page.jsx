"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DriverHeader from "../Components/DriverHeader";
import { useDriver } from "../useContext/DriverContext";
import RideRequestCard from "../Components/RideRequestCard";
import LocationMap from "../Components/LocationMap";
import Footer from "../Components/Footer";

function Page() {
  const { driver } = useDriver();
  const [hasRideRequest, setHasRideRequest] = useState(false);
  const [rideRequestData, setRideRequestData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isClient, setIsClient] = useState(false);

  console.log("👤 Driver context:", driver);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    const socketConnection = io("http://localhost:5000");
    setSocket(socketConnection);

    socketConnection.on("connect", () => {
      console.log("✅ Connected to server with socket id:", socketConnection.id);

      // Only access localStorage after confirming we're on the client
      if (typeof window !== "undefined") {
        const driverId = localStorage.getItem("driverId");

        if (driverId) {
          console.log("📤 Emitting driverId:", driverId);
          socketConnection.emit("driverId", { driverId: driverId });
        } else {
          console.warn("⚠️ Driver ID not found in localStorage. Will not emit.");
        }
      }
    });

    socketConnection.on("rideRequest", (data) => {
      console.log("🛎️ New ride request received:", data);

      const rideData = {
        start: data.rideDetails.start,
        end: data.rideDetails.end,
        duration: data.rideDetails.duration,
        distanceKm: data.rideDetails.distanceKm,
        fare: data.rideDetails.fare,
        requestId: data.requestId,
        driverId: data.driverId,
      };

      setRideRequestData(rideData);
      setHasRideRequest(true);
    });

    return () => {
      socketConnection.disconnect();
      console.log("❌ Disconnected from server");
    };
  }, []);

  const handleAcceptRide = (rideData) => {
    console.log("✅ Ride accepted:", rideData);
    setHasRideRequest(false);
    setRideRequestData(null);
    // Navigate or trigger ride tracking UI
  };

  const handleRejectRide = (rideData) => {
    console.log("❌ Ride rejected:", rideData);
    setHasRideRequest(false);
    setRideRequestData(null);
    // Add rejection logic if needed
  };

  // Don't render interactive components until client-side hydration
  if (!isClient) {
    return (
      <div>
        <DriverHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
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
  );
}

export default Page;