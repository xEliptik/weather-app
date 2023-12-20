import { authenticator } from "~/utils/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import { Layout } from '~/components/layout';
import Navbar from '~/components/navbar';
import { useEffect, useState } from "react";
import axios from 'axios';
import Weather from '~/components/weather';
import WeatherCopy from '~/components/weather copy';
import WeatherDays from '~/components/weatherDays';
import { getMyLocations, createLocation, deleteLocation, findLocationByPlaceAndUser } from "~/utils/location.server";
import { LocationList, LocationListProps } from "~/components/locationlist";
import { Locationform } from "~/components/locationform";
import { MetaFunction, LoaderFunction, ActionFunction } from '@remix-run/node';
import { handleKeyDown, searchLocation, fetchWeatherDataByLocation } from "~/utils/locationFunctions";
/**
 * Loads user data and user locations based on the authentication status.
 *
 * @param {Object} options - Options for the loader function.
 * @param {Object} options.request - The Remix request object.
 * @returns {Promise<Object>} - A promise that resolves to an object containing user and userLocation data.
 * @throws {Error} - Throws an error if authentication fails.
 */
export const loader: LoaderFunction = async ({ request }) => {

  // Authenticate user and redirect to login page on failure
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  // Retrieve user locations based on user ID
  const userLocation = await getMyLocations(user.id);
  // Return user and userLocation data
  return { user, userLocation };

};

/**
 * Handles a specific set of actions based on the form data.
 *
 * @param {Object} options - Options for the action function.
 * @param {Object} options.request - The Remix request object.
 * @returns {Promise<unknown|null>} - A promise that resolves to the result of the action.
 */
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("action");
  const place = form.get("place");
  const data = form.get("data"); // No need to parse data as it's already a string or null

  switch (action) {

    case "logout": {
      return await authenticator.logout(request, { redirectTo: "/login" })

    }
    case "new": {
      const user = await authenticator.isAuthenticated(request);
      const existingLocation = await findLocationByPlaceAndUser(place, user.id);

      if (!place) {
        return null;
      }

      if (existingLocation) {
        console.log("Location already exists for this user:", place);
        return null;
      }

      // Create a new location
      const newLocation = await createLocation({
        place: place as string,
        postedBy: {
          connect: {
            id: user.id,
          },
        },
      });

      return newLocation;
    }
    case "delete": {
      // Delete location by ID
      const id = form.get("id");
      const deletedTask = await deleteLocation(id);
      return deletedTask;
    }
    default:
      return null;
  }

};





export default function Index() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");


  /**
   * Fetches weather data and sets the location based on the user's geolocation.
   *
   * @param {Function} setData - The function to set the weather data.
   * @param {Function} setLocation - The function to set the location.
   */
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude });
  //         fetchWeatherDataByLocation(latitude, longitude, setData, setLocation);
  //       },
  //       (error) => {
  //         console.error("Error al obtener la ubicación:", error);
  //       }
  //     );
  //   }
  // }, []);


  const { user, userLocation } = useLoaderData<typeof loader>()
  return (
    <Layout>
      <div className="w-full h-full relative">
        {/* <Weather weatherData={data} /> */}
        <div className="flex justify-center mb-4">
          <p className="text-2xl font-bold">Here's the weather forecast for your current location</p>
        </div>


        {/* <Weather weatherData={data} /> */}
        <WeatherCopy />

        <Form method="post">
          <div className="text-center p-4">
            <div className="flex justify-center mt-4">
              <p className="text-2xl font-bold">Enter a location to see the weather forecast</p>
            </div>

            <input
              type="text"
              className="py-3 px-6 w-[500px] text-lg rounded-3xl border
    border-gray-200 text-gray-600
    placeholder: text-gray-400 focus:outline-none
    bg-white-600/100 shadow-md mt-4"
              placeholder="Enter location"
              onChange={(event) => setLocation(event.target.value)}
              onKeyDownCapture={handleKeyDown(setData, location)}
              name="place"
              id="place"
            />
            <input type="hidden" name="data" value={JSON.stringify(data)} />
            <button
              className="inline-flex text-white bg-gradient-to-r from-indigo-300 to-purple-400 border-1 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-4"
              onClick={() => {
                searchLocation(setData, location);
              }}
              type="submit"
              name="action"
              value="new"
            >
              Search
            </button>


          </div>

          <Weather weatherData={data} />
        </Form>

        <WeatherDays weatherData={data} />
        <div className="flex justify-center items-center">
          <div className="bg-gradient-to-r from-gray-200/50 via-gray-400/50 to-gray-600/50 p-8 rounded-md">
            <h1 className="text-xl font-bold mb-4">Location History</h1>
            <hr className="border-t border-black-300 my-4 w-full" />
            <div className="grid gap-3 justify-center">
              {userLocation.locations.length ? (
                <>
                  {userLocation.locations.map((location: LocationListProps) => (
                    <LocationList key={location.id} id={location.id} place={location.place} setData={setData} />
                  ))}
                </>
              ) : (
                <p className="text-black-600">No locations in history</p>
              )}
            </div>
          </div>
        </div>

        <br />




      </div>



    </Layout>
  );
}

{/* <Weather weatherData={data} /> */ }
{/* <WeatherCopy /> */ }


