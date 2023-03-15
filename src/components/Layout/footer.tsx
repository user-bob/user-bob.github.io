import Image from "next/image";
import Link from "next/link";

const footerItems = [
  {
    id: "about",
    title: "About",
    href: "#",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    href: "#",
  },
  {
    id: "licensing",
    title: "Licensing",
    href: "#",
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a
          href="https://flowbite.com/"
          className="flex items-center mb-4 sm:mb-0"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          {footerItems.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.href} className="mr-4 hover:underline md:mr-6">
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 3{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Flowbite™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
