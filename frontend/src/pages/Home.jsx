import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../components/Logo.jsx";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";
import { SocketDataContext } from "../context/SocketContext.jsx";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking.jsx";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const textRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const closePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (!socket || !user?._id) return;
  
    socket.emit("join", { userType: "user", userId: user._id });
  
    const handleRideConfirmed = (ride) => {
      setVehicleFound(false);
      setWaitingForDriverPanel(true);
      setRide(ride);
    };
  
    const handleRideStarted = (ride) => {
      setWaitingForDriverPanel(false);
      navigate("/riding", { state: { ride } });
    };
  
    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-started", handleRideStarted);
  
    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
      socket.off("ride-started", handleRideStarted);
    };
  }, [socket, user, navigate]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      console.log("error fetching suggestions", error.message);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.log('Error', err.message)
    }
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(textRef.current, {
        fontSize: "0",
      });
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(closePanelRef.current, {
        fontSize: "20px",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0",
      });
      gsap.to(textRef.current, {
        fontSize: "30px",
      });
      gsap.to(closePanelRef.current, {
        fontSize: "0",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanel]);

  return (
    <>
      <div className="relative h-screen w-full">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <LiveTracking/>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end z-0">
        <div className="fixed mt-7 translate-y-0 top-0 z-20">
          <Logo />
        </div>
          <div className=" p-4 h-[30%] rounded-t-3xl  bg-white w-full z-1">
            <h1
              onClick={() => {
                setPanelOpen(false);
              }}
              ref={closePanelRef}
              className="text-center text-[0px]"
            >
              <i className="ri-arrow-down-wide-fill"></i>
            </h1>
            <h1 ref={textRef} className="text-3xl font-semibold">
              Book a ride
            </h1>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="origin"
                id=""
                placeholder="Add pickup location"
                className="w-full my-5 bg-slate-200 rounded-lg text-lg px-8 py-2"
                onChange={(e) => {
                  handlePickupChange(e);
                }}
                value={pickup}
                onClick={() => {
                  setPanelOpen(true);
                }}
                onSelect={() => {
                  setActiveInput("pickup");
                }}
              />
              <input
                type="text"
                name="destination"
                id=""
                placeholder="Add drop location"
                className="w-full bg-slate-200 rounded-lg text-lg px-8 py-2"
                onChange={(e) => {
                  handleDestinationChange(e);
                }}
                value={destination}
                onClick={() => {
                  setPanelOpen(true);
                }}
                onSelect={() => {
                  setActiveInput("destination");
                }}
              />
            </form>
          </div>
          <div
            ref={panelRef}
            className="h-[0] px-2 overflow-hidden bg-white transition-all z-30"
          >
            <LocationSearchPanel
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPanelOpen={setPanelOpen}
              pickupSuggestions={pickupSuggestions}
              destinationSuggestions={destinationSuggestions}
              activeInput={activeInput}
              setPickup={setPickup}
              setDestination={setDestination}
              pickup={pickup}
              destination={destination}
              setFare={setFare}
            />
          </div>
          <div
            ref={vehiclePanelRef}
            className="fixed bottom-0 translate-y-full bg-white rounded-t-3xl z-30 w-full p-4"
          >
            <h5
              onClick={() => {
                setVehiclePanelOpen(false);
              }}
              className="text-xl text-center mb-3"
            >
              <i className="ri-arrow-down-wide-fill"></i>
            </h5>
            <h1 className="text-2xl font-semibold mb-4">Choose a vehicle</h1>
            <VehicleCard
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
              ride={"TaxiGo"}
              capacity={4}
              time={3}
              url={
                "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712278121/assets/e0/25905c-43bd-4797-91e6-29d0ae9cb48d/original/Taxi-%281%29-%286%29.png"
              }
              fare={fare["car"]}
              vehicleType={"car"}
              setVehicleType={setVehicleType}
              setVehicleImage={setVehicleImage}
            />
            <VehicleCard
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
              ride={"Motorbike"}
              capacity={1}
              time={2}
              url={
                "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              }
              fare={fare["bike"]}
              vehicleType={"bike"}
              setVehicleType={setVehicleType}
              setVehicleImage={setVehicleImage}
            />
            <VehicleCard
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
              ride={"Auto"}
              capacity={3}
              time={5}
              url={
                "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              }
              fare={fare["auto"]}
              vehicleType={"auto"}
              setVehicleType={setVehicleType}
              setVehicleImage={setVehicleImage}
            />
          </div>
          <div
            ref={confirmRideRef}
            className="fixed bottom-0 translate-y-full bg-white rounded-t-3xl z-20 w-full p-4"
          >
            <h1 className=" text-center mt-3 text-2xl font-semibold mb-4">
              Confirm Ride
            </h1>
            <ConfirmRide
              setVehicleFound={setVehicleFound}
              setConfirmRidePanel={setConfirmRidePanel}
              vehicleType={vehicleType}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleImage={vehicleImage}
            />
          </div>
          <div
            ref={vehicleFoundRef}
            className="fixed bottom-0 translate-y-full bg-white rounded-t-3xl z-10 w-full p-4"
          >
            <h5
              onClick={() => {
                setVehicleFound(false);
              }}
              className="text-xl text-center mb-3"
            >
              <i className="ri-arrow-down-wide-fill"></i>
            </h5>
            <h1 className=" text-center mt-3 text-2xl font-semibold mb-4">
              Looking for Captain
            </h1>
            <LookingForDriver
              setVehicleFound={setVehicleFound}
              vehicleType={vehicleType}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleImage={vehicleImage}
            />
          </div>
          <div
            ref={waitingForDriverRef}
            className="fixed bottom-0 translate-y-full bg-white rounded-t-3xl z-10 w-full p-4"
          >
            <h5
              onClick={() => {
                setWaitingForDriverPanel(false);
              }}
              className="text-xl text-center mb-3"
            >
              <i className="ri-arrow-down-wide-fill"></i>
            </h5>
            <h1 className=" text-center mt-3 text-2xl font-semibold mb-4">
              Waiting for Captain
            </h1>
            <WaitingForDriver ride={ride} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
