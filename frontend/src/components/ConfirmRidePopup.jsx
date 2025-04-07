import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopup = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            rideId: ride._id,
            otp: otp,
          },
        }
      );

      if (response.status === 200) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride } });
      }
    } catch (error) {
      setError(error.response?.data?.message[0]?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <h3 className="text-2xl font-bold mb-5">Start the Ride</h3>

      <div className="flex items-center justify-between p-4 bg-yellow-300/80 rounded-xl shadow-md">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DY_UkwXIUk9kgA7CbqYlBmLzVRPqme7m1A&s"
            alt="User"
          />
          <h2 className="text-lg font-semibold">
            {ride?.user.fullName.firstName + " " + ride?.user.fullName.lastName}
          </h2>
        </div>
        <span className="text-lg font-semibold">2.2 KM</span>
      </div>

      <div className="flex flex-col gap-4 mt-6 text-gray-800">
        <InfoRow icon="ri-user-location-line" label={ride?.origin} />
        <InfoRow icon="ri-map-pin-line" label={ride?.destination} />
        <InfoRow
          icon="ri-money-rupee-circle-line"
          label={`₹ ${ride?.fare}`}
          subLabel="Cash"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full text-center text-xl font-mono bg-slate-100 rounded-xl p-3 border focus:outline-blue-400"
        />
        {error && <p className="text-center text-red-600 text-sm -mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl transition-all"
        >
          Confirm Ride
        </button>
        <button
          type="button"
          onClick={() => setConfirmRidePopupPanel(false)}
          className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 rounded-xl transition-all"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const InfoRow = ({ icon, label, subLabel }) => (
  <div className="flex items-start gap-4 pl-2">
    <i className={`text-2xl ${icon} text-gray-700`} />
    <div>
      <h3 className="text-lg font-medium leading-snug">{label}</h3>
      {subLabel && <p className="text-sm text-gray-500 -mt-1">{subLabel}</p>}
    </div>
  </div>
);

export default ConfirmRidePopup;
