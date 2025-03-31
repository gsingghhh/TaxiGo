import React, { useRef, useState } from "react";
import Logo from "../components/Logo.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDriver from "../components/WaitingForDriver.jsx";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const textRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const closePanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)

  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div>
        <div className="mt-7 absolute">
          <Logo />
        </div>
        <img
          onClick={() => setVehiclePanelOpen(false)}
          className="h-screen w-screen"
          src="tempImage.png"
          alt=""
        />
        <div className="h-screen flex flex-col justify-end absolute bottom-0">
          <div className=" p-4 h-[30%] rounded-t-3xl  bg-white w-full">
            <h1
              onClick={() => {
                setPanelOpen(false);
              }}
              ref={closePanelRef}
              className="text-[0px]"
            >
              <i className="ri-arrow-down-wide-fill"></i>
            </h1>
            <h1 ref={textRef} className="text-3xl font-semibold">
              Book a ride
            </h1>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Add pickup location"
                className="w-full my-5 bg-slate-200 rounded-lg text-lg px-8 py-2"
                onChange={(e) => {
                  setPickup(e.target.value);
                }}
                value={pickup}
                onClick={() => {
                  setPanelOpen(true);
                }}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Add drop location"
                className="w-full bg-slate-200 rounded-lg text-lg px-8 py-2"
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                value={destination}
                onClick={() => {
                  setPanelOpen(true);
                }}
              />
            </form>
          </div>
          <div
            ref={panelRef}
            className="h-[0] px-2 overflow-hidden bg-white transition-all"
          >
            <LocationSearchPanel
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPanelOpen={setPanelOpen}
            />
          </div>
          <div
            ref={vehiclePanelRef}
            className="fixed translate-y-full bg-white rounded-t-3xl z-10 w-full p-4"
          >
            <h1 className="text-2xl font-semibold mb-4">Choose a vehicle</h1>
            <VehicleCard
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
              ride={"TaxiGo"}
              price={180.54}
              capacity={4}
              time={3}
              url={
                "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712278121/assets/e0/25905c-43bd-4797-91e6-29d0ae9cb48d/original/Taxi-%281%29-%286%29.png"
              }
            />
            <VehicleCard
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
              ride={"Motorbike"}
              price={77}
              capacity={1}
              time={2}
              url={
                "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              }
            />
            <VehicleCard
              setConfirmRidePanel={setConfirmRidePanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
              ride={"Auto"}
              price={150}
              capacity={3}
              time={5}
              url={
                "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              }
            />
          </div>
          <div
            ref={confirmRideRef}
            className="fixed translate-y-full bg-white rounded-t-3xl z-10 w-full p-4"
          >
            <h1 className=" text-center mt-3 text-2xl font-semibold mb-4">
              Confirm Ride
            </h1>
            <ConfirmRide setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
          </div>
          <div
            ref={vehicleFoundRef}
            className="fixed translate-y-full bg-white rounded-t-3xl z-10 w-full p-4"
          >
            <h1 className=" text-center mt-3 text-2xl font-semibold mb-4">
              Looking for Captain
            </h1>
            <LookingForDriver setVehicleFound={setVehicleFound} />
          </div>
          <div
          ref={waitingForDriverRef}
            className="fixed translate-y-full bg-white rounded-t-3xl z-10 w-full p-4"
          >
            <h1 className=" text-center mt-3 text-2xl font-semibold mb-4">
              Waiting for Captain
            </h1>
            <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
