import { prisma } from "./prisma.server"
import { json } from "@remix-run/node"
import { Location } from "~/types/locations"

/**
 * Retrieves locations associated with a user.
 *
 * @param {string} userID - The ID of the user.
 * @returns {Promise} A promise that resolves to the user's locations or an error message.
 */
export const getMyLocations = async (userID: string) => {
    if (userID) {
        const locationById = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            include: {
                locations: { 
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        return locationById;
    }

    if (!userID) {
        return json({ error: `The users doesnot have any locations` });
    }
};

/**
 * Creates a new location entry.
 *
 * @param {object} location - The location information.
 * @param {string} location.place - The name of the place.
 * @param {object} location.postedBy - The user who posted the location.
 * @returns {Promise} A promise that resolves to the created location or an error message.
 */
export const createLocation = async ({ place, postedBy }: Location) => { 
    const locationById = await prisma.location.create({
        data: { place, postedBy }, 
    });
    if (!locationById) {
        return json({ error: 'Could not post the location' })
    }
    return json({
        message: "Location created successfully",
        success: "true",
        payload: locationById,
    })
}

/**
 * Deletes a location entry by ID.
 *
 * @param {any} id - The ID of the location to be deleted.
 * @returns {Promise} A promise that resolves to the deleted location ID or an error message.
 */
export const deleteLocation = async (id: any) => {
    const locationById = await prisma.location.delete({ where: { id } });
    if (!locationById) {
        return json({ error: 'Could not delete the location' })
    }
    return json({
        message: "Location deleted",
        success: "true",
        payload: id,
    })
}


/**
 * Finds a location by place and user ID.
 *
 * @param {string} place - The name of the place.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} A promise that resolves to the found location or null.
 */
export const findLocationByPlaceAndUser = async (place: string, userId: string) => {
    const location = await prisma.location.findFirst({
        where: {
            place: place,
            postedBy: {
                id: userId,
            },
        },
    });
    return location;
};
