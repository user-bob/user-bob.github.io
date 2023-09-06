import { HScroll, HScrollItem } from "@/components/HScroll";
import type { ProductProps } from "@/components/Product/Product";
import ProductComponent from "@/components/Product/Product";

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
    imgSrc: `https://picsum.photos/seed/${i}/200/300`,
    imgAlt: `Product ${i}`,
    store: stores[getRandomIntInclusive(0, stores.length - 1)],
    title: productNames[getRandomIntInclusive(0, productNames.length - 1)],
    url: "/products/" + (i + 1),
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

export default async function Home() {
  const handleItemClick = (id: string) => {
    console.log(id);
  };
  return (
    <div className={"mx-auto max-w-screen-2xl justify-center p-16"}>
      <div className={"flex flex-col items-center justify-center"}>
        <h1 className={"text-center text-4xl font-bold"}>
          Welcome to <span className={"text-blue-500"}>Price</span> Compare
        </h1>
        <p className={"text-center text-gray-500"}>Compare prices from different stores</p>
      </div>
      <div className={"flex flex-col items-center justify-center"}>
        <HScroll>
          {products.map((prod, index) => (
            <HScrollItem
              key={index}
              href={prod.url}
              className={"h-64 w-64 rounded-md overflow-hidden"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prod.imgSrc} alt={prod.imgAlt} className={"h-full w-full object-cover"} />
            </HScrollItem>
          ))}
        </HScroll>
      </div>
      <div className={"mt-16 grid w-full auto-cols-max auto-rows-max grid-cols-4 gap-6"}>
        {products.map((product, i) => (
          <ProductComponent product={product} key={i} />
        ))}
      </div>
    </div>
  );
}
