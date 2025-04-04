import React from "react";

const VehicleCard = (props) => {

  return (
    <div onClick={() => {
      props.setVehicleType(props.vehicleType)
      props.setVehicleImage(props.url)
      props.setVehiclePanelOpen(false)
      props.setConfirmRidePanel(true)
    }} className="flex items-center justify-between bg-white px-3 py-1 pb-2 pl-0 rounded-lg border-2 border-gray-200 active:border-black my-2">
      <div className="flex gap-2 items-center">
        <img className="w-18 h-12" src={props.url} alt="" />
        <div>
          <h4 className="font-medium text-lg ">
            {props.ride}{" "}
            <span className="text-sm text-gray-700">
              <i className="ri-user-fill"></i>
              {props.capacity}
            </span>
          </h4>
          <h5 className="font-medium ">{props.time} mins away</h5>
          <p className="font-medium text-sm text-gray-700 ">
            Affordable, compact rides
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold">₹{props.fare? props.fare : <span className="text-gray-500">  ...</span>}</h2>
    </div>
  );
};

export default VehicleCard;
