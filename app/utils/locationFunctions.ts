import axios from 'axios';



/**
 * Handles keydown event and triggers a search when the Enter key is pressed.
 *
 * @param {Event} event - The keydown event.
 * @param {Function} setData - The function to set the weather data.
 * @param {string} location - The location to search for.
 */
export const handleKeyDown = (event, setData: any, location: string) => {
    if (event.key === "Enter") {
        searchLocation(setData, location);
    }
};

/**
 * Options for the weather API request.
 */
const options = {
    method: 'GET',
    headers: { accept: 'application/json' }
};

const apiKey = 'NLAtcSwXmFB230CkD5myal7mdqiI0ag5';

/**
 * Searches for weather data based on the provided location.
 *
 * @param {Function} setData - The function to set the weather data.
 * @param {string} location - The location to search for.
 */
export const searchLocation = (setData: any, location: string) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,humidity,windSpeed,weatherCode&timesteps=1d&units=metric&apikey=${apiKey}`;

    axios.get(url, options)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error("Error al obtener los datos del clima:", error);
            setData("");
        });
};


/**
 * Fetches weather data based on the provided latitude and longitude.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {Function} setData - The function to set the weather data.
 */
export const fetchWeatherDataByLocation = async (latitude: number, longitude: number, setData: any) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,humidity,windSpeed,weatherCode&timesteps=current&units=metric&apikey=${apiKey}`;
    try {
        const response = await axios.get(url, options);
        setData(response.data);
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
    }
};
