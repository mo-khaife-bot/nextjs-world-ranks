import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import React, { useEffect, useState } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";

const CountryMap = ({ latLong, countryName }) => {
  const icon = L.icon({ iconUrl: "/mapAssets/marker-icon.png" });

  const [zoom, setZoom] = useState(5);

  useEffect(() => {}, [zoom]);

  return (
    <MapContainer center={latLong} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLong} icon={icon}>
        <Popup>{countryName}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CountryMap;
