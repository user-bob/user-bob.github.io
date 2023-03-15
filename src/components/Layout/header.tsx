import { useAuth } from "@/context/authContext";
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

export default function Header() {
  const { user} = useAuth();
  // const [avatarToggle, setAvatarToggle] = useState(false);

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

          {/* notifications */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="inline-flex items-center justify-center mt-2 text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">
                <span className="sr-only">Open Notification menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
                <div className="relative flex">
                  <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
                </div>
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
              <Menu.Items className="absolute right-0 z-20 w-[384px] mt-2 origin-top-right dark:bg-gray-800 dark:divide-gray-700 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {() => (
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                      Notifications
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {() => (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      <a
                        href="#"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            className="rounded-full w-11 h-11"
                            src="https://source.unsplash.com/random"
                            alt="Jese image"
                            width={44}
                            height={44}
                          />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg
                              className="w-3 h-3 text-white"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            New message from{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Jese Leos
                            </span>
                            : &quot;Hey, what&apos;s up? All set for the
                            presentation?&quot;
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">
                            a few moments ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            className="rounded-full w-11 h-11"
                            alt="Joseph image"
                            src="https://source.unsplash.com/random"
                            width={44}
                            height={44}
                          />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                            <svg
                              className="w-3 h-3 text-white"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Joseph Mcfall
                            </span>{" "}
                            and{" "}
                            <span className="font-medium text-gray-900 dark:text-white">
                              5 others
                            </span>{" "}
                            started following you.
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">
                            10 minutes ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            className="rounded-full w-11 h-11"
                            alt="Bonnie image"
                            src="https://source.unsplash.com/random"
                            width={44}
                            height={44}
                          />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                            <svg
                              className="w-3 h-3 text-white"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Bonnie Green
                            </span>{" "}
                            and{" "}
                            <span className="font-medium text-gray-900 dark:text-white">
                              141 others
                            </span>{" "}
                            love your story. See it and view more stories.
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">
                            44 minutes ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            className="rounded-full w-11 h-11"
                            src="https://source.unsplash.com/random"
                            width={44}
                            height={44}
                            alt="Leslie image"
                          />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                            <svg
                              className="w-3 h-3 text-white"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Leslie Livingston
                            </span>{" "}
                            mentioned you in a comment:{" "}
                            <Link
                              className="font-medium text-blue-500"
                              href="#"
                            >
                              @bonnie.green
                            </Link>{" "}
                            what do you say?
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">
                            1 hour ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0">
                          <Image
                            className="rounded-full w-11 h-11"
                            src="https://source.unsplash.com/random"
                            width={44}
                            height={44}
                            alt="Robert image"
                          />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full dark:border-gray-800">
                            <svg
                              className="w-3 h-3 text-white"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Robert Brown
                            </span>{" "}
                            posted a new video: Glassmorphism - learn how to
                            implement the new design trend.
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">
                            3 hours ago
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {() => (
                    <a
                      href="#"
                      className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                    >
                      <div className="inline-flex items-center ">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        View all
                      </div>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button
                className={`${
                  user
                    ? "rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    : ""
                } flex items-center justify-center text-sm bg-gray-800`}
              >
                <span className="sr-only">Open user menu</span>
                {user ? (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src="https://source.unsplash.com/random"
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="block text-lg font-bold text-gray-800 dark:text-gray-200">
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
              <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {() => (
                    <div className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                      <div>Bonnie Green</div>
                      <div className="font-medium truncate">
                        name@flowbite.com
                      </div>
                    </div>
                  )}
                </Menu.Item>
                {menuItems.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={`
                            ${
                              active
                                ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                                : "text-gray-700 dark:text-gray-200"
                            } block text-sm px-4 py-2`}
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
