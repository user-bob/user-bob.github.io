"use client";

import Link from "next/link";
import { FC } from "react";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Carousel } from "../../../../src";

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

export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

Array.from({ length: 15 }).map((_, i) => {
  const current = getRandomIntInclusive(600, 900);
  const previous = getRandomIntInclusive(700, 900);
  const product: ProductProps = {
    id: i,
    imageSrc: `https://picsum.photos/seed/${i}/200/300`,
    imageAlt: `Product ${i}`,
    store: stores[getRandomIntInclusive(0, stores.length - 1)],
    title: productNames[getRandomIntInclusive(0, productNames.length - 1)],
    href: "/products/" + (i + 1),
    reviews: getRandomIntInclusive(600, 900),
    rating: getRandomIntInclusive(1, 5),
    price: {
      previous: previous,
      current: current,
      percentage: ((previous - current) / previous) * 100,
    },
    discounted: getRandomIntInclusive(0, 1) === 1,
  };
  products.push(product);
});

const MyComponent = ({ params }: { params: { slug: string } }) => {
  return (
    <div
      className={
        "relative w-full h-full mx-auto max-w-screen-2xl overflow-x-hidden overflow-y-auto"
      }
    >
      <div className={"w-full h-96 flex justify-center items-center p-8 bg-gray-100 rounded-lg"}>
        <h1 className={"text-4xl font-bold absolute z-10"}>{params.slug}</h1>
        <Carousel
          theme={{
            scrollContainer: {
              base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth 2xl:rounded-xl",
            },
          }}
        >
          {Array.from(Array(10).keys()).map((item, i) => (
            <div key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-center object-cover"
                src={`https://source.unsplash.com/featured/?${item}`}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>

      <section className={"w-full max-w-screen-2xl mx-auto px-8 mt-16"}>
        <h3 className={"text-2xl font-semibold mb-4"}>Most popular</h3>
        <div className={"w-full grid grid-flow-col-dense overflow-auto gap-4 px-4"}>
          {products.map((product, i) => (
            <Product key={i} product={product} width={64} />
          ))}
        </div>
      </section>
      <section className={"w-full max-w-screen-2xl mx-auto px-8 mt-10"}>
        <h3 className={"text-2xl font-semibold mb-4"}>Recent price drops</h3>
        <div className={"w-full grid grid-flow-col-dense overflow-auto gap-4 px-4"}>
          {products.map((product, i) => (
            <Product key={i} product={product} width={64} />
          ))}
        </div>
      </section>
      <section className={"w-full max-w-screen-2xl mx-auto px-8 mt-10"}>
        <h3 className={"text-2xl font-semibold mb-4"}>Newly added</h3>
        <div
          className={
            "w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4"
          }
        >
          {products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

interface ProductComponentProps {
  product: ProductProps;
  width?: number;
}

export interface ProductProps {
  id: number;
  title: string;
  price: PriceProps;
  store: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  categories?: string[];
  rating: number;
  reviews: number;
  availability?: string;
  badge?: string;
  discounted?: boolean;
}

export interface PriceProps {
  previous?: number;
  current: number;
  percentage?: number;
}

const Product: FC<ProductComponentProps> = ({ product, width }) => {
  return (
    <Link
      href={product.href}
      className={twMerge(
        "bg-white shadow group group border border-gray-100 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-500 dark:bg-gray-900 rounded-lg overflow-hidden",
        width ? `w-${width}` : "w-full max-w-xs",
      )}
    >
      <div className="hover:bg-gray-50 hover:dark:bg-blue-50/5">
        <div className="gap-4">
          <span className="sr-only">{product.title}</span>
          <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden aspect-w-1 aspect-h-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="w-full h-full object-center group-hover:opacity-75"
            />
          </div>
          <div className={"gap-4 p-6"}>
            <h2 className={`mb-3 line-clamp-1 text-xl font-semibold`}>{product.title} </h2>
            <div className={"flex items-center justify-between gap-4"}>
              <span className={`text-gray-500`}>Price status</span>
              <div className={"flex items-center gap-2"}>
                <span className={`text-lg font-semibold`}>12.5%</span>
                {product.discounted ? (
                  <BiTrendingDown className={"w-6 h-6 text-green-500"} />
                ) : (
                  <BiTrendingUp className={"w-6 h-6 text-red-500"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyComponent;
