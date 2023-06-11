/*import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker
        position={position}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
        center={[19.1655, 73.0751]}
        zoom={13}
        scrollWheelZoom={true}
        className="mapcont"
      >
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        <Marker
          position={[19.1655, 73.0751]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default App;*/

import React from 'react';
import Main from './HomePage/Main.jsx';
import Page from './Pages/Page.jsx';
import "./App.css";
import { Route,Routes } from 'react-router-dom';

const App = () => {

  return (
    <>
       <Routes>
          <Route exact path="/" element={<Main/>}></Route>
          <Route exact path="/page" element={<Page/>}></Route>
       </Routes>
    </>
  )
}

export default App

//a460b454b9129c2fd1f2062658afd0bd
//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
