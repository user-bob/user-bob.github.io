export interface Ebay {
    href: string;
    total: number;
    next: string;
    limit: number;
    offset: number;
    itemSummaries: ItemSummary[];
}

export interface ItemSummary {
    itemId: string;
    title: string;
    image: Image;
    price: Price;
    itemHref: string;
    seller: Seller;
    itemGroupHref: string;
    itemGroupType: string;
    leafCategoryIds: string[];
    categories: Category[];
    condition: string;
    conditionId: string;
    thumbnailImages: Image[];
    shippingOptions: ShippingOption[];
    buyingOptions: string[];
    itemAffiliateWebUrl: string;
    itemWebUrl: string;
    itemLocation: ItemLocation;
    additionalImages: Image[];
    adultOnly: boolean;
    legacyItemId: string;
    availableCoupons: boolean;
    itemCreationDate: string;
    topRatedBuyingExperience: boolean;
    priorityListing: boolean;
    listingMarketplaceId: string;
    marketingPrice?: MarketingPrice;
    epid?: string;
    currentBidPrice?: Price;
}

export interface Image {
    imageUrl: string;
}

export interface Price {
    value: string;
    currency: string;
}

export interface Seller {
    username: string;
    feedbackPercentage: string;
    feedbackScore: number;
}

export interface Category {
    categoryId: string;
    categoryName?: string;
}

export interface ShippingOption {
    shippingCostType: string;
    shippingCost: Price;
}

export interface ItemLocation {
    postalCode: string;
    country: string;
}

export interface MarketingPrice {
    originalPrice: Price;
    discountPercentage: number;
    discountAmount: Price;
}