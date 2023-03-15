// @flow
import * as React from 'react';
import classNames from "@/utils/class-names";
// @ts-ignore
export const TextInput = ({id, label, error, ...props}) => {
    return (
        <div>
            <label htmlFor={id} className={classNames(
                error
                    ? "text-red-700 dark:text-red-500"
                    : "text-gray-900 dark:text-white",
                "block mb-2 text-sm font-medium"
            )}>
                {label}
            </label>
            <input
                className={classNames(
                    error
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400"
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-primary-600 focus:border-primary-600 border-gray-300 text-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                    "border bg-gray-50 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
                )}
                id={id}
                {...props}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};