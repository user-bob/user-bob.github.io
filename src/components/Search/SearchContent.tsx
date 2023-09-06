// @ts-nocheck

import React, {ComponentProps, FC, PropsWithChildren, useState} from 'react';

import {
    DeepPartial,
    FlowbiteBoolean,
    FlowbiteNavbarRootTheme,
    Modal,
    ProductProps,
    Rating,
    useTheme
} from "@/components";
import {HiChevronRight, HiMagnifyingGlass, HiOutlineExclamationCircle} from "react-icons/hi2";
import {Combobox} from "@headlessui/react";
import {twMerge} from "tailwind-merge";
import {mergeDeep} from "@/helpers/merge-deep";
import {useSearchContext} from "@/components/Search/SearchContext";

export interface SearchPaletteInputTheme {
    base: string;
    icon: string;
}

export interface SearchPaletteResultsTheme {
    base: string;
    filtered: SearchPaletteFilteredTheme;
    recent: string;
}

export interface SearchPaletteFilteredTheme {
    base: string;
    item: FilteredItemTheme;
}

export interface SearchPaletteActiveTheme {
    base: string;
    img: string;
    title: string;
    review: ReviewTheme;
    price: string;
}

export interface ReviewTheme {
    base: string;
    rating: string;
}

export interface FilteredItemTheme {
    base: string;
    img: string;
    title: string;
    icon: string;
    active: FlowbiteBoolean,
}

export interface SearchContentProps extends PropsWithChildren, ComponentProps<'div'> {
    products: ProductProps[];
    theme?: DeepPartial<FlowbiteNavbarRootTheme>;
    recent?: ProductProps[];
}

