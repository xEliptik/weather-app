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
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: "/",
    })
    return user
}


export const action: ActionFunction = async ({ request }) => {
    return authenticator.authenticate("form", request, {
        successRedirect: "/",
        failureRedirect: "/login",
    })
}

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
    return <button onClick={signIn}>Log in with google</button>;
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
            <div className="min-h-screen flex flex-col items-center justify-center">
                <form method="POST" className="rounded-2xl bg-white p-6 w-96">
                    <div className="flex items-center justify-center mb-5">
                        <h2 className="text-3xl font-extrabold text-black-600">Login</h2>
                    </div>
                    <Textfield
                        htmlFor="email"
                        label="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />
                    <Textfield
                        htmlFor="password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange(e, 'password')}
                    />
                    <div className="w-full text-center mt-5">
                        <button
                            type="submit"
                            name="_action"
                            value="Sign In"
                            className="w-full rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-blue-800 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
                        > Login
                        </button>
                    </div>
                </form>

                <div className="flex flex-col items-center mt-5 text-center">
                    {/* <GoogleOAuthProvider clientId="648546319717-4jplle0ucla4fkk2d58md24k9ufbcm23.apps.googleusercontent.com">
                        <GoogleLoginButton />
                    </GoogleOAuthProvider> */}

                    <p className="text-black-600 mt-5">
                        You do not have an account?
                        <Link to="/signup">
                            <span className="text-red-600 px-2 underline">Sign up</span>
                        </Link>
                    </p>
                </div>
            </div>

        </Layout>
    );
}
