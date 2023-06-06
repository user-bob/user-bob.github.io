const faqs = [
    {
        id: 1,
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    }, {
        id: 2,
        question: "How do you make holy water?",
        answer:
            "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    }, {
        id: 3,
        question: "Why do you never see elephants hiding in trees?",
        answer:
            "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    }, {
        id: 4,
        question: "What do you call someone with no body and no nose?",
        answer:
            "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    }, {
        id: 5,
        question: "Why can't you hear a pterodactyl go to the bathroom?",
        answer:
            "Because the pee is silent. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    }, {
        id: 6,
        question: "Why did the invisible man turn down the job offer?",
        answer:
            "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // More questions...
]

export default function FAQ() {
    return (
        <section aria-labelledby="faq-heading" className="h-full items-center flex justify-center">
            <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="max-w-2xl md:mx-auto md:text-center">
                    <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                        Questions. Frequently asked ones. Plus our answers. That&apos;s how FAQs work. If you can&apos;t
                        find what you&apos;re
                        looking for, you can always{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            send us an email
                        </a>{' '}
                        with your enquiry.
                    </p>
                </div>

                <dl className="mt-12 grid grid-cols-1 gap-y-10 sm:mt-16 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                    {faqs.map((faq) => (
                        <div key={faq.id}>
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-200">{faq.question}</dt>
                            <dd className="mt-3 text-sm text-gray-500 dark:text-gray-400">{faq.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}