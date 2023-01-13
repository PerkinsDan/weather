import axios from 'axios';
import { useEffect, useState } from 'react';

type Forecast = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_mph: number;
    gust_kph: number;
  };
};

const Forecast = () => {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [city, setCity] = useState<string>('London');
  const [errStyle, setErrStyle] = useState<string>('');
  const [tempType, setTempType] = useState<boolean>(true);
  const [measurementType, setMeasurementType] = useState<boolean>(true);
  const [measurementType2, setMeasurementType2] = useState<boolean>(true);

  function getForecast() {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;

    axios
      .get(url)
      .then((response) => {
        setForecast(response.data);
        setErrStyle('');
      })
      .catch(() => {
        setErrStyle('outline outline-red-500');
      });
  }

  useEffect(() => {
    getForecast();
  }, [city]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const value = Object.fromEntries(formData.entries()).search;

    setCity(value.toString());
    getForecast();
  }

  return (
    <div className='w-3/4 border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3 p-12'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl'>{forecast?.location.name}</h1>
          <h2 className='font-bold'>{forecast?.location.country}</h2>
          <h3>{forecast?.location.localtime.split(' ')[1]}</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className='w-2/3'>
          <input
            type='search'
            name='search'
            defaultValue={city}
            className={`w-full border p-3 h-max rounded ${errStyle}`}
          />
        </form>
        <div className='flex justify-center items-center bg-gray-300 rounded pl-2 pr-4'>
          <img
            src={forecast?.current.condition.icon}
            alt={forecast?.current.condition.text}
          />
          <h1 className='w-min'>{forecast?.current.condition.text}</h1>
        </div>
      </div>
      <div className='flex justify-between my-16'>
        <div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <span className='mr-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Celsius
            </span>
            <div className='relative'>
              <input
                type='checkbox'
                value=''
                onChange={() => setTempType(!tempType)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Farenheit
            </span>
          </label>
          {tempType ? (
            <div>
              <p>
                <span className='font-bold'>Temp:</span>{' '}
                {forecast?.current.temp_c}°C
              </p>
              <p>
                <span className='font-bold'>Feels Like:</span>{' '}
                {forecast?.current.feelslike_c}°C
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span className='font-bold'>Temp:</span>{' '}
                {forecast?.current.temp_f}°F
              </p>
              <p>
                <span className='font-bold'>Feels Like:</span>{' '}
                {forecast?.current.feelslike_f}°F
              </p>
            </div>
          )}
        </div>
        <div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <span className='mr-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Kilometers
            </span>
            <div className='relative'>
              <input
                type='checkbox'
                value=''
                onChange={() => setMeasurementType(!measurementType)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Miles
            </span>
          </label>
          {measurementType ? (
            <div>
              <p>
                <span className='font-bold'>Wind Speed:</span>{' '}
                {forecast?.current.wind_kph} kph
              </p>
              <p>
                <span className='font-bold'>Gust Speed:</span>{' '}
                {forecast?.current.gust_kph} kph
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span className='font-bold'>Wind Speed:</span>{' '}
                {forecast?.current.wind_mph} mph
              </p>
              <p>
                <span className='font-bold'>Gust Speed:</span>{' '}
                {forecast?.current.gust_mph} mph
              </p>
            </div>
          )}
        </div>
        <div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <span className='mr-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Metric
            </span>
            <div className='relative'>
              <input
                type='checkbox'
                value=''
                onChange={() => setMeasurementType2(!measurementType2)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Imperial
            </span>
          </label>
          {measurementType2 ? (
            <div>
              <p>
                <span className='font-bold'>Rain:</span>{' '}
                {forecast?.current.precip_mm} mm
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span className='font-bold'>Rain:</span>{' '}
                {forecast?.current.precip_in} inches
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
