import { useAuth, signOut } from "@/context/authContext";
import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Menu, Transition } from "@headlessui/react";

const menuItems = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Header(props: any) {
  const { user, loading } = useAuth();

  return (
    <nav className="px-2 bg-white border-gray-200 sm:px-6 lg:px-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between h-16 space-x-4">
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
            <BsGraphUpArrow className="inline-block mr-2" />
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
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex items-center justify-center space-x-2 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                {user ? (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/random"
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="hidden text-lg font-bold text-gray-800 sm:block dark:text-gray-200">
                    Login
                  </span>
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {menuItems.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={`
                            ${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
