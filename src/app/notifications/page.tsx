'use client'

import React, {FC, useState} from 'react';
import {useSearchParams} from "next/navigation";
import {Button} from "@material-tailwind/react";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi2";


const notifications: any[] = [];
const types = ["order", "message", "review", "other"];

export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


Array.from({length: 8}).map((_, i) => {
    notifications.push({
        id: i.toString(),
        type: types[getRandomIntInclusive(0, types.length - 1)],
        message: `This is a test message for the notification alert. It should be displayed in the upper right corner of the screen.`,
        time: `${getRandomIntInclusive(1, 12)} hours ago`,
        img: '/images/products/room.jpeg',
        title: 'Hello World!!! This is a test message for the notification alert.',
    });
})

const NotificationsPage = () => {
    return (
        <div>
            <div className="bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Notifications
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum
                            cupiditate veritatis in, accusamus quisquam.
                        </p>

                        <div className="mt-10 space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent</h3>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                                >
                                    Mark all as read
                                </button>

                            </div>
                            <div className="flow-root">
                                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                                    {notifications.filter(
                                        (_, index) => index < 6
                                    ).map((notification) => (
                                        <li key={notification.id} className="py-5">
                                            <div
                                                className="w-full bg-white dark:bg-gray-800 shadow rounded-lg pointer-events-auto ring-1 dark:ring-gray-700 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="p-4">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                src={notification.img}
                                                                alt=""
                                                                className={'w-24 h-24 rounded-lg'}
                                                            />
                                                        </div>
                                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                                                            <div className="mt-2 flex justify-end">
                                                                <div
                                                                    className="flex items-center text-sm text-gray-500">
                                                                    <time
                                                                        dateTime="2020-09-20">{notification.time}</time>
                                                                </div>
                                                                <div
                                                                    className="ml-6 pl-6 border-l border-gray-200 dark:border-gray-700">
                                                                    <div
                                                                        className="space-x-1 flex text-sm text-gray-500">
                                                                        <button
                                                                            type="button"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            Mark as read
                                                                        </button>
                                                                        <span aria-hidden="true">·</span>
                                                                        <button
                                                                            type="button"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-12">
                                    <Pagination
                                        pages={3}
                                        onCurrentPageChange={(page) => {
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export interface PaginationProps {
    onCurrentPageChange: (page: number) => void
    pages: number
}

const Pagination: FC<PaginationProps> = ({onCurrentPageChange, pages}) => {
    const searchParams = useSearchParams()!
    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
    const [active, setActive] = useState(currentPage);

    const getItemProps = (index: number) =>
        ({
            variant: active === index ? "filled" : "text",
            color: active === index ? "blue" : "blue-gray",
            onClick: () => {
                setActive(index);
                onCurrentPageChange(index)
            },
        } as any);

    const next = () => {
        if (active === pages) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex items-center gap-4 justify-center">
            {pages >= 2 && (<Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <HiArrowLeft strokeWidth={2} className="h-4 w-4"/> Previous
            </Button>)}
            <div className="flex items-center gap-2">
                {/*    array of the first and last 2 pages seperated by `...`*/}
                {Array.from({length: pages}, (_, i) => i + 1).map((page, index) => {
                    if (page === 1 || page === pages || (active - 2 <= page && page <= active + 2)) {
                        return (
                            <Button key={index} {...getItemProps(page)}>
                                {page}
                            </Button>
                        );
                    }

                    if (active - 3 === page || active + 3 === page) {
                        return <span key={index}>...</span>;
                    }

                    return null;
                })}
            </div>
            {pages >= 2 && (<Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === pages}
            >
                Next
                <HiArrowRight strokeWidth={2} className="h-4 w-4"/>
            </Button>)}
        </div>
    )
}
export default NotificationsPage;
