import {Footer} from "@/components";
import Link from "next/link";
import Image from "next/image";
import {FC} from "react";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs';
import {HiChevronDown} from "react-icons/hi";

const navigation = {
    about: [
        {name: 'About Dbee', href: '#'},
        {name: 'Affiliations', href: '#'},
        {name: 'Commerce', href: '#'},
        {name: 'Insights', href: '#'},
    ],
    support: [
        {name: 'FAQs', href: '/faq'},
        {name: 'Contact Us', href: '/contact'},
        {name: 'Discord', href: '#'},
        {name: 'Github Discussions', href: '#'},
    ],
    follow: [
        {name: 'Twitter', href: '#'},
        {name: 'Tiktok', href: '#'},
        {name: 'Facebook', href: '#'},
        {name: 'Instagram', href: '#'},
    ],
    legal: [
        {name: 'Privacy', href: '/privacy'},
        {name: 'Terms', href: '/terms'},
    ],
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: BsFacebook
        },
        {
            name: 'Instagram',
            href: '#',
            icon: BsInstagram
        },
        {
            name: 'Twitter',
            href: '#',
            icon: BsTwitter
        },
        {
            name: 'GitHub',
            href: '#',
            icon: BsGithub
        },
        {
            name: 'Dribbble',
            href: '#',
            icon: BsDribbble
        },
    ],
}

const options = {
    language: [
        'English',
        'Deutsch',
        'Español',
        'Français',
        'Italiano',
        'Português',
    ],
    currency: [
        'USD',
        'EUR',
        'GBP',
        'CAD',
        'AUD',
    ],
}

export const FooterContent: FC = () => {
    return (
        <div className="mb-10 xl:grid xl:grid-cols-5 xl:gap-8">
            <div className="xl:grid xl:grid-cols-3 xl:justify-items-center xl:gap-8 xl:col-span-4">
                <div className="max-w-sm lg:mb-0 space-y-8 xl:col-span-1">
                    <Link href="/" className="flex items-center gap-3">
                        <Image alt="" height="32" src="/vercel.svg" width="32"/>
                        <span
                            className="text-xl font-semibold text-gray-900 dark:text-gray-100">Flowbite React</span>
                    </Link>
                    <p className="mb-3 mt-4 max-w-sm text-gray-600 dark:text-gray-400">
                        Flowbite is an ecosystem built on top of Tailwind CSS including a component library,
                        block
                        sections, a
                        Figma design system and other resources.
                    </p>
                    <div className="flex space-x-6">
                        {navigation.social.map((item) => (
                            <a key={item.name} href={item.href}
                               className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true"/>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <Footer.Title title={'About'}
                                          className={'text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase'}/>
                            <Footer.LinkGroup col
                                              className="text-gray-600 dark:text-gray-400 mt-4 space-y-4">
                                {navigation.about.map((item, index) => (
                                    <Footer.Link key={index} href={item.href}
                                                 className="text-base hover:text-gray-700 dark:hover:text-gray-300">
                                        {item.name}
                                    </Footer.Link>
                                ))}
                            </Footer.LinkGroup>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <Footer.Title title={"Help & Support"}
                                          className={'text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase'}/>
                            <Footer.LinkGroup col
                                              className="text-gray-600 dark:text-gray-400 mt-4 space-y-4">
                                {navigation.support.map((item, index) => (
                                    <Footer.Link key={index} href={item.href}
                                                 className="text-base hover:text-gray-700 dark:hover:text-gray-300">
                                        {item.name}
                                    </Footer.Link>
                                ))}
                            </Footer.LinkGroup>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div className={'xl:justify-self-center'}>
                            <Footer.Title title={'Follow Us'}
                                          className={'text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase'}/>
                            <Footer.LinkGroup col
                                              className="text-gray-600 dark:text-gray-400 mt-4 space-y-4">
                                {navigation.follow.map((item, index) => (
                                    <Footer.Link key={index} href={item.href}
                                                 className="text-base hover:text-gray-700 dark:hover:text-gray-300">
                                        {item.name}
                                    </Footer.Link>
                                ))}
                            </Footer.LinkGroup>
                        </div>
                        <div className="mt-12 md:mt-0 xl:justify-self-center">
                            <Footer.Title title={'Legal'}
                                          className={'text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase'}/>
                            <Footer.LinkGroup col
                                              className="text-gray-600 dark:text-gray-400 mt-4 space-y-4">
                                {navigation.legal.map((item, index) => (
                                    <Footer.Link key={index} href={item.href}
                                                 className="text-base hover:text-gray-700 dark:hover:text-gray-300">
                                        {item.name}
                                    </Footer.Link>
                                ))}
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
            </div>
            <LanguageCurrency/>
        </div>
    );
};

const LanguageCurrency: FC = () => (
    <div className="mt-12 xl:mt-0">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">Language &amp; Currency</h3>
        <form className="mt-4 sm:max-w-xs">
            <fieldset className="w-full">
                <label htmlFor="language" className="sr-only">
                    Language
                </label>
                <div className="relative">
                    <select
                        id="language"
                        name="language"
                        className="appearance-none block w-full bg-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-transparent rounded-md py-2 pl-3 pr-10 text-base dark:text-white text-gray-900 focus:outline-none focus:ring-gray-400/50 focus:border-gray-400/50 sm:text-sm"
                        defaultValue="English"
                    >
                        {options.language.map((option) => (
                                <option key={option}>{option}</option>
                            )
                        )}
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                        <HiChevronDown className="h-4 w-4 text-gray-400 dark:text-white" aria-hidden="true"/>
                    </div>
                </div>
            </fieldset>
            <fieldset className="mt-4 w-full">
                <label htmlFor="currency" className="sr-only">
                    Currency
                </label>
                <div className="mt-1.5 relative">
                    <select
                        id="currency"
                        name="currency"
                        className="appearance-none block w-full bg-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-transparent rounded-md py-2 pl-3 pr-10 text-base dark:text-white text-gray-900 focus:outline-none focus:ring-gray-400/50 focus:border-gray-400/50 sm:text-sm"
                        defaultValue="CAD"
                    >
                        {options.currency.map((option) => (
                                <option key={option}>{option}</option>
                            )
                        )}
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                        <HiChevronDown className="h-4 w-4 text-gray-400 dark:text-white" aria-hidden="true"/>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
)
