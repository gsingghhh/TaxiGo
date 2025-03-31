import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "Dream homes, Wave City, Ghaziabad",
    "Executive floors, Wave City, Ghaziabad",
    "Veredia, Wave City, Ghaziabad",
  ];

  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div
          key={index}
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
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
