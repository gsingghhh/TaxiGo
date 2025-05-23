import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div className="flex gap-5 justify-between items-center flex-col">
      <div className="flex w-full items-center justify-between">
        <img
          className="w-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712278121/assets/e0/25905c-43bd-4797-91e6-29d0ae9cb48d/original/Taxi-%281%29-%286%29.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">{props.ride?.captain.fullName.firstName}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">{props.ride?.captain.vehicle.color}</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-5 mb-5">
          <div className="flex items-center px-3 py-1 rounded-lg bg-black gap-4 mb-2">
            <h3 className="text-lg text-white font-medium">OTP</h3>
            <h5 className="text-xl font-medium text-yellow-600">{props.ride?.otp}</h5>
          </div>
        <div className="flex w-full px-10 justify-start items-center gap-6 pl-12 pb-1">
          <i className="text-xl ri-user-location-line"></i>
          <div>
            <h3 className="text-xl font-medium">{props.ride?.origin}</h3>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-6 pl-12 pb-1">
          <i className="text-xl ri-map-pin-line"></i>
          <div>
            <h3 className="text-xl font-medium">{props.ride?.destination}</h3>
          </div>
        </div>
        <div className="flex w-full px-10 justify-start items-center gap-6 pl-12 -mt-2 pb-1">
          <i className=" text-xl ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-xl font-medium">₹ {props.ride?.fare}</h3>
            <p className="-mt-1 text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
