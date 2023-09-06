const privacyPolicy = {
    title: 'Privacy Policy',
    content: [
        {
            title: 'Introduction',
            content: [
                'This Privacy Policy governs the manner in which this website collects, uses, maintains and discloses information collected from users (each, a "User") of the website ("Site"). This privacy policy applies to the Site and all products and services offered by the Site.',
                'We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.',
                'Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. Users may, however, visit our Site anonymously.',
                'We will collect personal identification information from Users only if they voluntarily submit such information to us.',
                'Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.',
                'If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:',
                'This document was last updated on January 01, 2016'
            ]
        },
        {
            title: 'Personal identification information',
            content: [
                'We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.',
                'Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. Users may, however, visit our Site anonymously.',
                'We will collect personal identification information from Users only if they voluntarily submit such information to us.',
                'Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.'
            ]
        },
        {
            title: 'What information do we collect?',
            content: [
                'We collect information from you when you register on our site, subscribe to our newsletter or fill out a form.',
                'When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address or phone number.',
                'You may, however, visit our site anonymously.',
                'Google, as a third party vendor, uses cookies to serve ads on your site.',
                'Google\'s use of the DART cookie enables it to serve ads to your users based on their visit to your sites and other sites on the Internet.',
                'Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy..'
            ]
        },
        {
            title: 'What do we use your information for?',
            content: [
                'Any of the information we collect from you may be used in one of the following ways:',
                'To personalize your experience (your information helps us to better respond to your individual needs)',
                'To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)',
                'To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)',
                'To administer a contest, promotion, survey or other site feature',
                'To send periodic emails',
                'The email address you provide for order processing, will only be used to send you information and updates pertaining to your order.',
                'Note: If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.'
            ]
        },
        {
            title: 'Do we use cookies?',
            content: [
                'Yes (Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information',
                'We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.',
                'We may contract with third-party service providers to assist us in better understanding our site visitors.',
                'These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.'
            ]
        },
        {
            title: 'Do we disclose any information to outside parties?',
            content: [
                'We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.',
                'This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.',
                'We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety.',
                'However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.'
            ]
        },
        {
            title: 'Third party links',
            content: [
                'Occasionally, at our discretion, we may include or offer third party products or services on our website.',
                'These third party sites have separate and independent privacy policies.',
                'We therefore have no responsibility or liability for the content and activities of these linked sites.',
                'Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.'
            ]
        },
        {
            title: 'California Online Privacy Protection Act Compliance',
            content: [
                'Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act.',
                'We therefore will not distribute your personal information to outside parties without your consent.'
            ]
        },
        {
            title: 'Childrens Online Privacy Protection Act Compliance',
            content: [
                'We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act),',
                'we do not collect any information from anyone under 13 years of age.',
                'Our website, products and services are all directed to people who are at least 13 years old or older.'
            ]
        },
        {
            title: 'Online Privacy Policy Only',
            content: [
                'This online privacy policy applies only to information collected through our website and not to information collected offline.'
            ]
        },
        {
            title: 'Terms and Conditions',
            content: [
                'Please also visit our Terms and Conditions section establishing the use, disclaimers, and limitations of liability governing the use of our website at https://www.termsandcondiitionssample.com/'
            ]
        },
        {
            title: 'Your Consent',
            content: [
                'By using our site, you consent to our privacy policy.'
            ]
        },
        {
            title: 'Changes to our Privacy Policy',
            content: [
                'If we decide to change our privacy policy, we will post those changes on this page.'
            ]
        },
        {
            title: 'Contacting Us',
            content: [
                'If there are any questions regarding this privacy policy you may contact us using the information below.',
                'https://www.termsandcondiitionssample.com/'
            ]
        }
    ]
}

const PrivacyPage = () => {
    return (
        <div className="flex flex-col max-w-7xl mb-20 mx-auto justify-center items-center w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{privacyPolicy.title}</h1>
            <div className="flex w-full mt-20 gap-8">
                <div className="hidden sm:block sm:w-full sm:max-w-sm">
                    <div className="flex flex-col break-words">
                        {privacyPolicy.content.map((item, index) => (
                            <a key={index} href={'#'} className={'px-4 py-2'}>
                                <p className="text-base font-bold text-gray-900 dark:text-white">{item.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="grid gap-8 break-words">
                    {privacyPolicy.content.map((item, index) => (
                        <div key={index}>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h2>
                            <div
                                className="text-gray-700 dark:text-gray-400">{item.content.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;