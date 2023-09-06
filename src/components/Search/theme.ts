import {SearchPaletteTheme} from "@/components";

export const searchTheme: SearchPaletteTheme = {
    root: {
        base: 'overflow-hidden transition-all transform divide-y divide-gray-100 dark:divide-gray-600 shadow-2xl rounded-xl ring-1 ring-black ring-opacity-5',
        overlay: 'fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 transition-opacity',
        dialog: "fixed inset-0 z-10 p-4 top-[15%] sm:p-6 md:p-20",
    },
    handler: {
        base: 'flex p-2 text-base font-bold text-gray-700 hover:text-gray-900 focus:outline-none dark:text-gray-400 hover:dark:text-gray-100',
        icon: 'w-6 h-6',
    },
    input: {
        base: 'w-full h-12 pr-4 text-gray-800 placeholder-gray-400 dark:text-white bg-transparent border-0 pl-11 focus:ring-0 sm:text-sm',
        icon: 'pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500 dark:text-gray-400',
    },
    results: {
        base: 'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
        recent: 'mt-2 mb-4 text-xs font-semibold text-gray-500',
        filtered: {
            base: '-mx-2 text-sm text-gray-700',
            item: {
                base: 'flex cursor-default select-none items-center rounded-md p-2',
                active: {
                    on: 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white',
                    off: 'text-gray-500 dark:text-gray-400'
                },
                img: 'flex-none w-8 h-8 rounded-lg',
                title: 'flex-auto ml-3 truncate',
                icon: 'flex-none w-5 h-5 ml-3 text-gray-400'
            }

        }
    },
    active: {
        base: 'flex-col flex-none w-1/2 px-5 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-600 h-96 sm:flex',
        img: 'flex-shrink-0 mx-auto w-full h-72 rounded-lg overflow-hidden',
        title: 'text-xl mt-3 font-semibold text-center line-clamp-2 tracking-tight text-gray-900 dark:text-white',
        review: {
            base: 'w-full mt-3 flex justify-center',
            rating: 'ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800'
        },
        price: 'text-2xl mt-3 font-bold text-gray-900 dark:text-white',
    }

}