export const SearchContent: FC<SearchContentProps> = ({
                                                          products,
                                                          recent,
                                                          className,
                                                          theme: customTheme = {},
                                                          ...props
                                                      }) => {
    const theme = mergeDeep(useTheme().theme.search, customTheme);
    const {isOpen, setIsOpen} = useSearchContext();

    const [query, setQuery] = useState("");

    const filteredProducts =
        query === ""
            ? []
            : products.filter((product) => {
                return product.title.toLowerCase().includes(query.toLowerCase());
            });

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    }
    const handleSearchClick = () => {
        if (query !== "") {
            window.location = `/search?q=${query}&page=1`;
        }
    }

    // return (
    //     <Transition.Root
    //         show={isOpen}
    //         as={Fragment}
    //         afterLeave={() => setQuery("")}
    //     >
    //         <Dialog
    //             as="div"
    //             className={theme.root.dialog}
    //             onClose={setIsOpen}
    //         >
    //             <Transition.Child
    //                 as={Fragment}
    //                 enter="ease-out duration-300"
    //                 enterFrom="opacity-0"
    //                 enterTo="opacity-100"
    //                 leave="ease-in duration-200"
    //                 leaveFrom="opacity-100"
    //                 leaveTo="opacity-0"
    //             >
    //                 <Dialog.Overlay className={theme.root.overlay}/>
    //             </Transition.Child>
    //
    //             <Transition.Child
    //                 as={Fragment}
    //                 enter="ease-out duration-300"
    //                 enterFrom="opacity-0 scale-95"
    //                 enterTo="opacity-100 scale-100"
    //                 leave="ease-in duration-200"
    //                 leaveFrom="opacity-100 scale-100"
    //                 leaveTo="opacity-0 scale-95"
    //             >
    //                 <Combobox
    //                     as="div"
    //                     className={theme.root.base}
    //                     onChange={(product) => (window.location = '/products/' + products.indexOf(product))}
    //                 >
    //                     {({activeOption}) => (
    //                         <>
    //                             <div className="relative">
    //                                 <HiMagnifyingGlass
    //                                     className={theme.input.icon}
    //                                     aria-hidden="true"
    //                                 />
    //                                 <Combobox.Input
    //                                     className={theme.input.base}
    //                                     placeholder="Search..."
    //                                     type={"search"}
    //                                     onChange={(event) => setQuery(event.target.value)}
    //                                     onKeyDown={handleSearch}
    //                                 />
    //                             </div>
    //
    //                             {(query === "" || filteredProducts.length > 0) && (
    //                                 <Combobox.Options
    //                                     as="div"
    //                                     static
    //                                     hold
    //                                     className="flex divide-x divide-gray-100 dark:divide-gray-600"
    //                                 >
    //                                     <div
    //                                         className={twMerge(
    //                                             theme.results.base,
    //                                             activeOption && "sm:h-96"
    //                                         )}
    //                                     >
    //                                         {query === "" && (
    //                                             <h2 className={theme.results.recent}>
    //                                                 Recent searches
    //                                             </h2>
    //                                         )}
    //                                         <div className={theme.results.filtered.base}>
    //                                             {(query === "" ? recent! : filteredProducts).map(
    //                                                 (product, index) => (
    //                                                     <Combobox.Option
    //                                                         as="div"
    //                                                         key={index}
    //                                                         value={product}
    //                                                         className={({active}) =>
    //                                                             twMerge(
    //                                                                 theme.results.filtered.item.base,
    //                                                                 theme.results.filtered.item.active[active ? "on" : "off"]
    //                                                             )
    //                                                         }
    //                                                     >
    //                                                         {({active}) => (
    //                                                             <>
    //                                                                 <img
    //                                                                     src={product.imgSrc}
    //                                                                     alt=""
    //                                                                     className={theme.results.filtered.item.img}
    //                                                                 />
    //                                                                 <span
    //                                                                     className={theme.results.filtered.item.title}>
    //                                                                         {product.title}
    //                                                                     </span>
    //                                                                 {active && (
    //                                                                     <HiChevronRight
    //                                                                         className={theme.results.filtered.item.icon}
    //                                                                         aria-hidden="true"
    //                                                                     />
    //                                                                 )}
    //                                                             </>
    //                                                         )}
    //                                                     </Combobox.Option>
    //                                                 )
    //                                             )}
    //                                         </div>
    //                                     </div>
    //
    //                                     {activeOption && (
    //                                         <div
    //                                             className={theme.active.base}>
    //                                             <div className="flex-none p-6 text-center">
    //                                                 <img
    //                                                     src={activeOption.imgSrc}
    //                                                     alt=""
    //                                                     className={theme.active.img}
    //                                                 />
    //                                                 <h2 className={theme.active.title}>
    //                                                     {activeOption.title}
    //                                                 </h2>
    //                                                 <div className={theme.active.review.base}>
    //                                                     <Rating>
    //                                                         {Array.from({length: 5}).map((_, i) => (
    //                                                             <Rating.Star key={i}
    //                                                                          filled={i < activeOption.reviews.rating}
    //                                                             />
    //                                                         ))}
    //                                                         {/*rating*/}
    //                                                         <span className={twMerge(theme.active.review.rating)}>
    //                                                              {activeOption.reviews.rating}
    //                                                         </span>
    //                                                     </Rating>
    //                                                 </div>
    //                                                 <p className={theme.active.price}>
    //                                                     ${activeOption.price.current}
    //                                                 </p>
    //                                                 <div
    //                                                     className="flex flex-col mt-4 justify-between flex-auto px-6">
    //                                                     <button
    //                                                         type="button"
    //                                                         className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //                                                     >
    //                                                         View Details
    //                                                     </button>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     )}
    //                                 </Combobox.Options>
    //                             )}
    //
    //                             {query !== "" && filteredProducts.length === 0 && (
    //                                 <div className="px-6 text-sm text-center py-14 sm:px-14">
    //                                     <HiOutlineExclamationCircle
    //                                         type="outline"
    //                                         name="exclamation-circle"
    //                                         className="w-6 h-6 mx-auto text-gray-400"
    //                                     />
    //                                     <p className="mt-4 font-semibold text-gray-900">
    //                                         No results found
    //                                     </p>
    //                                     <p className="mt-2 text-gray-500">
    //                                         No components found for this search term. Please try
    //                                         again.
    //                                     </p>
    //                                 </div>
    //                             )}
    //                         </>
    //                     )}
    //                 </Combobox>
    //             </Transition.Child>
    //         </Dialog>
    //     </Transition.Root>
    // );
    return (
        <Modal
            dismissible
            show={isOpen}
            onClose={setIsOpen}
            size={'3xl'}
            popup={true}
            // afterLeave={() => setQuery("")}
            // className={theme.root.dialog}
            theme={{
                root: {base: 'fixed z-50 h-full overflow-y-auto overflow-x-hidden inset-0'},
                content: {
                    base: 'relative h-full w-full p-4 h-auto'
                },
            }}
        >
            <Combobox
                as="div"
                className={theme.root.base}
                onChange={(product) => (window.location = '/products/' + products.indexOf(product))}
            >
                {({activeOption}) => (
                    <>
                        <div className="relative">
                            <HiMagnifyingGlass
                                className={theme.input.icon}
                                aria-hidden="true"
                            />
                            <Combobox.Input
                                className={theme.input.base}
                                placeholder="Search..."
                                type={"search"}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>

                        {(query === "" || filteredProducts.length > 0) && (
                            <Combobox.Options
                                as="div"
                                static
                                hold
                                className="flex divide-x divide-gray-100 dark:divide-gray-600"
                            >
                                <div
                                    className={twMerge(
                                        theme.results.base,
                                        activeOption && "sm:h-96"
                                    )}
                                >
                                    {query === "" && (
                                        <h2 className={theme.results.recent}>
                                            Recent searches
                                        </h2>
                                    )}
                                    <div className={theme.results.filtered.base}>
                                        {(query === "" ? recent! : filteredProducts).map(
                                            (product, index) => (
                                                <Combobox.Option
                                                    as="div"
                                                    key={index}
                                                    value={product}
                                                    className={({active}) =>
                                                        twMerge(
                                                            theme.results.filtered.item.base,
                                                            theme.results.filtered.item.active[active ? "on" : "off"]
                                                        )
                                                    }
                                                >
                                                    {({active}) => (
                                                        <>
                                                            <img
                                                                src={product.imgSrc}
                                                                alt=""
                                                                className={theme.results.filtered.item.img}
                                                            />
                                                            <span
                                                                className={theme.results.filtered.item.title}>
                                                                            {product.title}
                                                                        </span>
                                                            {active && (
                                                                <HiChevronRight
                                                                    className={theme.results.filtered.item.icon}
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            )
                                        )}
                                    </div>
                                </div>

                                {activeOption && (
                                    <div
                                        className={theme.active.base}>
                                        <div className="flex-none p-6 text-center">
                                            <img
                                                src={activeOption.imgSrc}
                                                alt=""
                                                className={theme.active.img}
                                            />
                                            <h2 className={theme.active.title}>
                                                {activeOption.title}
                                            </h2>
                                            <div className={theme.active.review.base}>
                                                <Rating>
                                                    {Array.from({length: 5}).map((_, i) => (
                                                        <Rating.Star key={i}
                                                                     filled={i < activeOption.reviews.rating}
                                                        />
                                                    ))}
                                                    {/*rating*/}
                                                    <span className={twMerge(theme.active.review.rating)}>
                                                                 {activeOption.reviews.rating}
                                                            </span>
                                                </Rating>
                                            </div>
                                            <p className={theme.active.price}>
                                                ${activeOption.price.current}
                                            </p>
                                            <div
                                                className="flex flex-col mt-4 justify-between flex-auto px-6">
                                                <button
                                                    type="button"
                                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Combobox.Options>
                        )}

                        {query !== "" && filteredProducts.length === 0 && (
                            <div className="px-6 text-sm text-center py-14 sm:px-14">
                                <HiOutlineExclamationCircle
                                    type="outline"
                                    name="exclamation-circle"
                                    className="w-6 h-6 mx-auto text-gray-400"
                                />
                                <p className="mt-4 font-semibold text-gray-900">
                                    No results found
                                </p>
                                <p className="mt-2 text-gray-500">
                                    No components found for this search term. Please try
                                    again.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </Combobox>
        </Modal>
    );
};
