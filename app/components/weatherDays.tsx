import * as imagesIcons from '../images/weatherIcons/WeatherIcons';
import { weatherCode } from '../utils/weatherCodes'; // Asegúrate de proporcionar la ruta correcta


const WeatherDays = ({ weatherData }) => {
    const weatherCodeValue = weatherData?.data?.timelines[0]?.intervals[0]?.values?.weatherCode;

    if (weatherCodeValue === undefined) {
        return null;
    }

    //replace , and spaces to get the icons
    const weatherDescription = weatherCode.weatherCode[weatherCodeValue] || "Unknown";
    const weatherIconAlphanumeric = weatherDescription.replace(/,/g, '');
    const weatherIconAux = weatherIconAlphanumeric.replace(/\s+/g, '_');
    const weatherIcon = imagesIcons[weatherIconAux];


    return (

        <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold mt-4">
                Forecast of the next few days
            </h1>

            <div className="flex flex-wrap justify-center">
                {weatherData?.data?.timelines[0]?.intervals.slice(-5).map((interval, index) => (
                    <div key={index} className="m-4  bg-gradient-to-r bg-gradient-to-t from-gray-200/50 via-gray-400/50 to-gray-600/50 shadow-1g rounded-xl relative px-2">
                        <div className="flex justify-between w-full">
                            <div className="w-1/2 mx-auto flex justify-between items-center">
                                <div className="flex flex-col items-start justify-between">
                                    <div>
                                        <p className="text-l">
                                            {new Date(interval.startTime).toLocaleDateString('en-GB')}
                                        </p>
                                        <p className="text-sm">
                                            {weatherDescription}
                                        </p>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-semibold">
                                            {interval.values.temperature} °C
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 items-end flex flex-col justify-between">
                                <div className="relative">
                                    {weatherIcon && (
                                        <img
                                            src={weatherIcon}
                                            alt="Weather Icon"
                                            className="w-8 ml-2"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default WeatherDays;







