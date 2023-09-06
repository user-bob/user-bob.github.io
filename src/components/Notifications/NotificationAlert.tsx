/* This example requires Tailwind CSS v2.0+ */
import React, {FC, Fragment, useState} from 'react'
import {Transition} from '@headlessui/react'
import {HiXMark} from "react-icons/hi2";

export interface NotificationAlertProps {
    show: boolean;
    setShow?: (show: boolean) => void;
    message: NotificationMessageSmall;
}

export interface NotificationMessageSmall {
    title: string;
    message: string;
    img: string;
}

export const NotificationAlert: FC<NotificationAlertProps> = ({
                                                                  show,
                                                                  setShow,
                                                                  message
                                                              }) => {
    const [showNot, setShowNot] = useState(show);
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed inset-0 flex z-50 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={showNot}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 dark:ring-gray-700 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={message.img}
                                            alt={message.title}
                                            className={'w-16 h-16 rounded-lg'}
                                        />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-2 dark:text-white">{message.title}</p>
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-3 dark:text-gray-400">{message.message}</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShowNot(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <HiXMark className="h-5 w-5" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
