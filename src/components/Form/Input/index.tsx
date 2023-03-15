// @flow
import * as React from 'react';

type Props = {
    id: string;
    label: string;
    props: React.ReactNode;
};
export const TextInput = ({id, label, ...rest}: Props) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                {label}
            </label>
            <input
                className="bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // className={"dark:bg-gray-800 block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"}
                id={id}
                name={id}
                {...rest}
            />
        </div>
    );
};