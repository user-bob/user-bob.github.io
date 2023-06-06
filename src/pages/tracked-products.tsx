import React from 'react';
import {useSession} from "next-auth/react";

const TrackedProducts = () => {
    const {data:session} = useSession()

    if (!session) {
        return (
            <div className={`justify-center h-screen items-center flex`}>
                <h1 className={`text-4xl font-bold text-gray-800 dark:text-gray-200`}>Please login to track an Item</h1>
            </div>
        );
    }

    return (
        <div className={`w-screen min-h-full`}>
            <div className={`justify-center items-center flex`}>
                <h1 className={`text-4xl font-bold`}>Tracked Items</h1>
            </div>
        </div>
    );
};

export default TrackedProducts;