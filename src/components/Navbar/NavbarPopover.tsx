import { DeepPartial, PopoverComponent, useTheme } from "@/components";
import { mergeDeep } from "@/helpers/merge-deep";
import { ComponentProps, FC, PropsWithChildren } from "react";

export interface NavbarPopoverTheme {
	root: NavbarPopoverRootTheme;
	featured: NavbarPopoverFeaturedTheme;
	section: NavbarPopoverSectionTheme;
}

export interface NavbarPopoverRootTheme {
	base: string;
}

export interface NavbarPopoverFeaturedTheme {
	base: string;
	item: NavbarPopoverFeaturedItemTheme;
}

export interface NavbarPopoverSectionTheme {
	base: string;
	title: string;
	links: NavbarPopoverSectionLinksTheme;
}

export interface NavbarPopoverFeaturedItemTheme {
	base: string;
	img: NavbarPopoverFeaturedItemImgTheme;
	title: NavbarPopoverFeaturedItemTitleTheme;
}

export interface NavbarPopoverFeaturedItemImgTheme {
	base: string;
	image: string;
}

export interface NavbarPopoverFeaturedItemTitleTheme {
	base: string;
	text: string;
}

export interface NavbarPopoverSectionLinksTheme {
	base: string;
	link: NavbarPopoverSectionLinkTheme;
}

export interface NavbarPopoverSectionLinkTheme {
	base: string;
	text: string;
}

export interface ContentType {
	title: string;
	featured?: {
		title: string;
		href: string;
		imageSrc: string;
		imageAlt: string;
	}[];
	sections?: {
		title: string;
		links: {
			title: string;
			href: string;
		}[];
	}[];
}

export interface NavbarPopoverProps extends PropsWithChildren, ComponentProps<any> {
	theme?: DeepPartial<NavbarPopoverTheme>;
	content: ContentType;
}

export const NavbarPopover: FC<NavbarPopoverProps> = ({
	                                                      theme: customTheme = {},
	                                                      content,
	                                                      ...props
                                                      }) => {
	const theme = mergeDeep(useTheme().theme.navbar.popover, customTheme);
	return (
		<PopoverComponent
			hover={true}
			{...props}
			overlay={true}
			className={"z-50 bg-white dark:bg-gray-800 dark:border-gray-700 max-w-screen-2xl"}
			handler={
				<div className={'flex items-center justify-center p-4 xl:px-8'}>
        <span className={"hover:text-gray-900 font-semibold text-gray-800 dark:hover:text-white dark:text-gray-100"}>
          {content.title}
        </span>
				</div>
			}
		>
			<div className={theme.root.base}>
				<div className={theme.featured.base}>
					{content.featured?.map((item, index) => (
						<div key={index} className={theme.featured.item.base}>
							<div className={theme.featured.item.img.base}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.imageSrc}
									alt={item.imageAlt}
									className={theme.featured.item.img.image}
								/>
							</div>
							<a href={item.href} className={theme.featured.item.title.base}>
								<span className={theme.featured.item.title.text} aria-hidden="true" />
								{item.title}
							</a>
							<p aria-hidden="true" className="mt-1">
								Shop now
							</p>
						</div>
					))}
				</div>
				<div className={theme.section.base}>
					{content.sections?.map((section, index) => (
						<div key={index}>
							<p id={`${section.title}-heading`} className={theme.section.title}>
								{section.title}
							</p>
							<ul
								role="list"
								aria-labelledby={`${section.title}-heading`}
								className={theme.section.links.base}
							>
								{section.links.map((link, index) => (
									<li key={index} className={theme.section.links.link.base}>
										<a href={link.href} className={theme.section.links.link.text}>
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</PopoverComponent>
	);
};
