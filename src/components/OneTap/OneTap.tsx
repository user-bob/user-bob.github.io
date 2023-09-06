'use client';

import {OneTapContext} from "@/components/OneTap/OneTapContext";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import OneTapHandler from "@/components/OneTap/OneTapHandler";

const OneTapComponent: FC<PropsWithChildren> = ({children}) => {
    const [showOneTap, setShowOneTap] = useState(false);
    const {status} = useSession()

    const pathname = usePathname()
    useEffect(() => {
        setShowOneTap(pathname === '/' && status === 'unauthenticated')
    }, [pathname, status])

    return <OneTapContext.Provider value={{showOneTap, setShowOneTap}}>
        {children}
    </OneTapContext.Provider>
};

OneTapComponent.displayName = 'OneTap';
OneTapHandler.displayName = 'OneTap.Handler';

export const OneTap = Object.assign(OneTapComponent, {
        Handler: OneTapHandler,
    }
);