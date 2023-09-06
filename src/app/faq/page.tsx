'use client'

import {HiMagnifyingGlass} from "react-icons/hi2";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {HiChevronDown} from "react-icons/hi";
import {twMerge} from "tailwind-merge";

export interface FAQPageProps {
    question: string;
    answer: string;
}

const faqs: FAQPageProps[] = [
    {
        question: 'How do i gain points?',
        answer: 'You gain points by buying products with our links. You can also gain points by referring friends to our website.'
    },
    {
        question: 'How do i use my points?',
        answer: 'You can use your points to buy products from our website. You can also use your points to buy products from our partners.'
    },
    {
        question: 'How do i get a refund?',
        answer: 'You can get a refund by contacting our support team. You can also get a refund by contacting our partners.'
    },
    {
        question: 'How can i get a gift card?',
        answer: 'You can get a gift card by buying products above $100. You can also get a gift card by referring 10 friends to our website.'
    },
    {
        question: 'How can i get a discount?',
        answer: 'You can get a discount by buying products above $100.'
    },
    {
        question: 'How can i get coupon?',
        answer: 'You can get a coupon by buying products above $100.'
    }
]

const FAQPage = () => {
    const [expanded, setExpanded] = useState<false | number>(false);
    return (
        <div className="max-w-7xl mx-auto py-16 sm:py-24 px-6 lg:px-8">
            <div className="lg:max-w-2xl space-y-8 lg:mx-auto text-center">
                <h2 className="text-3xl font-extrabold tracking-tight dark:text-white text-gray-900 sm:text-4xl">Frequently
                    asked
                    questions</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Here are a few of the questions we get the most. If you don&apos;t see what&apos;s on your mind,
                    reach out to us anytime on
                    our <a href="#" className="text-white font-medium hover:underline">contact page</a>.
                </p>

                <form>
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <HiMagnifyingGlass className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"/>
                        </div>
                        <input type="search" id="default-search"
                               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Type keywords to find answers" required/>
                    </div>
                    <p className={"text-sm mt-4 text-gray-500 dark:text-gray-400"}>You can also browse the topics
                        below to find what you are looking for.</p>
                </form>
            </div>
            <div className="mt-20">
                <dl className="grid lg:grid-cols-3 gap-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className={'lg:max-w-sm'}>
                            <DefaultAccordion i={i} expanded={expanded} setExpanded={setExpanded} faq={faq}/>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

export default FAQPage;

export interface AccordionProps {
    i: number;
    expanded: number | false;
    setExpanded: (i: number | false) => void;
    faq: FAQPageProps;
}

const DefaultAccordion = ({i, expanded, setExpanded, faq}: AccordionProps) => {
    const isOpen = i === expanded;
    return (
        <>
            <motion.header
                initial={false}
                // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
                onClick={() => setExpanded(isOpen ? false : i)}
                className="rounded-lg cursor-pointer"
            >
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-medium text-white">{faq.question}</h2>
                    <span className="ml-6 h-7 flex items-center">
                        <HiChevronDown className={twMerge(isOpen && "transform rotate-180",
                            "w-6 h-6 transform")} aria-hidden="true"/>
                    </span>
                </div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {opacity: 1, height: "auto"},
                            collapsed: {opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98]}}
                    >
                        <motion.div
                            variants={{collapsed: {scale: 0.8}, open: {scale: 1}}}
                            transition={{duration: 0.7}}
                            className="p-4 origin-top"
                        >
                            {faq.answer}
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
};


