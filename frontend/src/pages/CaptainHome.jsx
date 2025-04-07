import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import CaptainDetails from "../components/CaptainDetails.jsx";
import RidePopup from "../components/RidePopup.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopup from "../components/ConfirmRidePopup.jsx";
import { SocketDataContext } from "../context/SocketContext.jsx";
import { captainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";
import LiveTracking from "../components/LiveTracking.jsx";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(captainDataContext);

  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const timer = setTimeout(() => setShowMap(true), 100); // Delay map by 100ms
    return () => clearTimeout(timer);
  });

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopupRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="relative h-screen">
      <div className="fixed top-0 z-20 pt-7 flex items-center justify-between w-full">
        <Logo />
        <Link
          to={"/captain-home"}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white mr-7"
        >
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="fixed top-0 z-10 w-full">
        {showMap && <LiveTracking />}
      </div>
      <div className="fixed bg-white rounded-t-3xl shadow-2xl bottom-0 w-full h-2/5 px-4 z-30 pt-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupRef}
        className="fixed z-40 bottom-0 w-full bg-white px-3 py-10 translate-y-full"
      >
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed bottom-0 h-full w-full z-50 bg-white px-3 py-10 translate-y-full"
      >
        <ConfirmRidePopup
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
