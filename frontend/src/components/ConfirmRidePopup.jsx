import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
      });

    if(response.status === 200){
      props.setConfirmRidePopupPanel(false)
      props.setRidePopupPanel(false)
      navigate('/captain-riding',{ state: {ride: props.ride} })
    }
  };

  return (
    <div className="flex justify-between h-full gap-3 flex-col">
      <h3 className="text-2xl font-semibold mb-5">Start the ride?</h3>
      <div className="flex items-center justify-between p-3 bg-amber-300 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DY_UkwXIUk9kgA7CbqYlBmLzVRPqme7m1A&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullName.firstName +
              " " +
              props.ride?.user.fullName.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="w-full flex flex-col items-center gap-5">
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-1">
          <i className="text-xl ri-user-location-line"></i>
          <div>
            <h3 className="text-xl font-medium">{props.ride?.origin}</h3>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-1">
          <i className="text-xl ri-map-pin-line"></i>
          <div>
            <h3 className="text-xl font-medium">{props.ride?.destination}</h3>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 -mt-2 pb-1">
          <i className=" text-xl ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-xl font-medium">₹ {props.ride?.fare}</h3>
            <p className="-mt-1 text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-6 flex flex-col">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="Enter OTP"
            className="w-full text-center my-5 font-mono bg-slate-200 rounded-lg text-lg px-8 py-2 mb-20"
          />
          <button className="w-full bg-blue-500 text-center text-white font-semibold p-2 rounded-xl mt-3 mb-3">
            Confirm
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(false);
            }}
            className="w-full bg-red-500 text-white font-semibold p-2 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmRidePopup;
