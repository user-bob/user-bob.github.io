import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Home from "@/app/page";
import ProfilePage from "@/app/profile/page";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Home">
                <Home/>
            </ComponentPreview>
            <ComponentPreview path="/ProfilePage">
                <ProfilePage/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;