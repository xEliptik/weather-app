import React, { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { useActionData, Link, useNavigate } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { Layout } from '~/components/layout';
import { Textfield } from '~/components/textfield';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


/**
 * Loads user data based on authentication status and redirects on success.
 *
 * @param {Object} options - Options for the loader function.
 * @param {Object} options.request - The Remix request object.
 * @returns {Promise<Object>} - A promise that resolves to the authenticated user data.
 * @throws {Error} - Throws an error if authentication fails.
 */
export const loader: LoaderFunction = async ({ request }) => {
    try {
        // Authenticate user and redirect to home page on success
        const user = await authenticator.isAuthenticated(request, {
            successRedirect: "/",
        });
        return user;
    } catch (error) {
        // Handle authentication errors by redirecting to login page

        throw new Error("Authentication failed");
    }
};



export const action: ActionFunction = async ({ request }) => {
    try {
        // Authenticate user using form data and redirect to home page on success
        return await authenticator.authenticate("form", request, {


            successRedirect: "/",
        });
    } catch (error) {
        // Handle authentication errors by redirecting to login page
        return { redirect: '/login' };
    }
};


/**
 * React component representing a Google Login button.
 *
 * @returns {JSX.Element} - The JSX element for the Google Login button.
 */
function GoogleLoginButton() {
    const navigate = useNavigate();

    // Sign in with Google on button click
    const signIn = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            navigate('/');
        },
    });

    return <button onClick={signIn}>Iniciar sesión con Google</button>;
}

export default function Login() {
    const actionData = useActionData()
    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || '',
        password: actionData?.fields?.password || '',
    })


    /**
     * Handles input change events and updates the form data state.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.
     * @param {string} field - The field identifier in the form data state.
     * @param {React.Dispatch<React.SetStateAction<FormData>>} setFormData - The state setter function for form data.
     * @returns {void}
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    return (
        <Layout>
            <div className="h-full justify-center items-center flex flex-col gap-y-5 bg-gradient-to-r from-indigo-500">
                <form method="POST" className="rounded-2xl bg-white p-6 w-96">
                    <div className="flex items-center justify-center">
                        <h2 className="text-3xl font-extrabold text-black-600 mb-5">Login</h2>
                    </div>
                    <Textfield
                        htmlFor="email"
                        label="Email"
                        value={formData.email}
                        onChange={e => handleInputChange(e, 'email')}
                    />
                    <Textfield
                        htmlFor="password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={e => handleInputChange(e, 'password')}
                    />
                    <div className="w-full text-center mt-5">
                        <button type="submit" name="_action" value="Sign In" className="w-full rounded-xl mt-2 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-800 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600">
                            Login
                        </button>
                     </div>

                </form>
                <div>
                    <GoogleOAuthProvider clientId="648546319717-4jplle0ucla4fkk2d58md24k9ufbcm23.apps.googleusercontent.com">
                        <GoogleLoginButton />
                    </GoogleOAuthProvider>
                </div>
                <p className="text-gray-600">You do not have an account?<Link to="/signup"><span className="text-red-600 px-2 underline">Sign in</span></Link></p>
            </div>
        </Layout>
    );
}
