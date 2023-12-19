import type { MetaFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import { LoaderFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { getMyLocations, createLocation, deleteLocation } from "~/utils/location.server";

import { Form, useLoaderData } from "@remix-run/react";
import { Layout } from '~/components/layout';
import Navbar from '~/components/navbar';
import { useEffect, useState } from "react";
import axios from 'axios';
import Weather from '~/components/weather';
import WeatherCopy from '~/components/weather copy';
import WeatherDays from '~/components/weatherDays';
import { Locationlist, LocationListProps } from "~/components/locationlist";
import { Locationform } from "~/components/locationform";




export const handleKeyDown = (event, setData: any, setLocation: any, location: string) => {
    if (event.key === "Enter") {
        searchLocation(setData, setLocation, location);
    }
};


const options = {
    method: 'GET',
    headers: { accept: 'application/json' }
};

const apiKey = 'NLAtcSwXmFB230CkD5myal7mdqiI0ag5';

export const searchLocation = (setData: any, setLocation: any, location: string) => {
    const url = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,humidity,windSpeed,weatherCode&timesteps=1d&units=metric&apikey=${apiKey}`;

    axios.get(url, options)
        .then((response) => {
            setData(response.data);
            setLocation(""); // Corregir la ubicación dentro del bloque .then()

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
