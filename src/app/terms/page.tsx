const termsAndConditions = {
    title: 'Terms and Conditions',
    content: [
        {
            title: '1. Introduction',
            content: [
                'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com.',
                'These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.',
                'Minors or people below 18 years old are not allowed to use this Website.'
            ]
        },
        {
            title: '2. Intellectual Property Rights',
            content: [
                'Other than the content you own, under these Terms, Company Name and/or its licensors own all the intellectual property rights and materials contained in this Website.',
                'You are granted limited license only for purposes of viewing the material contained on this Website.'
            ]
        },
        {
            title: '3. Restrictions',
            content: [
                'You are specifically restricted from all of the following:',
                'publishing any Website material in any other media;',
                'selling, sublicensing and/or otherwise commercializing any Website material;',
                'publicly performing and/or showing any Website material;',
                'using this Website in any way that is or may be damaging to this Website;',
                'using this Website in any way that impacts user access to this Website;',
                'using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;',
                'engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;',
                'using this Website to engage in any advertising or marketing.',
                'Certain areas of this Website are restricted from being access by you and Company Name may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.'
            ]
        },
        {
            title: '4. Your Content',
            content: [
                'In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Company Name a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.',
                'Your Content must be your own and must not be invading any third-party’s rights. Company Name reserves the right to remove any of Your Content from this Website at any time without notice.'
            ]
        },
        {
            title: '5. No warranties',
            content: [
                'This Website is provided “as is,” with all faults, and Company Name express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.'
            ]
        },
        {
            title: '6. Limitation of liability',
            content: [
                'In no event shall Company Name, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Company Name, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.'
            ]
        },
        {
            title: '7. Indemnification',
            content: [
                'You hereby indemnify to the fullest extent Company Name from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.'
            ]
        },
        {
            title: '8. Severability',
            content: [
                'If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.'
            ]
        }
    ]
}

const TermsAndConditionsPage = () => {
    return (
        <div className="flex flex-col max-w-7xl mb-20 mx-auto justify-center items-center w-full">
            <h1 className={'text-3xl font-bold text-gray-900 dark:text-white'}>{termsAndConditions.title}</h1>
            <div className="flex flex-col space-y-8 w-full mt-20">
                {termsAndConditions.content.map((section, index) => (
                    <div key={index}>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                        {section.content.map((paragraph, index) => (
                            <p className="text-gray-700 dark:text-gray-400" key={index}>{paragraph}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;