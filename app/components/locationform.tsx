import { Form } from "@remix-run/react";
import { Location } from "~/types/locations";
export function Locationform() {
    return (
        <>
            <Form method="post">

                <div className="mb-5">
                    <label className="font-semibold mb-2 block" htmlFor="location">
                        Task
                    </label>
                    <textarea
                        name="place"
                        id="place"
                        className="w-full border-2 rounded-md mr-8 border-gray-600 px-3 py-1"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        name="action"
                        value="new" className="w-full rounded-xl bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600" >
                        Add task
                    </button>
                </div>
            </Form>
        </>
    )
}