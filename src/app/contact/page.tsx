"use client";

import React, {FC, useState} from "react";
import {HiOutlineEnvelope} from 'react-icons/hi2'
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs";
import Link from "next/link";

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
};

const social = [
    {
        name: 'Facebook',
        href: '#',
        icon: BsFacebook
    },
    {
        name: 'Instagram',
        href: '#',
        icon: BsInstagram
    },
    {
        name: 'Twitter',
        href: '#',
        icon: BsTwitter
    },
    {
        name: 'GitHub',
        href: '#',
        icon: BsGithub
    },
    {
        name: 'Dribbble',
        href: '#',
        icon: BsDribbble
    },
]

const ContactPage = () => {
    return (
        <div className="px-6 py-12 isolate sm:py-16 lg:px-8">
            <div
                className="absolute inset-x-0 top-[5rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[0.5rem]">
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
            <div className="flex flex-col items-center mx-auto justify-center w-full mb-20 text-center sm:mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                    Get in touch
                </h1>
                <p className="max-w-xl mt-6 font-light text-xl text-gray-500 dark:text-gray-400 sm:text-xl">
                    We use an agile approach to test assumptions and connect with the needs of your audience early and
                    often.
                </p>
            </div>
            <div className='flex flex-col items-center justify-center w-full mb-20 sm:mb-16'>
                <div className="grid gap-12 max-w-7xl md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative px-6 space-y-8 overflow-hidden sm:px-10">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">Contact
                                info</h2>
                            <p className="mt-6 leading-8 text-gray-600 text-md dark:text-gray-400">
                                Get in touch with us through email or on social media. We&apos;re always available to
                                answer your questions.
                            </p>
                        </div>
                        <div className="flex text-base text-gray-800 dark:text-gray-200">
                            <HiOutlineEnvelope
                                className="flex-shrink-0 w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-indigo-200 dark:hover:text-indigo-50"
                                aria-hidden="true"/>
                            <span className="ml-3">support@workcation.com</span>
                        </div>
                        <div className="flex space-x-6">
                            {social.map((item, index) => (
                                <Link href={item.href} key={index}
                                      className={'dark:hover:text-gray-300 hover:text-gray-700'}>
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="w-6 h-6" aria-hidden="true"/>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="px-6 lg:col-span-2 lg:px-0">
                        <ContactForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const inputClasses: string = "block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 dark:text-white bg-gray-50 " +
    "dark:bg-gray-700 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600" +
    " focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6";

const ContactForm: FC = () => {
    const [form, setForm] = useState(initialState);
    return (
        <form action="#" method="POST" className="max-w-xl mx-auto">
            <div className="grid gap-y-6 gap-x-8 sm:grid-cols-2">
                <div className="sm:col-span-2 lg:col-span-1">
                    <label
                        htmlFor="first-name"
                        className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200"
                    >
                        First name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="first-name"
                            onChange={(e) => setForm({...form, first_name: e.target.value})}
                            value={form.first_name}
                            id="first-name"
                            autoComplete="given-name"
                            placeholder="Jane"
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200"
                    >
                        Last name
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="last-name"
                            onChange={(e) => setForm({...form, last_name: e.target.value})}
                            value={form.last_name}
                            id="last-name"
                            autoComplete="family-name"
                            placeholder="Doe"
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200"
                    >
                        Email
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            value={form.email}
                            autoComplete="email"
                            placeholder="name@example.com"
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="phone-number"
                        className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200"
                    >
                        Subject
                    </label>
                    <div className="relative mt-2.5">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="country" className="sr-only">
                                Country
                            </label>
                        </div>
                        <input
                            type="tel"
                            name="subject"
                            id="subject"
                            onChange={(e) => setForm({...form, phone: e.target.value})}
                            value={form.phone}
                            autoComplete="text"
                            placeholder="Let's talk know how we can help you."
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="flex justify-between">
                        <label
                            htmlFor="message"
                            className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200"
                        >
                            Message
                        </label>
                        <span id="message-max" className="text-sm text-gray-400">
                          Max. 500 characters
                        </span>
                    </div>
                    <div className="mt-2.5">
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            maxLength={500}
                            onChange={(e) => setForm({...form, message: e.target.value})}
                            value={form.message}
                            placeholder="Enter your message here."
                            className={inputClasses}
                            defaultValue={""}
                        />
                    </div>
                </div>
                <span className={'sm:col-span-2 opacity-70 text-sm'}>
                        By submitting this form you agree to our{" "}
                    <Link href={'#'}
                          className={'text-blue-500 hover:text-blue-400 font-semibold'}>terms and conditions </Link>
                    {" "}and our {" "}
                    <Link href={"#"}
                          className={'text-indigo-600 hover:text-indigo-500 font-semibold'}>privacy policy</Link>
                    {" "}which explains how we may collect, use and disclose your personal information including to third parties.
                </span>
            </div>
            <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Send message
                </button>
            </div>
        </form>
    );
};

export default ContactPage;