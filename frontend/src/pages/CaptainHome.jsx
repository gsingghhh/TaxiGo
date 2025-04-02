import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import CaptainDetails from "../components/CaptainDetails.jsx";
import RidePopup from "../components/RidePopup.jsx";
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import ConfirmRidePopup from "../components/ConfirmRidePopup.jsx";

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true) 
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false) 

  const ridePopupRef = useRef(null)
  const confirmRidePopupRef = useRef(null)

  useGSAP(() => {
    if(ridePopupPanel){
      gsap.to(ridePopupRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(ridePopupRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupRef.current,{
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className="h-screen">
      <div className="fixed pt-7 flex items-center justify-between w-full">
        <Logo />
        <Link
          to={"/captain-home"}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white mr-7"
        >
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="tempImage.png"
          alt=""
        />
      </div>
      <div className="h-2/5 px-4 pt-6">
        <CaptainDetails/>
      </div>
      <div ref={ridePopupRef} className="fixed bottom-0 w-full z-10 bg-white px-3 py-10 translate-y-full">
        <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePopupRef} className="fixed bottom-0 h-full w-full z-10 bg-white px-3 py-10 translate-y-full">
        <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;