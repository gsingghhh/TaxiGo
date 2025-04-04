import React from "react";

const RidePopup = (props) => {
  return (
    <div className="flex justify-between gap-3 flex-col">
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-amber-300 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DY_UkwXIUk9kgA7CbqYlBmLzVRPqme7m1A&s"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="w-full flex flex-col items-center gap-5 mb-5">
        <div className="flex w-full px-10 justify-start items-center gap-10 mt-3 border-b-1 pb-1">
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
        <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-1 mb-4">
          <i className=" text-xl ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-xl font-medium">₹ {props.ride?.fare}</h3>
            <p className="-mt-1 text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          props.confirmRide()
        }}
        className="w-full bg-green-500 text-white font-semibold p-2 rounded-xl"
      >
        Accept
      </button>
      <button
        onClick={() => {
            props.setRidePopupPanel(false)
        }}
        className="w-full bg-red-500 text-white font-semibold p-2 rounded-xl mb-3"
      >
        Ignore
      </button>
    </div>
  );
};

export default RidePopup;
