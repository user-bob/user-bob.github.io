import CategoryItem from "@/components/item/category-item";

export default function Categories() {
    const categories = [
        'Clothes',
        'Shoes',
        'Accessories',
        'Bags',
        'Watches',
        'Jewelry',
        'Beauty',
        'Home',
        'Electronics',
        'Toys',
        'Books',
    ]
    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">All Categories</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 sm:grid-rows-7 sm:gap-x-6 lg:gap-8">
                {
                    categories.map((category, i) => (
                        <CategoryItem key={i} item={{
                            src: `https://source.unsplash.com/featured/?${category}`,
                            alt: category,
                            title: category,
                            index: i
                        }}/>
                    ))
                }

            </div>
        </div>
    )
}