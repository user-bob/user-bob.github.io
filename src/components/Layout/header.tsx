import {useUser} from "@/context/authContext";
import Link from "next/link";
import React, {useState} from "react";
import Image from "next/image";
import {BsGraphUpArrow} from "react-icons/bs";
import {HiOutlineMagnifyingGlass} from "react-icons/hi2";
import Notifications from "@/components/Dropdowns/Notifications";
import Profile from "@/components/Dropdowns/Profile";
import FormModal from "@/components/Form/modal/form-modal";

export default function Header() {
    const {user} = useUser();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className="px-2 bg-white border-gray-200 sm:px-6 lg:px-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="mx-auto max-w-7xl">
                <div className="relative flex items-center justify-between h-16 space-x-2 md:space-x-4">
                    {/* Logo && site-name */}
                    <div className="flex items-center justify-start mr-2">
                        <Link
                            href="#"
                            className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
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
                    </div>
                    {/* tracked items */}
                    <Link href={"#"}>
                        <BsGraphUpArrow className="inline-block mr-2"/>
                    </Link>
                    {/* search */}
                    <form className="flex-1" action="#">
                        <label
                            htmlFor="default-search"
                            className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative inline-block w-full">
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                                required
                            />
                            <div className="absolute inset-y-0 right-2.5 flex items-center px-1 pointer-events-none">
                                <HiOutlineMagnifyingGlass
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </form>

                    {/* notifications */}
                    <Notifications/>
                    {/* Profile dropdown */}
                    {user ? (
                        <Profile/>
                    ) : (
                        <button
                            className="block text-lg font-bold text-gray-800 dark:text-gray-200"
                            onClick={() => setIsOpen(true)}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
            {isOpen && (
                <FormModal isOpen={isOpen} setIsOpen={setIsOpen}/>)}
        </nav>
    );
}
