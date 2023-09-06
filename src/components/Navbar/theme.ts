import type { FlowbiteNavbarTheme } from "./Navbar";

export const navbarTheme: FlowbiteNavbarTheme = {
  root: {
    base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pr-4 pl-3 md:p-0",
    active: {
      on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
    icon: "h-6 w-6 shrink-0",
    isSearchPage: {
      on: "xl:hidden",
      off: "lg:hidden",
    },
  },
  top: {
    root: {
      base: "bg-gray-900 w-full",
      inner: {
        base: "mx-auto h-10 flex items-center justify-between sm:px-6 max-w-screen-2xl px-4 lg:px-20",
      },
    },
  },
  popover: {
    root: {
      base: "grid grid-cols-2 gap-x-8 gap-y-10 p-4",
    },
    featured: {
      base: "col-start-2 grid grid-cols-3 gap-x-8",
      item: {
        base: "group relative text-base sm:text-sm",
        img: {
          base: "aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75",
          // base: "flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75",
          image: "object-cover object-center",
        },
        title: {
          base: "mt-6 block font-medium dark:text-white text-gray-900",
          text: "absolute inset-0 z-10",
        },
      },
    },
    section: {
      base: "row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm",
      title: "font-medium text-gray-900 dark:text-white",
      links: {
        base: "mt-6 space-y-6 sm:mt-4 sm:space-y-4 text-gray-600 dark:text-gray-300",
        link: {
          base: "flex",
          text: "hover:text-gray-800 hover:dark:text-white",
        },
      },
    },
  },
  user: {
    root: {
      base: "w-56 px-0 py-2.5 text-base list-none text-left bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700/50",
    },
    header: {
      base: "px-7 pb-3 gap-1.5",
      name: "block text-base font-semibold text-gray-900 dark:text-white",
      email: "block text-sm font-light text-gray-500 truncate dark:text-gray-400",
    },
    list: {
      base: "py-1 px-3.5 font-light text-gray-500 dark:text-gray-400",
      item: {
        text: "py-2 px-3.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white",
        icon: "mr-2 w-5 h-5 text-gray-400",
      },
    },
  },
};
