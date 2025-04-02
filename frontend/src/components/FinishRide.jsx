import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
  return (
    <div className="flex justify-between h-full gap-3 flex-col">
    <h3 className="text-2xl font-semibold ml-5 mb-5">Finish ride?</h3>
    <div className="flex items-center justify-between p-3 bg-amber-200 rounded-lg">
      <div className="flex items-center gap-3">
        <img
          className="h-12 rounded-full object-cover w-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DY_UkwXIUk9kgA7CbqYlBmLzVRPqme7m1A&s"
          alt=""
        />
        <h2 className="text-lg font-medium">Kylie Jenner</h2>
      </div>
      <h5 className="text-lg font-semibold">2.2 KM</h5>
    </div>
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
    <div className="mt-6 flex flex-col">
        <Link
          to={"/captain-riding"}
          onClick={() => {
            props.setFinishRidePanel(false);
          }}
          className="w-full bg-blue-400 text-center text-white font-semibold p-2 rounded-xl mt-3 mb-3"
        >
          Complete Ride
        </Link>
    </div>
  </div>
  )
}

export default FinishRide