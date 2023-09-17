"use client";

import { FC, Fragment } from "react";

import { LoginHandler } from "@/components/Login/LoginHandler";
import { useNavbarContext } from "@/components/Navbar/NavbarContext";
import { ContentType, NavbarPopover } from "@/components/Navbar/NavbarPopover";
import { NavbarUser } from "@/components/Navbar/NavbarUser";
import { useSearchContext } from "@/components/Search/SearchContext";
import ThemeSwitcher from "@/components/Switcher/Switcher";
import { Dialog, Transition } from "@headlessui/react";
import { HiArrowSmRight, HiChevronDown, HiTable } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import { NotificationsComponent, ProductProps, Search, Sidebar } from "../../../src";
import { getRandomIntInclusive } from "@/helpers/range";

const categories: ContentType[] = [
	{
		title: "Shop",
		featured: [
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
		],
		sections: [
			{
				title: "Offers",
				links: [
					{title: "All offers", href: "#"},
					{title: "Mobile Offers", href: "#"},
					{title: "Television Offers", href: "#"},
					{title: "Laptop & Computing Offers", href: "#"},
					{title: "Home Appliances Offers", href: "#"},
					{title: "Galaxy Gifts", href: "#"},
					{title: "Business Offers", href: "#"},
				],
			},
			{
				title: "Why buy from Samsung",
				links: [
					{title: "Overview", href: "#"},
					{title: "Pay with Samsung Finance", href: "#"},
					{title: "Price Promise", href: "#"},
					{title: "Phone Contracts", href: "#"},
					{title: "Pay with Klarna", href: "#"},
					{title: "Pay with PayPal", href: "#"},
					{title: "Trade Up", href: "#"},
					{title: "Trade In", href: "#"},
				],
			},
		],
	},
	{
		title: "Mobile",
		featured: [
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
		],
		sections: [
			{
				title: "Discover Mobiles",
				links: [
					{title: "Smartphones", href: "#"},
					{title: "Tablets", href: "#"},
					{title: "Galaxy Book & Laptops", href: "#"},
					{title: "Watches", href: "#"},
					{title: "Galaxy Buds", href: "#"},
					{title: "Accessories", href: "#"},
				],
			},
			{
				title: "New & Featured",
				links: [
					{title: "Galaxy S21 Ultra 5G", href: "#"},
					{title: "Galaxy S21 | S21+ 5G", href: "#"},
					{title: "Galaxy Book3 Ultra", href: "#"},
					{title: "Galaxy Tab S8 Ultra", href: "#"},
				],
			},
		],
	},
	{
		title: "TV & AV",
		featured: [
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
		],
		sections: [
			{
				title: "Recommended",
				links: [
					{title: "Help choose my TV", href: "#"},
					{title: "Why Neo QLED", href: "#"},
					{title: "Why Samsung OLED", href: "#"},
					{title: "TV buying guide", href: "#"},
					{title: "Discover Dolby Atmos", href: "#"},
					{title: "TV Trade Up", href: "#"},
				],
			},
			{
				title: "TVs",
				links: [
					{title: "Discover TVs", href: "#"},
					{title: "Neo QLED", href: "#"},
					{title: "QLED", href: "#"},
					{title: "OLED", href: "#"},
					{title: "The Frame", href: "#"},
					{title: "4K TVs", href: "#"},
					{title: "All TVs", href: "#"},
				],
			},
			{
				title: "Projectors",
				links: [
					{title: "Discover Projectors", href: "#"},
					{title: "The Premiere", href: "#"},
					{title: "The Freestyle", href: "#"},
					{title: "Projector Accessories", href: "#"},
					{title: "Help choose my TV", href: "#"},
					{title: "All Projectors", href: "#"},
				],
			},
			{
				title: "Sound Devices",
				links: [
					{title: "Discover Sound Devices", href: "#"},
					{title: "Q-series Soundbars", href: "#"},
					{title: "Ultra Slim Soundbars", href: "#"},
					{title: "Sound Towers", href: "#"},
					{title: "Audio Accessories", href: "#"},
					{title: "All Sound Devices", href: "#"},
				],
			},
		],
	},
	{
		title: "Home Appliances",
		featured: [
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
		],
		sections: [
			{
				title: "Recommended",
				links: [
					{title: "Discover Bespoke Home", href: "#"},
					{title: "Customise Your Bespoke Package", href: "#"},
					{title: "Discover Home Appliances", href: "#"},
					{title: "Energy savings tool", href: "#"},
					{title: "Home Appliance Buying Guide", href: "#"},
					{title: "SmartThings Home", href: "#"},
				],
			},
			{
				title: "Refrigerators",
				links: [
					{title: "All Refrigerators", href: "#"},
					{title: "BESPOKE Refrigerators", href: "#"},
					{title: "Integrated Refrigerators", href: "#"},
					{title: "Fridge Freezer Accessories", href: "#"},
					{title: "Refrigeration Buying Guide", href: "#"},
					{title: "Discover Refrigerators", href: "#"},
				],
			},
			{
				title: "Laundry",
				links: [
					{title: "All Laundry", href: "#"},
					{title: "BESPOKE AIᵀᴹ Laundry", href: "#"},
					{title: "Tumble Dryers", href: "#"},
					{title: "AirDresser", href: "#"},
					{title: "Laundry Appliance Buying Guide", href: "#"},
					{title: "Discover Laundry", href: "#"},
				],
			},
			{
				title: "Vacuum Cleaners",
				links: [
					{title: "All Vacuum Cleaners", href: "#"},
					{title: "BESPOKE Jet™ Stick Vacuums", href: "#"},
					{title: "Vacuum Cleaner Buying Guide", href: "#"},
					{title: "Discover Vacuum Cleaners", href: "#"},
				],
			},
			{
				title: "Cooking Appliances",
				links: [
					{title: "All Cooking Appliances", href: "#"},
					{title: "Hoods", href: "#"},
					{title: "Microwaves", href: "#"},
					{title: "Discover Cooking Appliances", href: "#"},
				],
			},
			// {
			//   title: "Dishwashers",
			//   links: [
			//     { title: "All Dishwashers", href: "#" },
			//     { title: "Built- in Dishwashers", href: "#" },
			//     { title: "Freestanding Dishwashers", href: "#" },
			//     { title: "Discover Dishwashers", href: "#" },
			//     { title: "All Air Conditioners", href: "#" },
			//     { title: "All Heat Pumps", href: "#" },
			//   ],
			// },
		],
	},
	{
		title: "Computing",
		featured: [
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
		],
		sections: [
			{
				title: "Recommended",
				links: [{title: "Monitor Trade Up", href: "#"}],
			},
			{
				title: "Galaxy Book & Laptops",
				links: [
					{title: "Discover Galaxy Book", href: "#"},
					{title: "Galaxy Book3 Ultra", href: "#"},
					{title: "All Laptops", href: "#"},
					{title: "Compare", href: "#"},
					{title: "Help Me Choose", href: "#"},
				],
			},
			{
				title: "Galaxy Book By Size",
				links: [
					{title: '15.6" - 16.0"', href: "#"},
					{title: "13.0'' - 14.9''", href: "#"},
					{title: "11.0'' - 12.9''", href: "#"},
					{title: "All Galaxy Book By Size", href: "#"},
				],
			},
			{
				title: "Computer Monitors",
				links: [
					{title: "Discover Computer Monitors", href: "#"},
					{title: "Gaming Monitor", href: "#"},
					{title: "Curved Monitor", href: "#"},
					{title: "Business", href: "#"},
					{title: "All Computer Monitors", href: "#"},
				],
			},
			{
				title: "Memory & Storage",
				links: [
					{title: "Discover Memory & Storage", href: "#"},
					{title: "NVME SSD", href: "#"},
					{title: "SATA SSD", href: "#"},
					{title: "Memory Cards", href: "#"},
					{title: "USB Flash Drive", href: "#"},
					{title: "All Memory & Storage", href: "#"},
				],
			},
		],
	},
	{
		title: "Displays",
		featured: [
			{
				title: "Galaxy S21 Ultra 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
				imageAlt: "Models sitting back to back, wearing Basic Tee in black and bone.",
			},
			{
				title: "Galaxy S21 | S21+ 5G",
				href: "#",
				imageSrc: "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
				imageAlt: "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
			},
		],
		sections: [
			{
				title: "Monitors",
				links: [
					{title: "Discover Monitors", href: "#"},
					{title: "Smart Monitor", href: "#"},
					{title: "Business", href: "#"},
					{title: "All Monitors", href: "#"},
				],
			},
			{
				title: "For Business",
				links: [
					{title: "Discover Commercial TVs", href: "#"},
					{title: "SMART Signage", href: "#"},
					{title: "LED Signage", href: "#"},
					{title: "Commercial TVs", href: "#"},
					{title: "Monitors", href: "#"},
				],
			},
		],
	},
];

