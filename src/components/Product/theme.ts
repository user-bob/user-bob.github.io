import {ProductCardTheme} from "@/components/Product/Product";

export const productCardTheme: ProductCardTheme = {
    root: {
        base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
        background: {
            on: '',
            off: 'bg-transparent dark:bg-transparent border-transparent dark:border-transparent',
        }
    },
    rating: {
        base: 'my-1.5 flex items-center justify-center',
        rating: 'ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800',
        total: 'text-sm text-gray-500',
    },
    store: {
        base: 'text-xs text-center font-semibold text-gray-500 uppercase'
    },
    title: {
        base: 'text-xl font-semibold text-center line-clamp-2 tracking-tight text-gray-900 dark:text-white',
    },
    price: {
        base: 'flex items-center justify-between',
        previous: {
            on: 'text-sm font-medium text-gray-500 line-through',
            off: 'invisible',
        },
        current: 'text-2xl font-bold text-gray-900 dark:text-white',
        discounted: {
            on: 'text-green-500',
            off: 'text-red-500'
        },
        percentage: {
            on: 'text-sm font-medium',
            off: 'invisible'
        }
    }
}