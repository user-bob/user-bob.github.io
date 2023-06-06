import React from 'react'
import {HiCheck, HiHandThumbUp, HiUser,} from "react-icons/hi2";
import classNames from "classnames";
import {signOut, useSession} from "next-auth/react";


const eventTypes = {
    applied: {icon: HiUser, bgColorClass: 'bg-gray-400'},
    advanced: {icon: HiHandThumbUp, bgColorClass: 'bg-blue-500'},
    completed: {icon: HiCheck, bgColorClass: 'bg-green-500'},
}
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: 'Applied to',
        target: 'Front End Developer',
        date: 'Sep 20',
        datetime: '2020-09-20',
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        date: 'Sep 22',
        datetime: '2020-09-22',
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        date: 'Sep 28',
        datetime: '2020-09-28',
    },
    {
        id: 4,
        type: eventTypes.advanced,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        date: 'Oct 4',
        datetime: '2020-10-04',
    },
]
const categories = [
    {name: 'Electronics', href: '#', id: 1},
    {name: 'Home Appliances', href: '#', id: 2},
    {name: 'Phones & Tablets', href: '#', id: 3},
    {name: 'Computers', href: '#', id: 4},
    {name: 'TV & Audio', href: '#', id: 5},
    {name: 'Gaming', href: '#', id: 6},
    {name: 'Cameras', href: '#', id: 7},
    {name: 'Car Electronics', href: '#', id: 8},
    {name: 'Video Games', href: '#', id: 9},
    {name: 'Accessories', href: '#', id: 10},
]
const Profile = ({data}: any) => {
    const {data: session} = useSession();
    const {userRole, emailVerified, provider} = data;
    return (
        <>
            <div className="min-h-full]">
                <div
                    className="absolute inset-x-0 top-[2rem] dark:z-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[0.1rem]">
                    <svg
                        className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
                        viewBox="0 0 1155 678"
                    >
                        <path
                            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                            fillOpacity=".3"
                            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                        />
                        <defs>
                            <linearGradient
                                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                                x1="1155.49"
                                x2="-78.208"
                                y1=".177"
                                y2="474.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#9089FC"/>
                                <stop offset={1} stopColor="#FF80B5"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <main className="py-10">
                    {/* Page header */}
                    <div
                        className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        className="h-24 w-24 rounded-full"
                                        src={session?.user?.image!}
                                        alt=""
                                    />
                                    <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"/>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{session?.user?.name}</h1>
                                <p className="text-sm font-medium text-gray-500">
                                    Created At <time dateTime="2020-08-25">
                                    {/*{tenant?.claims.creationTime}*/}
                                    Jan 1, 2021
                                </time>
                                </p>
                            </div>
                        </div>
                        <div
                            className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                    <div
                        className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                            {/* Personal info*/}
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white dark:bg-gray-900 dark:bg-opacity-70 shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title"
                                            className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                            General Information
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and
                                            Provider Info.</p>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{session?.user?.name}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{session?.user?.email}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Email Status</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{emailVerified ? 'Verified' : 'Not Verified'}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Provider</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{provider}</dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">About</dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    Hi there, I&apos;m an enthusiast of electronic gadgets and all
                                                    things tech.
                                                </dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">Interested
                                                    Categories
                                                </dt>
                                                <dd className="mt-2 text-sm text-gray-900 dark:text-gray-100">
                                                    <ul className="border border-gray-200 dark:border-gray-800 rounded-md divide-y divide-gray-200 dark:divide-gray-800">
                                                        {categories?.map((category) => (
                                                            <li key={category.id}
                                                                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                                <div className="w-0 flex-1 flex items-center">
                                                                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 20 20"
                                                                         fill="currentColor"
                                                                         aria-hidden="true">
                                                                        <path fillRule="evenodd"
                                                                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                              clipRule="evenodd"/>
                                                                    </svg>
                                                                    <span className="ml-2 flex-1 w-0 truncate">
                                                                        {category.name}
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4 flex-shrink-0">
                                                                    <a href={category.href}
                                                                       className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        View </a>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                            <div
                                className="bg-white dark:bg-gray-900 dark:bg-opacity-70 px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <h2 id="timeline-title"
                                    className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Timeline
                                </h2>

                                {/* Activity Feed */}
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-mb-8">
                                        {timeline.map((item, itemIdx) => (
                                            <li key={item.id}>
                                                <div className="relative pb-8">
                                                    {itemIdx !== timeline.length - 1 ? (
                                                        <span
                                                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                            aria-hidden="true"
                                                        />
                                                    ) : null}
                                                    <div className="relative flex space-x-3">
                                                        <div>
                              <span
                                  className={classNames(
                                      item.type.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900'
                                  )}
                              >
                                <item.type.icon className="w-5 h-5" aria-hidden="true"/>
                              </span>
                                                        </div>
                                                        <div
                                                            className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    {item.content}{' '}
                                                                    <a href="#"
                                                                       className="font-medium text-gray-900 dark:text-gray-100">
                                                                        {item.target}
                                                                    </a>
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                <time dateTime={item.datetime}>{item.date}</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6 flex flex-col justify-stretch">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Advance to offer
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
};


export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/profile`)
    // @ts-ignore
    const {userRole, emailVerified, provider} = await res.json();

    const data = {userRole, emailVerified, provider}

    // Pass data to the page via props
    return { props: { data } }
}

export default Profile;