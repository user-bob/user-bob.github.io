import {twMerge} from "tailwind-merge";
import {FC} from "react";

export interface BuyOptionsTableData {
    store: string,
    price: string,
    tax?: string,
    shipping?: string,
    delivery?: string,
    returns?: string,
    total?: string,
    link: string,
}

interface BuyOptionsTableProps {
    items: BuyOptionsTableData[]
}

export const BuyOptionsTable: FC<BuyOptionsTableProps> = ({items}) => {
    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div
                className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div
                                className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <input type="text" id="simple-search"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="Search" required/>
                        </div>
                    </form>
                </div>
                <div
                    className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown"
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button">
                            <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                            </svg>
                            Actions
                        </button>
                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                 className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                      clipRule="evenodd"/>
                            </svg>
                            Filter
                            <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {Object.keys(items[0]).filter(
                            key => key !== 'link' && key !== 'currency' && key !== 'tax' && key !== 'shipping'
                        ).map((key, index) => {
                            return <th key={index} scope="col"
                                       className={twMerge((index === 0 || key === 'price') ? '' : 'hidden lg:table-cell',
                                           "px-4 py-3")}>{key === 'delivery' ? 'Shipping & Delivery' : key}</th>
                        })
                        }
                        <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Link</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td
                                className={twMerge(
                                    'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                )}
                            >
                                <div className="font-semibold text-gray-900 dark:text-white">
                                    {item.store}
                                </div>
                                <div className="mt-1 flex flex-col gap-1 lg:hidden">
                                            <span>
                                              {item.shipping} delivery by {item.delivery}
                                            </span>
                                    <span>{item.returns}</span>
                                    {/*<span className="hidden sm:inline"> · </span>*/}
                                    <span
                                        className={'text-gray-600 dark:text-gray-300'}>{item.price}</span>
                                    <span>+{item.tax} est. tax</span>
                                </div>
                            </td>
                            <td
                                className={twMerge(
                                    'hidden px-3 py-3.5 text-sm lg:table-cell'
                                )}
                            >
                                {item.shipping} delivery by {item.delivery}
                            </td>
                            <td
                                className={twMerge(
                                    'hidden px-3 py-3.5 text-sm lg:table-cell'
                                )}
                            >
                                {item.returns}
                            </td>
                            <td
                                className={twMerge(
                                    'hidden px-3 py-3.5 text-sm lg:table-cell'
                                )}
                            >
                                <div className={`flex flex-col`}>
                                            <span
                                                className={'text-gray-600 dark:text-gray-300'}>{item.price}
                                            </span>
                                    <span>+{item.tax} est. tax</span>
                                </div>
                            </td>
                            <td
                                className={twMerge(
                                    'px-3 py-3.5 text-sm text-gray-800 dark:text-gray-100'
                                )}
                            >
                                <div className="sm:hidden">{item.total}</div>
                                <div className="hidden sm:block">{item.total}</div>
                            </td>
                            <td
                                className={twMerge(
                                    'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                                )}
                            >
                                <div className="flex-shrink-0 justify-center flex">
                                    <a href={item.link}
                                       className="font-medium px-4 py-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-500 hover:text-blue-600 dark:bg-blue-600 dark:text-blue-50 hover:dark:text-white hover:dark:bg-blue-500">
                                        Shop now<span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#"
                           className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page"
                           className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="#"
                           className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
