import React from 'react';
import {TextInput} from "@/components/Form/Input";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import {loginWithGoogle} from "@/components/Form/auth/helper";
import Link from 'next/link';


type AuthFormProps = {
    closeClick: () => void,
    content: { buttonText: string; linkUrl: string; header: string; accountText: string; otherPage: string },
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    formState: { password: string; confirmPassword: string; email: string },
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    formStateErrors: { password: string; confirmPassword: string; email: string },
    login: boolean, swithAccClick: () => void,
    googleClick: () => void
}

const AuthForm = (
    {
        closeClick, swithAccClick, content, formStateErrors,
        formState, onChange, onSubmit, login,
        googleClick
    }: AuthFormProps
) => {
    return (<div className="relative bg-white shadow rounded-xl dark:bg-gray-800">
        <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={closeClick}
        >
            <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
            <span className="sr-only">Close modal</span>
        </button>
        <div className="px-6 py-6 space-y-4 lg:px-8 md:space-y-6">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {content.header}
            </h3>
            <form className="space-y-6" action="#" onSubmit={onSubmit}>
                <TextInput
                    id={"email"}
                    name={"email"}
                    type={"email"}
                    label={"Your email"}
                    placeholder={"name@company.com"}
                    value={formState.email}
                    onChange={onChange}
                    error={formStateErrors.email}
                    required
                />
                <TextInput
                    id={"password"}
                    name={"password"}
                    type={"password"}
                    label={"Password"}
                    placeholder={"••••••••"}
                    value={formState.password}
                    onChange={onChange}
                    error={formStateErrors.password}
                    required
                />
                {!login && (
                    <TextInput
                        id={"confirm-password"}
                        name={"confirmPassword"}
                        type={"password"}
                        label={"Confirm Password"}
                        placeholder={"••••••••"}
                        value={formState.confirmPassword}
                        onChange={onChange}
                        error={formStateErrors.confirmPassword}
                        required
                    />
                )}
                {!login && (
                    <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</Link></label>
                    </div>
                </div>
                )}
                {login && (
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Lost Password?
                        </a>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {content.buttonText}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {content.accountText}{" "}
                    <button
                        onClick={swithAccClick}
                        className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        {content.otherPage}
                    </button>
                </div>
            </form>
            <div className="flex flex-row items-center justify-center space-x-4">
                <div className="w-1/2 h-px bg-gray-500"/>
                <span className="text-gray-500 dark:text-gray-400">or</span>
                <div className="w-1/2 h-px bg-gray-500"/>
            </div>
            <GoogleSignInButton onClick={googleClick}/>
        </div>
    </div>);
};

export default AuthForm;
