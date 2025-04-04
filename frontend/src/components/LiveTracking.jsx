import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error('Error getting position:', err);
      },
      { enableHighAccuracy: true }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error('Error watching position:', err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords
            setPosition({
                lat: latitude,
                lng: longitude
            })
        })
    }
  
    updatePosition()

    const intervalId = setInterval(updatePosition, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  

  if (!position) return <div>Fetching location...</div>;

  return (
    <MapContainer center={position} zoom={15} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={`https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?&apiKey=${import.meta.env.VITE_MAPS_API}`}
        attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
      />
      <RecenterMap lat={position.lat} lng={position.lng} />
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveTracking;
