import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Forecast = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  forecast: {
    forecastday: [
      {
        hour: [
          {
            maxtemp_c: number;
            mintemp_c: number;
            avgtemp_c: number;
            maxwind_kph: number;
            totalprecip_mm: number;
            avgvis_km: number;
            avghumidity: number;
            condition: {
              text: string;
              icon: string;
            };
            uv: number;
          }
        ];
        astro: {
          sunrise: string;
          sunset: string;
          moonphase: string;
        };
      }
    ];
  };
};

const City = () => {
  let { city } = useParams();
  const [forecast, setForecast] = useState<Forecast | null>(null);

  useEffect(() => {
    function getForecast() {
      const key = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&aqi=no&alerts=no`;

      axios
        .get(url)
        .then((response) => {
          setForecast(response.data);
        })
        .catch(console.error);
    }

    getForecast();
  }, []);

  console.log(forecast);

  const forecastItems = forecast?.forecast.forecastday[0].hour.map(
    (day: any) => (
      <>
        <div>
          <p className="">{day.temp_c}</p>
          <p className="">{day.mintemp_c}</p>
        </div>
      </>
    )
  );

  return (
    <div className="mx-4 space-y-16 md:mx-auto md:w-3/4 md:border lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:min-h-[66%] p-12 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <a href="/" className="px-12 py-4 border border-gray-200 rounded">
          <p>{"<"} Go back</p>
        </a>
        <div>
          <h1 className="text-3xl">{forecast?.location.name}</h1>
          <h2 className="font-bold">{forecast?.location.country}</h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        {forecastItems}
      </div>
    </div>
  );
};

export default City;
