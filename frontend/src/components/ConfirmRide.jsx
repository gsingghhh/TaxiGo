import React from "react";

const ConfirmRide = (props) => {
  return (
    <div className="flex gap-5 justify-between items-center flex-col">
      <img
        className="w-50"
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712278121/assets/e0/25905c-43bd-4797-91e6-29d0ae9cb48d/original/Taxi-%281%29-%286%29.png"
        alt=""
      />
      <div className="w-full flex flex-col items-center gap-5 mb-5">
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 rounded-xl pb-1">
          <i className="text-xl ri-user-location-line"></i>
          <div>
            <h3 className="text-xl font-medium">Dream Homes</h3>
            <p className="-mt-1 text-sm text-gray-600">Wave City, Ghaziabad</p>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 rounded-xl pb-1">
          <i className="text-xl ri-map-pin-line"></i>
          <div>
            <h3 className="text-xl font-medium">Dream Homes</h3>
            <p className="-mt-1 text-sm text-gray-600">Wave City, Ghaziabad</p>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 rounded-xl pb-1">
          <i className=" text-xl ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-xl font-medium">₹ 193</h3>
            <p className="-mt-1 text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <button onClick={() => {
        props.setVehicleFound(true)
        props.setConfirmRidePanel(false)
      }} className="w-full bg-blue-400 text-white font-semibold p-2 rounded-xl">
        Confirm
      </button>
      <button onClick={() => {
        props.setConfirmRidePanel(false)
      }}
      className="w-full bg-red-400 text-white font-semibold p-2 rounded-xl mb-3">
        Cancel request
      </button>
    </div>
  );
};

export default ConfirmRide;
