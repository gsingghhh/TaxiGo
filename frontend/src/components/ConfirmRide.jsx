import React from "react";
import axios from "axios";

const ConfirmRide = (props) => {

  const createRide = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        origin: props.pickup,
        destination: props.destination,
        vehicleType: props.vehicleType,
      },
      {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <div className="flex gap-5 justify-between items-center flex-col">
      <img
        className="w-50"
        src = {props.vehicleImage}
        alt=""
      />
      <div className="w-full flex flex-col items-center gap-5 mb-5">
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-1">
          <i className="text-xl ri-user-location-line"></i>
          <div>
            <h3 className="text-xl font-medium">{props.pickup}</h3>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-1">
          <i className="text-xl ri-map-pin-line"></i>
          <div>
            <h3 className="text-xl font-medium">{props.destination}</h3>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-10  border-b-1 -mt-2 pb-1">
          <i className=" text-xl ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-xl font-medium">₹ {props.fare[props.vehicleType]}</h3>
            <p className="-mt-1 text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          createRide();
          props.setConfirmRidePanel(false)
          props.setVehicleFound(true)
        }}
        className="w-full bg-blue-400 text-white font-semibold p-2 rounded-xl"
      >
        Confirm
      </button>
      <button
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="w-full bg-red-400 text-white font-semibold p-2 rounded-xl mb-3"
      >
        Cancel request
      </button>
    </div>
  );
};

export default ConfirmRide;