const products: ProductProps[] = [];

const stores = [
	"Amazon",
	"Walmart",
	"Target",
	"Best Buy",
	"GameStop",
	"Home Depot",
	"Newegg",
	"B&H Photo",
	"Ali Express",
];

const types = ["order", "message", "review", "other"];

const productNames = [
	"Apple iPhone 12 Pro Max",
	"Apple iPhone 12 Pro",
	"Samsung Galaxy S21 Ultra",
	"Samsung Galaxy S21+",
	"Google Pixel 5",
	"Google Pixel 4a",
	"OnePlus 8 Pro",
	"OnePlus 8",
	"Apple Watch Series 6",
	"Apple Watch SE",
	"Samsung Galaxy Watch 3",
	"Samsung Galaxy Watch Active 2",
	"Apple iPad Pro 12.9",
	"Apple iPad Pro 11",
	"Samsung Galaxy Tab S7+",
];

const notifications: any[] = [];

// export function getRandomIntInclusive(min: number, max: number): number {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

Array.from({length: 15}).map((_, i) => {
	const current = getRandomIntInclusive(600, 900);
	const previous = getRandomIntInclusive(700, 900);
	const product: ProductProps = {
		imgSrc: `https://picsum.photos/seed/${i}/200/300`,
		imgAlt: `Product ${i}`,
		store: stores[getRandomIntInclusive(0, stores.length - 1)],
		title: productNames[getRandomIntInclusive(0, productNames.length - 1)],
		url: "#",
		reviews: {
			rating: getRandomIntInclusive(1, 5),
			total: getRandomIntInclusive(600, 900),
		},
		price: {
			previous: previous,
			current: current,
			percentage: ((previous - current) / previous) * 100,
		},
	};
	products.push(product);
});

