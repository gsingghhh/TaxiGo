import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SocketDataContext } from "../context/SocketContext.jsx";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking.jsx";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketDataContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="relative h-screen">
      <Link
        to={"/home"}
        className="fixed z-20 flex top-2 right-2 items-center justify-center w-10 h-10 rounded-full bg-white"
      >
        <i className="text-lg ri-home-line"></i>
      </Link>
      <div className="fixed top-0 left-0 right-0 z-10 h-1/2">
        <LiveTracking/>
      </div>
      <div className="fixed w-full py-6 pt-10 rounded-t-3xl shadow-lg bottom-0 bg-white z-30 px-4">
        <div className="flex w-full items-center justify-between">
          <img
            className="w-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712278121/assets/e0/25905c-43bd-4797-91e6-29d0ae9cb48d/original/Taxi-%281%29-%286%29.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride.captain?.fullName.firstName}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride.captain?.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {ride.captain?.vehicle.color}
            </p>
          </div>
        </div>
        <div className="w-full flex mt-5 flex-col items-center gap-5 mb-5">
          <div className="flex w-full px-10 justify-start items-center gap-6 pb-1">
            <i className="text-xl ri-map-pin-line"></i>
            <div>
              <h3 className="text-xl font-medium">{ride.destination}</h3>
            </div>
          </div>
          <div className="flex w-full px-10 justify-start items-center gap-6 pb-1">
            <i className=" text-xl ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-xl font-medium">₹ {ride.fare}</h3>
              <p className="-mt-1 text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-500 text-white font-semibold p-2 rounded-xl mt-10">
          Pay before the ride ends
        </button>
      </div>
    </div>
  );
};

export default Riding;
