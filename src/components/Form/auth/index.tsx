import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import classNames from "@/utils/class-names";
import {
  login,
  loginWithGoogle,
  register,
  validateEmail,
  validatePassword,
} from "./helper";

const registerContent = {
  linkUrl: "/login",
  accountText: "Already have an account?",
  otherPage: "Login",
  header: "Create a new account",
  subheader: "Just a few things to get started",
  buttonText: "Sign Up",
};

const signinContent = {
  linkUrl: "/signup",
  accountText: "Don't have an account?",
  otherPage: "Sign up",
  header: "Welcome back!",
  subheader: "Sign in to your account",
  buttonText: "Sign In",
};

type PageProps = {
  type: "register" | "signin";
};

// initial state of the form
const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthForm = ({ type }: PageProps) => {
  const [formState, setFormState] = useState({ ...initial });
  const [formStateErrors, setFormStateErrors] = useState({ ...initial });

  const content = type === "register" ? registerContent : signinContent;
  const router = useRouter();

  // This function is called when the user changes the value of an input.
  // It updates the form state and validates the input.
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setFormState((s) => ({ ...s, [name]: value }));
    validateInput(event);
  };

  // This function is called when the form is submitted. It prevents
  // the form from being submitted if there are errors in the form.
  // If there are no errors, it calls handleSubmit.
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formStateErrors) {
      handleSubmit(e);
    }
  };

  // This function validates the input of the user and sets the state of the component accordingly
  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setFormStateErrors((s) => {
      const stateObj = { ...s, [name]: "" }; // Create a new object using the previous errors and the new value
      switch (name) {
        case "email":
          if (value && !validateEmail(value)) {
            // Check if the email is valid
            stateObj[name] = "Please enter a valid email";
          }
          break;

        case "password":
          if (!value) {
            // Check if the password is not empty
            stateObj[name] = "";
          } else if (!validatePassword(value)) {
            // Check if the password is valid
            stateObj[name] = "Please must be 8 characters or above";
          } else if (
            formState.confirmPassword &&
            value !== formState.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = formState.confirmPassword
              ? ""
              : formStateErrors.confirmPassword;
          }
          break;

        // This code checks if the password and confirm password match, if not it sets the error message.
        case "confirmPassword":
          if (value && formState.password && value !== formState.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  // This function handles the submission of the form
  // It is called when the user clicks on the submit button
  // It calls the API to create / login the a user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh on form submit
    e.preventDefault();
    // Declare message variable
    let msg: string;
    try {
      // If type is register, call register method
      if (type === "register") {
        msg = await register(formState);
      } else {
        // Call login method
        msg = await login(formState);
      }
      // If message is success, push user to home page
      if (msg === "success") {
        router.push("/");
        // Reset form state
        setFormState(initial);
      } else {
        // Set error message
        msg.toLowerCase().includes("password")
          ? setFormStateErrors((s) => ({ ...s, password: msg }))
          : setFormStateErrors((s) => ({ ...s, email: msg }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="w-full bg-local bg-center bg-no-repeat bg-cover bg-login-pattern">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          Flowbite
        </Link>
        <div className="w-full bg-white shadow rounded-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className={classNames(
                "text-xl font-bold text-center tracking-tight text-gray-900 md:text-2xl dark:text-white"
              )}
            >
              {content.header}
            </h1>
            <h3 className="text-sm font-semibold tracking-tight text-center text-gray-900 md:text-lg dark:text-white">
              {content.subheader}
            </h3>
            <GoogleSignInButton onClick={loginWithGoogle} />
            <div className="flex flex-row items-center justify-center space-x-4">
              <div className="w-[200px] h-px bg-gray-600" />
              <span className="text-gray-500 dark:text-gray-400">or</span>
              <div className="w-[200px] h-px bg-gray-600" />
            </div>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={onFormSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className={classNames(
                    formStateErrors.email
                      ? "text-red-700 dark:text-red-500"
                      : "text-gray-900 dark:text-white",
                    "block mb-2 text-sm font-medium"
                  )}
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={onInputChange}
                  value={formState.email}
                  id="email"
                  className={classNames(
                    formStateErrors.email
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                      : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 border-gray-300 text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                    "border bg-gray-50 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
                  )}
                  placeholder="name@company.com"
                  required
                />
                {formStateErrors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formStateErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={classNames(
                    formStateErrors.password
                      ? "text-red-700 dark:text-red-500"
                      : "text-gray-900 dark:text-white",
                    "block mb-2 text-sm font-medium"
                  )}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={onInputChange}
                  value={formState.password}
                  placeholder="••••••••"
                  className={classNames(
                    formStateErrors.password
                      ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                      : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 border-gray-300 text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                    "border bg-gray-50 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
                  )}
                  required
                />
                {formStateErrors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {formStateErrors.password}
                  </p>
                )}
              </div>
              {type === "register" && (
                <div>
                  <label
                    htmlFor="confirm-password"
                    className={classNames(
                      formStateErrors.confirmPassword
                        ? "text-red-700 dark:text-red-500"
                        : "text-gray-900 dark:text-white",
                      "block mb-2 text-sm font-medium"
                    )}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    onChange={onInputChange}
                    value={formState.confirmPassword}
                    placeholder="••••••••"
                    className={classNames(
                      formStateErrors.confirmPassword
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 border-gray-300 text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                      "border bg-gray-50 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
                    )}
                    required
                  />
                  {formStateErrors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {formStateErrors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {type === "signin" && (
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {content.buttonText}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {content.accountText}{" "}
                <Link
                  href={content.linkUrl}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {content.otherPage}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
