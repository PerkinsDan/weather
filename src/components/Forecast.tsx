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
    <div className='mx-4 space-y-16 md:mx-auto md:w-3/4 md:border lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:min-h-[66%] p-12 flex flex-col justify-between'>
      <div className='flex flex-col lg:flex-row justify-between items-center gap-4'>
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
        <div className='flex justify-center items-center border border-gray-200 rounded pl-2 pr-4'>
          <img
            src={forecast?.current.condition.icon}
            alt={forecast?.current.condition.text}
          />
          <h1 className='w-min'>{forecast?.current.condition.text}</h1>
        </div>
      </div>
      <div className='flex flex-wrap justify-around gap-12'>
        <div className='flex flex-col items-center border border-gray-200 p-12 rounded-md w-72'>
          <h3 className='mb-8 font-bold'>Temperature</h3> 
          <label className='relative inline-flex items-center cursor-pointer mb-8'>
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
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
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
        <div className='flex flex-col items-center border border-gray-200 p-12 rounded-md w-72'> 
          <h3 className='mb-8 font-bold'>Wind</h3> 
          <label className='relative inline-flex items-center cursor-pointer mb-8'>
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
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
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
        <div className='flex flex-col items-center border border-gray-200 p-12 rounded-md w-72'>
          <h3 className='mb-8 font-bold'>Precipitation</h3> 
          <label className='relative inline-flex items-center cursor-pointer mb-8'>
            <span className='mr-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              mm 
            </span>
            <div className='relative'>
              <input
                type='checkbox'
                value=''
                onChange={() => setMeasurementType2(!measurementType2)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              inch
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
      <a href='#' className='flex mx-auto bg-gray-200 px-12 py-4 justify-between w-full lg:w-1/2 rounded'>
        <h3>Go to full forecast:</h3>
        <p className='text-blue-400'>{city}</p>
      </a>
    </div>
  );
};

export default Forecast;
