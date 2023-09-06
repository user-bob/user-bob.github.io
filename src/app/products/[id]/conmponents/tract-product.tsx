import React, {useState} from "react";
import {LuBellPlus} from "react-icons/lu";

export const TrackProduct = () => {
    const [selected, setSelected] = useState(false);
    return (
        <div className={'flex flex-col gap-3'}>
            <h2 className="text-xl text-gray-900 dark:text-white font-semibold">
                Track product
            </h2>
            <div
                className="max-w-sm hover:bg-gray-50 dark:hover:bg-gray-800 shadow-md flex justify-between border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700 p-3"
            >
                <div
                    className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-300">
                    <div className={'flex gap-2'}>
                        <LuBellPlus className="w-8 h-8"/>
                        <span className={'text-2xl font-semibold text-gray-900 dark:text-white'}>
                        Track price
                    </span>
                    </div>
                    <p>
                        Get notified when the price drops
                    </p>
                </div>
                <div className="mt-4">
                    <label className="relative inline-flex items-center mb-3 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"
                               checked={selected}
                               onChange={(e) => setSelected(e.target.checked)}
                        />
                        <div
                            className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}