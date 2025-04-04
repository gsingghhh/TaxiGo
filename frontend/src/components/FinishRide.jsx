import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const FinishRide = (props) => {

  const navigate = useNavigate()

  const endRide = async () => {

    console.log(props.ride?._id)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {rideId: props.ride?._id}, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status === 200){
      props.setFinishRidePanel(false)
      navigate('/captain-home')
    }
  }

  return (
    <div className="flex justify-between h-full gap-3 flex-col">
    <h3 className="text-2xl font-semibold ml-5 mb-5">Finish ride?</h3>
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
      <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-3">
        <i className="text-xl ri-user-location-line"></i>
        <div>
          <h3 className="text-xl font-medium">{props.ride?.origin}</h3>
        </div>
      </div>
      <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-3">
        <i className="text-xl ri-map-pin-line"></i>
        <div>
          <h3 className="text-xl font-medium">{props.ride?.destination}</h3>
        </div>
      </div>
      <div className="flex w-full px-10 justify-start items-center gap-10 border-b-1 pb-1">
        <i className=" text-xl ri-money-rupee-circle-line"></i>
        <div>
          <h3 className="text-xl font-medium">₹ {props.ride?.fare}</h3>
          <p className="-mt-1 text-sm text-gray-600">Cash</p>
        </div>
      </div>
    </div>
    <div className="mt-6 flex flex-col">
        <button
          onClick={() => {
            endRide()
          }}
          className="w-full bg-blue-500 text-center text-white font-semibold p-2 rounded-xl mt-3 mb-3"
        >
          Complete Ride
        </button>
    </div>
  </div>
  )
}

export default FinishRide