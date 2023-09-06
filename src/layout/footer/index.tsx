import {FC} from "react";
import {FooterContent} from "./footer";
import {Footer} from "@/components";

export const SiteFooter: FC = () => {
    return (
        <Footer container className="rounded-none py-12 lg:py-16 shadow-none">
            <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <FooterContent/>
                <Footer.Divider/>
                <Footer.Copyright
                    by="All Rights Reserved. Flowbite™ is a registered trademark."
                    href="#"
                    year={2023}
                    className="text-base"
                />
            </div>
        </Footer>
    );
};

