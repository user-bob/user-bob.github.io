import React, {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import SocialSignInButton from '@/components/buttons/social-sign-in-button'
import {useTheme} from "@/theme/theme-provider";
import classNames from "@/utils/class-names";

interface ModalLoginProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}


const ModalLogin = ({open, setOpen}: ModalLoginProps) => {
    const {dark} = useTheme();

    const github: string = dark ? 'https://authjs.dev/img/providers/github-dark.svg' : 'https://authjs.dev/img/providers/github.svg';
    const facebook: string = dark ? 'https://authjs.dev/img/providers/facebook-dark.svg' : 'https://authjs.dev/img/providers/facebook.svg'
    const twitter: string = dark ? 'https://authjs.dev/img/providers/twitter-dark.svg' : 'https://authjs.dev/img/providers/twitter.svg'
    const google: string = 'https://authjs.dev/img/providers/google.svg'

    return (
        <Transition.Root appear show={open} as={Fragment}>
            <Dialog as="div" className={classNames(
                dark
                    ? 'dark'
                    : '', "relative z-10")} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 dark:bg-gray-100 dark:bg-opacity-25 bg-gray-900 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className={"fixed inset-0 z-10 overflow-y-auto"}>
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel>
                                <div
                                    className={'relative dark:bg-gray-900 bg-white transform space-y-6 p-6 overflow-hidden rounded-xl text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-xs sm:max-w-lg'}>
                                    <button
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        onClick={() => setOpen(false)}
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="text-left">
                                        <Dialog.Title as="h1"
                                                      className="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
                                            Sign in
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-base text-gray-400">
                                                Sign in and manage your favorites across all your
                                                devices.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col space-y-4 sm:-space-y-2 sm:flex-row sm:items-center justify-around">
                                        <SocialSignInButton
                                            image={google}
                                            name={'Google'}/>
                                        <SocialSignInButton
                                            image={github}
                                            name={'Github'}/>
                                    </div>
                                    <div
                                        className="flex flex-col space-y-4 sm:-space-y-2 sm:flex-row sm:items-center justify-around">
                                        <SocialSignInButton
                                            image={facebook}
                                            name={'Facebook'}/>
                                        <SocialSignInButton
                                            image={twitter}
                                            name={'Twitter'}/>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        By signing in you accept the Terms of Use and Privacy Policy.
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalLogin;
