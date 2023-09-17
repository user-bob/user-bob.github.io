"use client";

import { HiCheck, HiGift, HiHandThumbUp, HiUser } from "react-icons/hi2";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { BiSolidCoupon } from "react-icons/bi";
import { RiProductHuntFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { getRandomIntInclusive } from "@/helpers/range";

const contents = [
  {
    name: "Gifts",
    icon: HiGift,
    href: "/profile/gifts",
    value: 20,
    price: 3,
    color: "fill-sky-300",
    textGradient: {
      from: "from-sky-300",
      via: "via-sky-500",
      to: "to-indigo-500",
    },
    hoverBorder: {
      color: "hover:border-sky-400 dark:hover:border-sky-300",
    },
  },
  {
    name: "Points",
    icon: RiProductHuntFill,
    href: "/profile/points",
    value: 700,
    price: 5,
    color: "fill-purple-500",
    textGradient: {
      from: " from-pink-500",
      via: "via-purple-500",
      to: "to-violet-500",
    },
    hoverBorder: {
      color: "hover:border-purple-600 dark:hover:border-purple-500",
    },
  },
  {
    name: "Coupons",
    icon: BiSolidCoupon,
    href: "/profile/coupons",
    value: 20,
    price: 20,
    color: "fill-cyan-500",
    textGradient: {
      from: "from-cyan-400",
      via: "via-cyan-500",
      to: "to-blue-500",
    },
    hoverBorder: {
      color: "hover:border-cyan-500 dark:hover:border-cyan-500",
    },
  },
];

// export function getRandomIntInclusive(min: number, max: number): number {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

export interface CouponsGiftsPointsProps {
  name: string;
  icon: IconType;
  href: string;
  value: number;
  price: number;
  color: string;
  textGradient: {
    from: string;
    via: string;
    to: string;
  };
  hoverBorder: {
    color: string;
  };
}

const profile = {
  name: "John Doe",
  image: "/images/products/room.jpeg",
  createdAt: "June 10, 2021",
};
const eventTypes = [
  { icon: HiUser, bgColorClass: "bg-gray-400" },
  { icon: HiHandThumbUp, bgColorClass: "bg-blue-500" },
  { icon: HiCheck, bgColorClass: "bg-green-500" },
];
const categories = [
  { name: "Electronics", href: "#", image: "/images/products/room.jpeg" },
  { name: "Home Appliances", href: "#", image: "/images/products/room.jpeg" },
  { name: "Phones & Tablets", href: "#", image: "/images/products/room.jpeg" },
  { name: "Computers", href: "#", image: "/images/products/room.jpeg" },
  { name: "TV & Audio", href: "#", image: "/images/products/room.jpeg" },
  { name: "Gaming", href: "#", image: "/images/products/room.jpeg" },
  { name: "Cameras", href: "#", image: "/images/products/room.jpeg" },
];
const providers = [
  {
    name: "Facebook",
    image: "/svgs/social/facebook.svg",
    lastLoggedIn: "2 days ago",
  },
  {
    name: "Google",
    image: "/svgs/social/google.svg",
    lastLoggedIn: "2 days ago",
  },
  {
    name: "Twitter",
    image: "/svgs/social/twitter.svg",
    lastLoggedIn: "2 days ago",
  },
  {
    name: "GitHub",
    image: "/svgs/social/github.svg",
    lastLoggedIn: "2 days ago",
  },
];
const history: TimelineType[] = [
  {
    icon: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["icon"],
    bgColorClass: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["bgColorClass"],
    content: "Your $100.00 order for",
    target: "Ipad pro 11 inch 2020 128GB Wifi Space Gray (MY232)",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    icon: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["icon"],
    bgColorClass: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["bgColorClass"],
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    icon: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["icon"],
    bgColorClass: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["bgColorClass"],
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    icon: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["icon"],
    bgColorClass: eventTypes[getRandomIntInclusive(0, eventTypes.length - 1)]["bgColorClass"],
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
];
const ProfilePage: FC = () => {
  return (
    <div className="relative px-6 mx-auto max-w-screen-2xl sm:px-8">
      <BgImage />
      <div
        aria-hidden="true"
        className={twMerge(
          "absolute -z-10 h-56 inset-x-0 left-1/2 transform -mt-16 -translate-x-1/2 w-full overflow-hidden inset-y-0",
        )}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="h-full w-full bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-500" />
        </div>
      </div>
      <div className="space-y-8 py-10 max-w-7xl mx-auto">
        <div className={"flex items-center justify-center flex-col mt-6"}>
          <div className={"bg-white p-1 rounded-full"}>
            <Image
              className={"rounded-full w-40 h-40"}
              width={160}
              height={160}
              src={profile.image}
              alt={"Profile Image"}
            />
          </div>
          <div className={"mt-4 text-center"}>
            <h3 className={"text-3xl font-semibold text-gray-900 dark:text-gray-100"}>
              {profile.name}
            </h3>
            <p className={"text-base text-gray-500"}>Created at {profile.createdAt}</p>
          </div>
        </div>
        <div className={"grid lg:grid-cols-3 sm:grid-cols-2 gap-8"}>
          {/* <div className={"flex"}> */}
          {contents.map((content, i) => (
            <GlassCard key={i} content={content} />
          ))}
        </div>
        <div className={"grid lg:grid-cols-3 sm:grid-cols-2 gap-8"}>
          <ProvidersDetails providers={providers} />
          <AccountDetails name={"John Doe"} email={"example@email.com"} />
          <OrderHistory histories={history} name={"Order history"} />
        </div>
        <div id={"interested-categories"} className={"py-6 flex flex-col space-y-4"}>
          <div className={"flex items-center justify-between"}>
            <h3 className={"text-2xl font-semibold text-gray-900 dark:text-gray-100"}>
              Categories
            </h3>
            {categories.length > 6 && (
              <Link
                href={"/categories"}
                className={"text-sm group text-gray-500 hover:text-gray-900 dark:text-gray-400"}
              >
                See all{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </Link>
            )}
          </div>
          <div
            className={
              "grid justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
            }
          >
            {categories
              .filter((_, i) => i < 6)
              .map((category, i) => (
                <Category key={i} {...category} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const BgImage = () => (
  <div className="absolute inset-x-0 top-[2rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[0.1rem]">
    <svg
      className="relative left-1/2 -z-10 h-[28rem] max-w-none -translate-x-1/3 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
      viewBox="0 0 1155 678"
    >
      <path
        fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
        fillOpacity=".3"
        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
      />
      <defs>
        <linearGradient
          id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
          x1="1155.49"
          x2="-78.208"
          y1=".177"
          y2="474.645"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9089FC" />
          <stop offset={1} stopColor="#FF80B5" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Category = ({ name, href, image }: { name: string; href: string; image: string }) => {
  return (
    <div className="relative group flex items-center justify-center w-full h-full max-w-sm overflow-hidden bg-gray-100 rounded-lg shadow-md dark:bg-neutral-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="object-cover w-full h-full transition duration-300 ease-in-out transform scale-100 rounded-lg group-hover:scale-105 group-hover:opacity-75"
      />
      <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        <a
          href={href}
          className="text-lg font-bold tracking-wider text-white uppercase text-center"
        >
          {name}
          <span className="absolute inset-0" />
        </a>
      </div>
    </div>
  );
};

interface DetailsCardProps extends PropsWithChildren<ComponentProps<"div">> {
  title: string;
  description: string;
}

const DetailsCard: FC<DetailsCardProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <div className="relative max-w-sm w-full bg-gray-50 dark:bg-slate-900 mx-auto border border-gray-300/50 dark:border-white/10 overflow-hidden rounded-lg shadow-lg p-4">
      <div className="space-y-1">
        {/*   title */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {/*   description */}
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        {/*   children */}
      </div>
      <div className={"mt-6"}>{children}</div>
    </div>
  );
};

interface ProvidersDetailsProps {
  providers: {
    name: string;
    image: string;
    lastLoggedIn: string;
  }[];
}

const ProvidersDetails: FC<ProvidersDetailsProps> = ({ providers }) => {
  return (
    <DetailsCard
      title={"Providers"}
      description={"This is the List of Providers you have logged in with"}
    >
      <div className={"flex flex-col space-y-4"}>
        {providers.map((provider, i) => (
          <div key={i} className={"flex items-center justify-between"}>
            <div className={"flex items-center gap-4"}>
              <div className={"bg-white p-1 rounded-full"}>
                <Image
                  className={"rounded-full w-12 h-12"}
                  width={48}
                  height={48}
                  // src={"/images/products/room.jpeg"}
                  src={provider.image}
                  alt={"Profile Image"}
                />
              </div>
              <div className={"flex flex-col"}>
                <h3 className={"text-lg font-semibold text-gray-900 dark:text-gray-100"}>
                  {provider.name}
                </h3>
                <p className={"text-sm text-gray-500 dark:text-gray-400"}>
                  Last logged in {provider.lastLoggedIn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DetailsCard>
  );
};

interface AccountDetailsProps {
  name: string;
  email: string;
  emailVerified?: boolean;
  location?: string;
  language?: string;
  currency?: string;
}

const AccountDetails: FC<AccountDetailsProps> = ({
  name,
  email,
  emailVerified = false,
  location = "USA",
  language = "English",
  currency = "USD",
}) => {
  return (
    <DetailsCard title={"Account Details"} description={"This is your Account Details"}>
      <div className={"flex flex-col space-y-4"}>
        <div className={"flex items-center"}>
          <span className={"text-gray-500 dark:text-gray-400"}>Email :</span>
          <span className={"pl-3 text-gray-900 dark:text-gray-100 font-medium"}>{email}</span>
        </div>
        <div className={"flex items-center"}>
          <span className={"text-gray-500 dark:text-gray-400"}>Email Status :</span>
          <span className={"pl-3 text-gray-900 dark:text-gray-100 font-medium"}>
            {emailVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <div className={"flex items-center"}>
          <span className={"text-gray-500 dark:text-gray-400"}>Location :</span>
          <span className={"pl-3 text-gray-900 dark:text-gray-100 font-medium"}>{location}</span>
        </div>
        <div className={"flex items-center"}>
          <span className={"text-gray-500 dark:text-gray-400"}>Language :</span>
          <span className={"pl-3 text-gray-900 dark:text-gray-100 font-medium"}>{language}</span>
        </div>
        <div className={"flex items-center"}>
          <span className={"text-gray-500 dark:text-gray-400"}>Currency :</span>
          <span className={"pl-3 text-gray-900 dark:text-gray-100 font-medium"}>{currency}</span>
        </div>
      </div>
    </DetailsCard>
  );
};

export default ProfilePage;

interface GlassCardProps {
  content: CouponsGiftsPointsProps;
}

const GlassCard: FC<GlassCardProps> = ({
  content: { name, icon: Icon, href, value, price, color, textGradient, hoverBorder },
}) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      href={href}
      id={name.toLowerCase()}
      className={twMerge(
        "bg-opacity-25 backdrop-blur-lg p-6 bg-white dark:bg-gray-900 dark:bg-opacity-20 shadow-lg",
        "border border-gray-300/50 dark:border-white/20 rounded-lg space-y-4 group overflow-hidden max-w-sm mx-auto w-full",
        hoverBorder.color,
      )}
    >
      <div className={"flex items-center gap-4"}>
        <span className="sr-only">{name}</span>
        <Icon className={twMerge("w-12 h-12", color)} />
        <h2 className={`text-xl font-semibold`}>
          {name}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </div>
      {/*Content Value */}
      <div className={"flex items-center"}>
        <span className="sr-only">{value}</span>
        <h2
          className={twMerge(
            `text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r`,
            textGradient.from,
            textGradient.via,
            textGradient.to,
          )}
        >
          {value} {name}
        </h2>
      </div>
      {/*Content price in USD*/}
      <h2 className={`text-2xl font-semibold`}>worth ${price}</h2>

      {/*    Earn more */}
      <div className={"flex items-center justify-between pt-6"}>
        <p className={`text-sm text-gray-900 dark:text-white opacity-50`}>Earn more {name}</p>
        <button
          className={twMerge(
            "bg-gradient-to-r px-6 py-1.5 rounded-lg text-white font-semibold",
            textGradient.from,
            textGradient.via,
            textGradient.to,
          )}
        >
          Earn
        </button>
      </div>
    </motion.a>
  );
};

type TimelineType = {
  icon: IconType;
  bgColorClass: string;
  content: string;
  target: string;
  date: string;
  datetime: string;
};

interface OrderHistoryProps {
  histories: TimelineType[];
  name: string;
}

const OrderHistory: FC<OrderHistoryProps> = ({ histories, name }) => (
  <div className="p-6 shadow-lg rounded-lg mx-auto max-w-sm border border-gray-300/50 dark:border-white/10 bg-gray-50 dark:bg-slate-900">
    <h2 id="timeline-title" className="text-lg font-medium text-gray-900 dark:text-white">
      {name}
    </h2>

    {/* Activity Feed */}
    <div className="flow-root mt-6">
      <ul role="list" className="-mb-8">
        {histories.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="relative pb-8">
              {itemIdx !== histories.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={twMerge(
                      item.bgColorClass,
                      "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800",
                    )}
                  >
                    <item.icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.content}{" "}
                      <a href="#" className="font-medium text-gray-900 dark:text-gray-100">
                        {item.target}
                      </a>
                    </p>
                  </div>
                  <div className="text-sm text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    <time dateTime={item.datetime}>{item.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
