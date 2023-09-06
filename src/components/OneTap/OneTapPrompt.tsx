'use client';

import {signIn, SignInOptions, useSession} from "next-auth/react";
import {useOneTapContext} from "./OneTapContext";

interface OneTapOptions {
    parentContainerId?: string;
}

export const OneTapPrompt = (options?: OneTapOptions & Pick<SignInOptions, "redirect" | "callbackUrl">) => {
    const {parentContainerId} = options || {};
    const {showOneTap, setShowOneTap} = useOneTapContext();

    // Taking advantage in recent development of useSession hook.
    // If user is unauthenticated, google one tap ui is initialized and rendered
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            if (showOneTap) {
                const {google} = window as any;
                if (google) {
                    google.accounts.id.initialize({
                        client_id: process.env.NEXT_PUBLIC_GOOGLE_ID!,
                        callback: async (response: any) => {
                            // Here we call our Provider with the token provided by google
                            await signIn(process.env.CREDENTIALS_ID, {
                                credential: response.credential,
                                redirect: true,
                                ...options,
                            });
                        },
                        prompt_parent_id: parentContainerId,
                        // auto_select: true,
                        // cancel_on_tap_outside: false,
                    });

                    // Here we just console.log some error situations and reason why the Google one tap
                    // is not displayed. You may want to handle it depending on your application
                    google.accounts.id.prompt((notification: any) => {
                        if (notification.isNotDisplayed()) {
                            console.log("getNotDisplayedReason ::", notification.getNotDisplayedReason());
                        } else if (notification.isSkippedMoment()) {
                            console.log("getSkippedReason  ::", notification.getSkippedReason());
                        } else if (notification.isDismissedMoment()) {
                            console.log("getDismissedReason ::", notification.getDismissedReason());
                        }
                    });
                }
            }
        },
    });

    return {status};
};