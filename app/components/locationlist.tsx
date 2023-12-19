import { Form } from "@remix-run/react";
import trash from "~/images/icons/trash.png";
import eye from "~/images/icons/eye.png";
import { searchLocation } from "~/utils/locationFunctions";


export interface LocationListProps {
    place: any
    id: string
    setData: object
    setLocation: object
}

export function Locationlist({ place, id, setData, setLocation }: LocationListProps) {
    return (
        <div className="flex items-center justify-between relative">
            <div className="flex items-center">
                <p className="text-md mr-2">{place}</p>
                <Form method="post" className="flex items-center">
                    <button
                        className="button flex items-center justify-center mr-2"
                        name="action"
                        type="submit"
                        value="delete"
                    >
                        <img src={trash} alt="Delete" className="w-4 h-4" />
                    </button>
                </Form>
                <button
                    className="button flex items-center justify-center"
                    onClick={() => {

                        searchLocation(setData, setLocation, place);
                    }}
                >
                    <img src={eye} alt="eye" className="w-4 h-4" />
                </button>
                <input type="hidden" name="id" value={id} />

            </div>
        </div>
    );
}
