import {NotificationsTheme} from "./Notifications";

export const notificationsTheme: NotificationsTheme = {
    root: 'w-full dark:border-gray-600 max-w-sm bg-white dark:bg-gray-800 overflow-hidden flex-auto p-0 text-sm shadow-lg',
    button: {
        base: 'rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
        icon: 'h-5 w-5',
    },
    header: {
        base: 'block bg-gray-50 p-2 dark:bg-gray-900/20',
        title: 'text-lg text-center font-semibold text-gray-900 dark:text-white',
    },
    body: {
        base: "flex flex-col gap-1 px-2.5 py-1",
        item: {
            base: "relative flex rounded-lg px-4 py-2.5 group gap-x-4 hover:bg-gray-100 dark:hover:bg-gray-700",
            img: "flex-shrink-0 w-14 h-14 rounded-lg",
            title: "font-semibold text-gray-900 dark:text-gray-100 line-clamp-1",
            message: "text-gray-600 dark:text-gray-300 line-clamp-1",
            time: "mt-px text-xs text-blue-600 dark:text-blue-400",
        }
    },
    viewAll: {
        base: "flex bg-gray-50 justify-center dark:bg-gray-900/20",
        link: "inline-flex w-full justify-center p-3 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        icon: "flex-none w-5 h-5 text-gray-400",
    }
}