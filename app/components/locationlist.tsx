import { Form } from "@remix-run/react";
import trash from "~/images/icons/trash.png";
import eye from "~/images/icons/eye.png";
import { searchLocation } from "~/utils/locationFunctions";
import Modal from "./modal";
import { useState } from "react";
//import tailwind from "~/styles/tailwind.css";

export interface LocationListProps {
    place: any;
    id: string;
    setData: object;
    setActive429: object;
}

export function LocationList({ place, id, setData, setActive429 }: LocationListProps) {
    const [open, setOpen] = useState(false)
    return (
        <><div className="flex items-center justify-between relative">
            <div className="flex items-center">
                <p className="text-md mr-2">{place}</p>
                {/* <Form method="post" className="flex items-center"> */}
                <button
                    className="button flex items-center justify-center mr-2"
                    name="action"
                    type="submit"
                    value="delete"
                    onClick={() => setOpen(true)}
                >
                    <img src={trash} alt="Delete" className="w-4 h-4" />
                </button>
                <input type="hidden" name="id" value={id} />
                {/* </Form> */}
                <button
                    className="button flex items-center justify-center"
                    onClick={() => {
                        searchLocation(setData, place, setActive429);
                    }}
                >
                    <img src={eye} alt="eye" className="w-4 h-4" />
                </button>
            </div>
        </div>


            <div className="z-50">
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="text-center w-56">

                        <div className="mx-auto my-4 w-48">
                            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                            <p className="text-sm text-gray-500">
                                Are you sure you want to delete this location?
                            </p>
                        </div>
                        <div className="flex justify-center gap-4">

                            <button
                                className="btn btn-light"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <Form method="post">
                                <button
                                    className="btn btn-danger"
                                    name="action"
                                    type="submit"
                                    value="delete"
                                >
                                    Delete
                                </button>
                                <input type="hidden" name="id" value={id} />
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div></>
    );
}
