import React, {useState} from 'react';
import classNames from "@/utils/class-names";
import {Switch} from '@headlessui/react'


const tabs = [
    'Account',
    'Notifications'
]
const accountList = [
    {name: 'Language', value: 'English'},
    {name: 'Location', value: 'United States'},
    {name: 'Currency', value: 'USD'},
    {name: 'DateFormat', value: 'MM/DD/YYYY'},
]

const Settings = () => {
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false)
    const [currentTab, setCurrentTab] = useState(tabs[0])
    return (
        <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 pb-12">
            <div
                aria-hidden="true"
                className={classNames(
                    'absolute h-1/2 inset-x-0 left-1/2 transform -mt-16 -translate-x-1/2 w-full overflow-hidden inset-y-0'
                )}
            >
                <div className="absolute inset-0 flex">
                    <div className="h-full w-1/2" style={{backgroundColor: '#0a527b'}}/>
                    <div className="h-full w-1/2" style={{backgroundColor: '#065d8c'}}/>
                </div>
                <div className="relative flex justify-center">
                    <svg
                        className="flex-shrink-0"
                        width={1750}
                        height={308}
                        viewBox="0 0 1750 308"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1"/>
                        <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c"/>
                        <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b"/>
                        <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76"/>
                    </svg>
                </div>
            </div>
            <header className="relative py-10">
                <h1 className="text-5xl font-bold text-white">Settings</h1>
            </header>
            <main className="flex-1 relative">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                    <div className="py-10 px-4 sm:px-6 lg:px-8">
                        <div className="px-4 sm:px-6 md:px-0 space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{currentTab}</h1>
                            <p className="max-w-2xl text-sm text-gray-500">
                                Manage how information is displayed on your account.
                            </p>
                        </div>
                        <div className="px-4 sm:px-6 md:px-0">
                            <div className="py-6">
                                {/* small Tab */}
                                <div className="sm:hidden">
                                    <label htmlFor="selected-tab" className="sr-only">
                                        Select a tab
                                    </label>
                                    <select
                                        id="selected-tab"
                                        name="selected-tab"
                                        onChange={event => setCurrentTab(event.target.value)}
                                        className="mt-1 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 block w-full pl-3 pr-10 py-2 text-base border-none dark:focus:ring-gray-700 focus:ring-gray-300 sm:text-sm rounded-md"
                                        value={currentTab}
                                    >
                                        {tabs.map((tab) => (
                                            <option key={tab} value={tab}>{tab}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* large Tab */}
                                <div className="hidden sm:block">
                                    <div className="border-b border-gray-200 dark:border-gray-800">
                                        <nav className="-mb-px flex space-x-16">
                                            {tabs.map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setCurrentTab(tab)}
                                                    className={classNames(
                                                        currentTab == tab
                                                            ? 'border-purple-500 text-purple-600'
                                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                                    )}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>

                                {
                                    currentTab === 'Account' ? (
                                        <div className="mt-6">
                                            <dl className="divide-y divide-gray-200 dark:divide-gray-800">
                                                {accountList.map((account) => (
                                                    <div key={account.name}
                                                         className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-sm font-medium text-gray-500">{account.name}</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                            <span className="flex-grow">{account.value}</span>
                                                            <span className="ml-4 flex-shrink-0">
                                  <button
                                      type="button"
                                      className="rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Update
                                  </button>
                                </span>
                                                        </dd>
                                                    </div>
                                                ))}
                                                <Switch.Group as="div"
                                                              className="py-4 sm:py-5 grid grid-cols-2 gap-4 sm:pt-5">
                                                    <Switch.Label as="dt"
                                                                  className="text-sm font-medium text-gray-500"
                                                                  passive>
                                                        Automatic timezone
                                                    </Switch.Label>
                                                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                                                        <Switch
                                                            checked={automaticTimezoneEnabled}
                                                            onChange={setAutomaticTimezoneEnabled}
                                                            className={classNames(
                                                                automaticTimezoneEnabled ? 'bg-purple-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ml-auto'
                                                            )}
                                                        >
                                  <span
                                      aria-hidden="true"
                                      className={classNames(
                                          automaticTimezoneEnabled ? 'translate-x-5' : 'translate-x-0',
                                          'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                      )}
                                  />
                                                        </Switch>
                                                    </dd>
                                                </Switch.Group>
                                                <Switch.Group
                                                    as="div"
                                                    className="py-4 sm:py-5 grid grid-cols-2 gap-4 border-b border-gray-200"
                                                >
                                                    <Switch.Label as="dt"
                                                                  className="text-sm font-medium text-gray-500"
                                                                  passive>
                                                        Auto-update applicant data
                                                    </Switch.Label>
                                                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                                                        <Switch
                                                            checked={autoUpdateApplicantDataEnabled}
                                                            onChange={setAutoUpdateApplicantDataEnabled}
                                                            className={classNames(
                                                                autoUpdateApplicantDataEnabled ? 'bg-purple-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ml-auto'
                                                            )}
                                                        >
                                  <span
                                      aria-hidden="true"
                                      className={classNames(
                                          autoUpdateApplicantDataEnabled ? 'translate-x-5' : 'translate-x-0',
                                          'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                      )}
                                  />
                                                        </Switch>
                                                    </dd>
                                                </Switch.Group>
                                            </dl>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full items-center justify-center flex">
                                            <span
                                                className="text-5xl font-bold text-gray-900 dark:text-gray-200">{currentTab}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {/* logout and delete account buttons */}
                        <div className={'space-y-16 mt-10 justify-center items-center flex flex-col'}>
                            <button
                                type="button"
                                className="rounded-md font-medium text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Logout
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-red-600 font-medium hover:bg-red-500 py-2.5 max-w-xs w-full text-gray-200 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;