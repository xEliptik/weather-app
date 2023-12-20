import axios from 'axios';




export const handleKeyDown = (event, setData: any, location: string) => {
    if (event.key === "Enter") {
        searchLocation(setData, location);
    }
};


const options = {
    method: 'GET',
    headers: { accept: 'application/json' }
};

const apiKey = 'NLAtcSwXmFB230CkD5myal7mdqiI0ag5';

export const searchLocation = (setData: any, location: string) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,humidity,windSpeed,weatherCode&timesteps=1d&units=metric&apikey=${apiKey}`;

    axios.get(url, options)
        .then((response) => {
            setData(response.data);
            // setLocation(""); // Actualizar la ubicación solo después de procesar la respuesta
        })
        .catch((error) => {
            console.error("Error al obtener los datos del clima:", error);
            setData("");
        });
};



export const fetchWeatherDataByLocation = async (latitude: number, longitude: number, setData: any, setLocation: any) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,humidity,windSpeed,weatherCode&timesteps=current&units=metric&apikey=${apiKey}`;
    try {
        const response = await axios.get(url, options);
        setData(response.data);
        setLocation("");
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
    }
};
