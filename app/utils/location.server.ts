import { prisma } from "./prisma.server"
import { json } from "@remix-run/node"
import { Location } from "~/types/locations"


export const getMyLocations = async (userID: string) => {
    if (userID) {
        const locationById = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            include: {
                locations: { // Cambiado de 'location' a 'locations'
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

export const createLocation = async ({ place, postedBy }: Location) => { // Cambiado 'postedBy' a 'placeId'
    const locationById = await prisma.location.create({
        data: { place, postedBy }, // Cambiado 'postedBy' a 'placeId'
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
