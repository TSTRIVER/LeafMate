import React, { useEffect, useState } from "react";
import axios from "axios";
import "./page.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const Page = () => {
  let [obtData, setObtData] = useState([]);
  let [weatherCoords, setWeatherCoords] = useState([]);
  let [actWeather,setActWeather] = useState([]);
  let [active,setActive] = useState(1);

  const sendData = async (pageNo) => {
    let arr = JSON.parse(localStorage.getItem("arr"));
    setActive(pageNo);
    if(weatherCoords.length !== 0){
      setWeatherCoords([]);
      setActWeather([]);
    }
    try {
      const { data } = await axios.post(`/getData/${pageNo}`, { arr });
      setObtData(data.res_arr);
    } catch (error) {
      return error;
    }
  };

  useEffect(()=>{
     sendData(1);  
  },[])

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (obtData && obtData.length > 0) {
        try {
          for (const item of obtData) {
            const weatherData = await axios.get(
              ` https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=a460b454b9129c2fd1f2062658afd0bd`
            );
           setWeatherCoords((prevResults) => [
              ...prevResults,
              weatherData.data.coord,
            ]);
            setActWeather((prev)=>[
               ...prev,
               {
                temp: weatherData.data.main.temp,
                name: weatherData.data.name
               },
            ]);
            console.log(actWeather);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [obtData]); 

  return (
    <>
      <div id="main-cont">
        <div id="map-container">
          <MapContainer
            center={[19.1655, 73.0751]}
            zoom={5}
            scrollWheelZoom={true}
            className="mapcont"
          >
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            {weatherCoords.map((ele,ind)=>(
                  <Marker
                  position={[ele.lat,ele.lon]}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>
                    City:- {actWeather[ind].name} <br/>
                    Temperature :- {(actWeather[ind].temp-273).toFixed(2)}°C
                  </Popup>
                </Marker>
            ))}
          </MapContainer>
        </div>
        <div id="paginate-cont">
        
          <button className={active === 1 ? "pag-btn extra" : "pag-btn"} onClick={()=>{
            sendData(1);
          }}>1</button>
          <button className={active === 2 ? "pag-btn extra" : "pag-btn"} onClick={()=>{
            sendData(2);
          }}>2</button>
          <button className={active === 3 ? "pag-btn extra" : "pag-btn"} onClick={()=>{
            sendData(3);
          }}>3</button>
        </div>    
      </div>
    </>
  );
};

export default Page;
