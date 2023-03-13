import React from "react";
import GoogleLogo from "../../../public/Google__G__Logo.svg";
import Image from "next/image";

const GoogleSignInButton = () => {
  return (
    <button type="button" className="w-full text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
      <div className="flex flex-row items-center justify-center space-x-2">
        <Image src={GoogleLogo} alt="Google Logo" width={24} height={24} />
        <span >
          Sign in with Google
        </span>
      </div>
    </button>
  );
};

export default GoogleSignInButton;
