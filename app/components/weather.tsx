import React from 'react';

import * as imagesIcons from '../images/weatherIcons/WeatherIcons';
import { weatherCode } from './weatherCodes'; // Asegúrate de proporcionar la ruta correcta


const Weather = ({ weatherData }) => {
    const weatherCodeValue = weatherData?.data?.timelines[0]?.intervals[0]?.values?.weatherCode;
    const weatherDescription = weatherCode.weatherCode[weatherCodeValue] || "Unknown";

    const weatherIconAlphanumeric = weatherDescription.replace(/,/g, '');
    const weatherIconAux = weatherIconAlphanumeric.replace(/\s+/g, '_');



    // Accede al icono del clima utilizando el nuevo nombre
    const weatherIcon = imagesIcons[weatherIconAux];


    return (
        <div>
            {weatherData?.data?.timelines ? (

                <div className="w-[500px] bg-gradient-to-r bg-gradient-to-t from-gray-200/50 via-gray-400/50 to-gray-600/50 shadow-1g rounded-xl m-auto relative px-6 top-[10%]">
                    {/* <h1 className='text-2xl font-bold'>The weather today</h1> */}

                    <div className="flex justify-between w-full">
                        <div className="w-1/2 mx-auto flex justify-between 
                        items-center">

                            <div className="flex flex-col items-start justify-between">
                                <div>
                                    {/* <p className="text-xl">
                                        Location: {weatherData?.location?.name}

                                    </p> */}

                                    <p className="text-xl">
                                        {new Date(weatherData.data.timelines[0]?.intervals[0]?.startTime).toLocaleDateString('en-GB')}
                                    </p>
                                    <p className="text-sm">
                                        {weatherDescription}
                                    </p>

                                </div>
                                <div>
                                    <h1 className="text-6xl font semibold">
                                        {weatherData.data.timelines[0]?.intervals[0]?.values?.temperature} °C

                                    </h1>
                                </div>


                            </div>
                        </div>
                        <div className="w-1/2 items-end flex flex-col justify-between">
                            <div className="relative">
                                {weatherIcon && (
                                    <img
                                        src={weatherIcon}
                                        alt={"Weather Icon"}
                                        className="w-16 mt-2"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs">
                                <div className="flex jusify-between gap-x-8">
                                    <p>Wind: </p>
                                    <p className="font-bold w-20">
                                        {weatherData.data.timelines[0]?.intervals[0]?.values?.windSpeed} m/s
                                    </p>
                                </div>
                                <div className="flex justify-between gap-x-8">
                                    <p>Humidity: </p>
                                    <p className="font-bold w-20">
                                        {weatherData.data.timelines[0]?.intervals[0]?.values?.humidity} %
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Weather;







