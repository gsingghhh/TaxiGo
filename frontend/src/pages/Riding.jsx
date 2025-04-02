import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to={'/home'} className="fixed flex top-2 right-2 items-center justify-center w-10 h-10 rounded-full bg-white"> 
        <i className="text-lg ri-home-line"></i>
        </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="tempImage.png"
          alt=""
        />
      </div>
      <div className="h-1/2 px-4 pt-2">
        <div className="flex w-full items-center justify-between">
          <img
            className="w-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712278121/assets/e0/25905c-43bd-4797-91e6-29d0ae9cb48d/original/Taxi-%281%29-%286%29.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Gyanendra</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">UP25 AB 1234</h4>
            <p className="text-sm text-gray-600">Lamborghini Aventador</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-5 mb-5">
          <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 rounded-xl pb-1">
            <i className="text-xl ri-map-pin-line"></i>
            <div>
              <h3 className="text-xl font-medium">Dream Homes</h3>
              <p className="-mt-1 text-sm text-gray-600">
                Wave City, Ghaziabad
              </p>
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
        <button className="w-full bg-green-400 text-white font-semibold p-2 rounded-xl mt-10">Pay before the ride ends</button>
      </div>
    </div>
  );
};

export default Riding;
