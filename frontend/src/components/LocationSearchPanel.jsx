import axios from "axios";
import React from "react";

const LocationSearchPanel = (props) => {
  let locations = []

  if(props.activeInput === 'pickup'){
    locations = props.pickupSuggestions
  }else{
    locations = props.destinationSuggestions
  }

  const generateFare = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        },
        params: {
          origin: props.pickup,
          destination: props.destination
        }
      })
      props.setFare(response.data)
    } catch (error) {
      console.log({message: error.message})
    }
  }

  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div
          key={index}
            onClick={() => {
              if(props.activeInput === 'pickup'){
                props.setPickup(location)
              }
              else{
                props.setDestination(location)
                props.setVehiclePanelOpen(true);
                props.setPanelOpen(false);
                generateFare()
              }
            }}
            className="flex justify-start border-2 border-white active:border-black items-center bg-white rounded-lg my-3 font-medium px-3 py-2"
          >
            <h2 className="bg-slate-300 rounded-full px-2 py-1 mr-4">
              <i className="ri-map-pin-5-fill"></i>
            </h2>
            <h4 className="text-lg">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
