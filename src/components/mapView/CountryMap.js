import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import React, { useEffect, useState } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";

const CountryMap = ({ latLong, countryName }) => {
  const icon = L.icon({ iconUrl: "/mapAssets/marker-icon.png" });

  const [zoom, setZoom] = useState(5);

  useEffect(() => {}, [zoom]);

  return (
    <MapContainer
      center={latLong}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        height: "100%",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
      />
      <Marker position={latLong} icon={icon}>
        <Popup>{countryName}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CountryMap;
