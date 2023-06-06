import React from 'react';
import classNames from "@/utils/class-names";

interface Props {
    item: any;
    className?: string;
}

const CategoryItem = ({item, className}: Props) => {
    return (
        <div className={classNames(className ?? '', item.index % 4 == 0
                ? 'sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2'
                : 'sm:relative sm:aspect-none sm:h-full',
            'group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden'
        )}>
            <img
                src={item.src}
                alt={item.alt}
                className={classNames(item.index % 4 == 0
                        ? ''
                        : 'sm:absolute sm:inset-0 sm:w-full sm:h-full',
                    'object-cover group-hover:opacity-75'
                )}
            />
            <div
                aria-hidden="true"
                className={classNames(item.index % 4 == 0
                        ? ''
                        : 'sm:absolute sm:inset-0',
                    'bg-gradient-to-b from-transparent to-black opacity-50'
                )}
            />
            <div
                className={classNames(item.index % 4 == 0
                        ? ''
                        : "sm:absolute sm:inset-0",
                    "p-6 flex items-end"
                )}>
                <div>
                    <h3 className="font-semibold text-white">
                        <a href="#">
                            <span className="absolute inset-0"/>
                            {item.title}
                        </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;
