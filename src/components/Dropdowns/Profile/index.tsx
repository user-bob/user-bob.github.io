import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/authContext'

const menuItems = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

const Profile = () => {
    const { user } = useAuth()
  return (
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
          <Image
            className="w-8 h-8 rounded-full"
            src="https://source.unsplash.com/random"
            alt=""
            width={32}
            height={32}
          />
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
  )
}

export default Profile