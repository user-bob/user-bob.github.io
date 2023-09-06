import React, {FC} from 'react';
import {OneTapPrompt} from "./OneTapPrompt";

const OneTapHandler: FC = () => {
    const {status: oneTapIsLoading} = OneTapPrompt({
        redirect: false,
        parentContainerId: "oneTap",
    });

    return <div id="oneTap" className="fixed z-50 right-6 top-6"/>;
};

export default OneTapHandler;