Array.from({length: 5}).map((_, i) => {
	notifications.push({
		id: i.toString(),
		type: types[getRandomIntInclusive(0, types.length - 1)],
		message: `You have a new order for ${
			productNames[getRandomIntInclusive(0, productNames.length - 1)]
		}`,
		time: `${getRandomIntInclusive(1, 12)} hours ago`,
		store: stores[getRandomIntInclusive(0, stores.length - 1)],
		product: products[getRandomIntInclusive(0, products.length - 1)],
	});
});

const recent = [products[4], products[1]];

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

export const NavbarPopovers: FC = () => {
	const {isSearchPage} = useSearchContext();
	return (
		<div
			className={twMerge(
				"hidden",
				isSearchPage ? "xl:grid xl:grid-flow-col" : "lg:grid lg:grid-flow-col",
			)}
		>
			{categories.map((category, index) => (
				<NavbarPopover key={index} content={category} />
			))}
		</div>
	);
};

export const NavbarIcons: FC = () => {
	return (
		<div className="flex items-center gap-4">
			{/*<Search paletteOpen={false}>*/}
			<Search.Handler />
			<Search.Content products={products} recent={recent} />
			{/*</Search>*/}
			<NotificationsComponent notifications={notifications} />
			<ThemeSwitcher />
			<NavbarUser />
		</div>
	);
};

export const MobileSidebar: FC = () => {
	const {isOpen, setIsOpen} = useNavbarContext();
	const {isSearchPage} = useSearchContext();
	return (
		<Transition.Root show={isOpen ?? false} as={Fragment}>
			<Dialog
				as="div"
				className={twMerge("fixed inset-0 flex z-40", isSearchPage ? "xl:hidden" : "lg:hidden")}
				onClose={setIsOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>
				
				<Transition.Child
					as={Fragment}
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div className="relative max-w-xs w-full">
						{/* Links */}
						<Sidebar
							aria-label="Sidebar with multi-level dropdown example"
							className={"w-full min-h-screen shadow-xl overflow-y-auto"}
						>
							<Sidebar.Items>
								<Sidebar.ItemGroup>
									<div className="p-2 flex">
										<button
											type="button"
											className="-m-2items-center justify-center p-2 rounded-md inline-flex text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700/30"
											onClick={() => setIsOpen(false)}
										>
											<span className="sr-only">Close menu</span>
											<HiXMark className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
									
									{categories.map((category, index) => (
										<Sidebar.Collapse label={category.title} key={index} open={index === 0}>
											<div className="grid grid-cols-2 gap-x-4 gap-y-10">
												{category.featured?.map((item) => (
													<div key={item.title} className="group relative">
														<div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
															{/* eslint-disable-next-line @next/next/no-img-element */}
															<img
																src={item.imageSrc}
																alt={item.imageAlt}
																className="object-center object-cover"
															/>
														</div>
														<a
															href={item.href}
															className="mt-6 block text-sm font-medium text-gray-900 dark:text-white"
														>
															<span className="absolute z-10 inset-0"
															      aria-hidden="true" />
															{item.title}
														</a>
														<p
															aria-hidden="true"
															className="mt-1 text-sm text-gray-500 dark:text-gray-400"
														>
															Shop now
														</p>
													</div>
												))}
											</div>
										</Sidebar.Collapse>
									))}
									<div className={"py-6"}>
										<MobileSidebarLoginButtons />
									</div>
									<div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4 space-y-6">
										{/* Currency selector */}
										<form>
											<div className="inline-block">
												<label htmlFor="mobile-currency" className="sr-only">
													Currency
												</label>
												<div className="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white dark:focus-within:ring-gray-600">
													<select
														id="mobile-currency"
														name="currency"
														className="bg-white dark:bg-gray-600 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-100 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
													>
														{currencies.map((currency) => (
															<option key={currency}>{currency}</option>
														))}
													</select>
													<div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
														<HiChevronDown className={"h-5 w-5 text-gray-500 dark:text-gray-400"} />
													</div>
												</div>
											</div>
										</form>
									</div>
								</Sidebar.ItemGroup>
							</Sidebar.Items>
						</Sidebar>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
};

const MobileSidebarLoginButtons: FC = () => (
	<div className="border-t border-gray-200 dark:border-gray-700 pt-6">
		<Sidebar.Item href="#" icon={HiArrowSmRight}>
			<LoginHandler className={"w-full text-left"} />
		</Sidebar.Item>
		<Sidebar.Item href="#" icon={HiTable}>
			<LoginHandler text={"Create an account"} className={"w-full text-left"} />
		</Sidebar.Item>
	</div>
);
