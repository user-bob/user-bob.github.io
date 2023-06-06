import * as CONST from "@/constants/colors";

const options = [
    {id: 1, store: 'Amazon', price: 100, total_price: 110, delivery_date: '2021-01-01', link: 'https://google.com'},
    {id: 2, store: 'Ebay', price: 120, total_price: 130, delivery_date: '2021-01-01', link: 'https://google.com'},
    {id: 3, store: 'Walmart', price: 140, total_price: 150, delivery_date: '2021-01-01', link: 'https://google.com'},
    {id: 4, store: 'Best Buy', price: 160, total_price: 170, delivery_date: '2021-01-01', link: 'https://google.com'},
    {id: 5, store: 'Target', price: 180, total_price: 190, delivery_date: '2021-01-01', link: 'https://google.com'},
    {id: 6, store: 'Newegg', price: 200, total_price: 210, delivery_date: '2021-01-01', link: 'https://google.com'},
    {id: 7, store: 'Aliexpress', price: 220, total_price: 230, delivery_date: '2021-01-01', link: 'https://google.com'},
]

const columns = [
    'Store',
    'Price',
    'Total Price',
    'Delivery & Returns',
    'Link',
]

export default function BuyingOptions() {
    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Buying options</h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        This is a list of buying options for this product.
                    </p>
                </div>
            </div>
            <div
                className="-mx-4 mt-4 overflow-hidden shadow ring-1 ring-black dark:ring-gray-600 ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead className={`bg-gray-50 ${CONST.DARK_BG_ALT4}`}>
                    <tr>
                        <th scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6">
                            Store
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 lg:table-cell"
                        >
                            Delivery & Returns
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:table-cell"
                        >
                            Price
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                            Total Price
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Link</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {options.map((option) => (
                        <tr key={option.id}>
                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-200 sm:w-auto sm:max-w-none sm:pl-6">
                                {option.store}
                                <dl className="font-normal lg:hidden">
                                    <dt className="sr-only">Store</dt>
                                    <dd className="mt-1 truncate text-gray-700 dark:text-gray-300">{option.total_price}</dd>
                                    <dt className="sr-only sm:hidden">Delivery</dt>
                                    <dd className="mt-1 truncate text-gray-500 dark:text-gray-400 sm:hidden">{option.delivery_date}</dd>
                                </dl>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-400 lg:table-cell">{option.delivery_date}</td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-400 sm:table-cell">{option.price}</td>
                            <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{option.total_price}</td>
                            <td className="py-4 pl-3 pr-4 flex justify-end items-center text-sm font-medium sm:pr-6">
                                <div className={'flex justify-center items-center text-center bg-blue-500 bg-opacity-20 rounded-xl'}>
                                    <a href={option.link} className={'text-blue-500 py-1.5 px-8'}>Visit</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
