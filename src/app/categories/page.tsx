import { FC } from "react";

const main_categories = [
  {
    title: "Mobile",
    sub_categories: [
      {
        name: "Discover",
        cate: ["Smartphones", "Tablets", "Mobile Accessories", "Accessories"],
      },
    ],
  },
  {
    title: "TV & AV",
    sub_categories: [
      {
        name: "TVs",
        cate: ["4K", "Smart TV", "LED", "OLED", "QLED"],
      },
      {
        name: "Sound Devices",
        cate: ["Soundbars", "Speakers", "Home Theaters", "Headphones"],
      },
      {
        name: "Projectors",
        cate: ["Projectors", "Projector Screens", "Projector Accessories"],
      },
    ],
  },
  {
    title: "Home Appliances",
    sub_categories: [
      {
        name: "Kitchen Appliances",
        cate: ["Refrigerators", "Microwaves", "Dishwashers", "Cooking Ranges", "Cooktops"],
      },
      {
        name: "Washing Machines",
        cate: ["Washing Machines", "Dryers", "Washer Dryers", "Washing Machine Accessories"],
      },
      {
        name: "Air Conditioners",
        cate: ["Split ACs", "Window ACs", "Portable ACs", "Air Purifiers", "Air Coolers"],
      },
      {
        name: "Small Home Appliances",
        cate: [
          "Irons",
          "Vacuum Cleaners",
          "Water Purifiers",
          "Fans",
          "Air Coolers",
          "Air Purifiers",
        ],
      },
    ],
  },
  {
    title: "Computing",
    sub_categories: [
      {
        name: "Laptops",
        cate: [
          "Gaming Laptops",
          "Business Laptops",
          "Student Laptops",
          "2-in-1 Laptops",
          "Touchscreen Laptops",
          "Laptop Accessories",
        ],
      },
      {
        name: "Desktops",
        cate: [
          "Gaming Desktops",
          "Business Desktops",
          "All-in-One Desktops",
          "Mini PCs",
          "Desktop Accessories",
        ],
      },
      {
        name: "Monitors",
        cate: [
          "Gaming Monitors",
          "Business Monitors",
          "Touchscreen Monitors",
          "Curved Monitors",
          "Monitor Accessories",
        ],
      },
      {
        name: "Printers & Scanners",
        cate: ["Printers", "Scanners", "Printer & Scanner Accessories"],
      },
      {
        name: "Memory & Storage",
        cate: ["SSDs", "HDDs", "RAMs", "Memory Cards", "Pen Drives", "External Hard Drives"],
      },
    ],
  },
];

export default function Categories() {
  return (
    <div className="max-w-screen-2xl mx-auto pt-4 pb-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl text-center font-extrabold text-gray-900 dark:text-gray-100">
        All Categories
      </h2>
      <div className={"flex space-x-8 justify-center mt-16"}>
        {/* sidebar */}
        <div className={"w-1/4"}>
          <div className={"grid gap-8 sticky top-8"}>
            {main_categories.map((category, i) => (
              <div key={i}>
                {
                  <>
                    <h3 className={"text-2xl py-3 font-medium text-gray-900 dark:text-gray-100"}>
                      {category.title}
                    </h3>
                    {category.sub_categories.map((sub_category, i) => (
                      <div key={i}>
                        <h3
                          className={"text-lg py-1.5 font-medium text-gray-900 dark:text-gray-100"}
                        >
                          {sub_category.name}
                        </h3>
                      </div>
                    ))}
                  </>
                }
              </div>
            ))}
          </div>
        </div>
        {/* main content */}
        <div className={"grid gap-8 w-3/4"}>
          {main_categories.map((category, i) => (
            <div key={i}>
              {category.sub_categories.map((sub_category, i) => (
                <div key={i} className={"mt-6"}>
                  <h3 className={"text-2xl py-3 font-medium text-gray-900 dark:text-gray-100"}>
                    {sub_category.name}
                  </h3>
                  <CategoryItems items={sub_category.cate} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CategoryItems = ({ items }: { items: string[] }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 sm:grid-rows-2 lg:gap-6">
      {items.map((item, index) => (
        <div key={index} className="grid odd:row-span-2 grid-rows-[masonry] col-span-2  gap-y-3">
          <CategoryItem item={item} />
        </div>
      ))}
    </div>
  );
};

interface Item {
  item: string;
}

const CategoryItem: FC<Item> = ({ item }: { item: string }) => (
  <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`https://source.unsplash.com/featured/?${item}`}
      alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
      className="object-center object-cover group-hover:opacity-75"
    />
    <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
    <div className="p-6 flex items-end">
      <div>
        <h3 className="font-semibold text-white">
          <a href={`/categories/${item}`}>
            <span className="absolute inset-0" />
            {item}
          </a>
        </h3>
        <p aria-hidden="true" className="mt-1 text-sm text-white">
          Shop now
        </p>
      </div>
    </div>
  </div>
);
