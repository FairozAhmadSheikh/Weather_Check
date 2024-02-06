"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({});
  const [location, setlocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=34f571b67dd215c8558d75dca370ec75`;
  const backgroundImageUrl = "https://cdn.downtoearth.org.in/library/large/2022-10-19/0.32197700_1666181610_earth.jpg";
  // Gets Data From Url Above:
  const Search = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
      });
  };

  // Input Functionality Handle
  const Handleinput = (e) => {
    setlocation(e.target.value);
  };

  // Returns Html or JSX
  return (

    
    <div className="flex justify-center items-center h-screen  text-white "
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw"
    }}
    >
      <div className="bg-black bg-opacity-90 rounded-3xl text-lg">
        <input
          type="text"
          placeholder="Enter City Here"
          onChange={Handleinput}
          className="bg-slate-300 text-black-500 m-4 p-2 rounded-lg text-black text-2xl"
          value={location}
        />
        <button className="bg-slate-200 text-black text-xl rounded-lg m-4 p-2" onClick={Search}>
          Get Weather
        </button>

        {data && (
          <>
            <h3 className="ml-4 p-1 text-3xl">{data.name}</h3>
            <h2 className="ml-4 p-1 text-2xl">Receiving from {data.base}</h2>
            {/* Check if wind object exists before accessing its properties */}
            {data.wind && (
              <h2 className="ml-4 p-1 text-2xl">
                Wind Speed : {data.wind.speed} KMPH
              </h2>
            )}
            {data.main && (
              <h2 className="ml-4 p-1 text-2xl">
                Temperature: {data.main.temp} °F
              </h2>
            )}

            {data.weather && data.weather[0] && (
              <div className="ml-4 flex items-center">
                <h1 className="text-2xl capitalize">
                  {data.weather[0].description}
                </h1>
                <img
                  className="ml-"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt={data.weather[0].description}
                />
              </div>
            )}
            {data.sys && (
              <h2 className="flex p-1 ml-4">
                Country :{" "}
                <p className="ml-2 text-green-500">{data.sys.country}</p>{" "}
              </h2>
            )}
          </>
        )}
        <div className=" m-4  text-white rounded-md text-xl p-1">
        <p>© Developed by<a className="bg-slate-100 m-2 rounded-lg p-1 text-black" href="https:www.github.com/FairozAhmadSheikh" target="_blank"> Fairoz Ahmad Sheikh</a></p>
      </div>
      </div>
      
    </div>
  );
}
