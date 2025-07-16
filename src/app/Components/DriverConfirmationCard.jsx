import { User, Star, DollarSign } from "lucide-react";
import DriverAxios from "../Axios/DriverAxios";


export default function DriverConfirmationCard({ driverData, onAction }) {
  console.log("data in DriverConfirmationCard:", driverData);
  const { acceptedDriver, ridedetails } = driverData;

  const handleCancel = () => {
    onAction?.("cancel");
  };

  const handleConfirm = async () => {
    if (!driverData) return;
    const userId = localStorage.getItem('userId')

    const formattedData = {
      userId: userId,
      driverId: acceptedDriver.id,
      pickup_location: ridedetails.start,
      dropoff_location: ridedetails.end,
      Pickup_coordinates: {
        lat: ridedetails.pickupCoordinates.pickuplat,
        lon: ridedetails.pickupCoordinates.pickuplon,
      },
      dropoff_coordinates: {
        lat: ridedetails.dropoffCoordinates.dropofflat,
        lon: ridedetails.dropoffCoordinates.dropofflon,
      },
      fare: ridedetails.fare,
      distance: ridedetails.distanceKm,
      duration: ridedetails.duration,
    };

    try {
      const response = await DriverAxios.post("/ride", formattedData);
      console.log("✅ Ride saved:", response.data);
      onAction?.("confirm");
    } catch (error) {
      console.error("❌ Failed to save ride:", error.response?.data || error.message);
      alert("Failed to save ride. Please try again.");
    }
  };

  const renderStars = (rating = 5) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" />
      <div className="fixed inset-0 flex items-center justify-center z-500 p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
          {/* Driver Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {acceptedDriver?.name || "Driver"}
                </h3>
                <p className="text-sm text-gray-500">ID: {acceptedDriver?.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">{renderStars(acceptedDriver?.rating)}</div>
          </div>

          {/* Pickup & Dropoff */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="text-gray-900 font-medium capitalize">
                  {ridedetails?.start || "Pickup Location"}
                </p>
                {ridedetails?.pickupCoordinates && (
                  <p className="text-xs text-gray-400">
                    {ridedetails.pickupCoordinates.pickuplat},{" "}
                    {ridedetails.pickupCoordinates.pickuplon}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="text-gray-900 font-medium capitalize">
                  {ridedetails?.end || "Drop Location"}
                </p>
                {ridedetails?.dropoffCoordinates && (
                  <p className="text-xs text-gray-400">
                    {ridedetails.dropoffCoordinates.dropofflat},{" "}
                    {ridedetails.dropoffCoordinates.dropofflon}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-semibold text-gray-900">
                {ridedetails?.distanceKm ? `${ridedetails.distanceKm} km` : "N/A"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold text-gray-900">
                {ridedetails?.duration ? `${ridedetails.duration} hrs` : "N/A"}
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 text-sm font-medium">Total Fare</span>
            </div>
            <span className="font-bold text-blue-900 text-xl">₹{ridedetails?.fare || 0}</span>
          </div>

          {/* Driver Distance */}
          {acceptedDriver?.distance && (
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                Driver is{" "}
                <span className="font-semibold">
                  {(acceptedDriver.distance / 1000).toFixed(1)} km
                </span>{" "}
                away from you
              </p>
            </div>
          )}

          {/* Confirmation Message */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium">{acceptedDriver?.name || "Driver"}</span> has accepted
              your ride. Confirm your ride to proceed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
