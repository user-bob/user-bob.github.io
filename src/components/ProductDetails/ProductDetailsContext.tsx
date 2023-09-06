import {createContext, useContext} from 'react';

export const navs = ['3D', 'Videos', 'Images'];
export const colors = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934']

export type NavType = '3D' | 'Videos' | 'Images';

type ProductDetailsContext = {
    isIntro?: boolean;
    setIsIntro: (isOpen: boolean) => void;
    nav: NavType;
    setNav: (nav: NavType) => void;
    color: string;
    setColor: (color: string) => void;
};

export const ProductDetailsContext = createContext<ProductDetailsContext | undefined>(undefined);

export function useProductDetailsContext(): ProductDetailsContext {
    const context = useContext(ProductDetailsContext);

    if (!context) {
        throw new Error('useProductDetailsContext should be used within the NavbarContext provider!');
    }

    return context;
}
