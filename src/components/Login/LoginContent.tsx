import React, { FC, useEffect, useState } from 'react';
import { Modal, useThemeMode } from "@/components";
import { useLogin } from "@/components/Login/LoginContext";
import { Button } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { signIn } from "next-auth/react";

interface SocialButtonProps {
	src: string;
	text: string;
	className?: string;
	setLoading?: (loading: boolean) => void;
}

export const LoginContent = () => {
	const [mode, setMode, toggleMode, isDark] = useThemeMode();
	const {openModal, setOpenModal} = useLogin();
	const [loading, setLoading] = useState<boolean>(false);
	
	useEffect(() => {
		if (!openModal) {
			setLoading(false);
		}
	}, [openModal]);
	
	
	const github: string = isDark ? '/svgs/social/github-dark.svg' : '/svgs/social/github.svg';
	const facebook: string = isDark ? '/svgs/social/facebook-dark.svg' : '/svgs/social/facebook.svg'
	const twitter: string = isDark ? '/svgs/social/twitter-dark.svg' : '/svgs/social/twitter.svg'
	const google: string = '/svgs/social/google.svg'
	
	return (
		<div className="relative items-center block w-full h-full bg-white dark:bg-gray-800 dark:hover:bg-gray-700">
			<Modal
				theme={{
					root: {base: 'fixed z-50 h-full overflow-y-auto overflow-x-hidden inset-0'},
					content: {
						base: `relative h-full w-full p-4 h-auto`,
					}
				}}
				dismissible
				position={'center'}
				popup={true}
				show={openModal === 'dismissible'}
				onClose={() => !loading && setOpenModal?.(undefined)}
			>
				{loading && <div
					className="absolute inset-0 z-50 flex items-center justify-center" />}
				<Modal.Header
					className={twMerge(
						'p-6',
						loading && 'opacity-50'
					)}>Sign in
					<p className={twMerge("mt-1 text-sm text-gray-400",
						loading && 'opacity-50'
					)}>
						Sign in and manage your account across all your
						devices.
					</p>
				</Modal.Header>
				<Modal.Body>
					<div className={twMerge('flex flex-col gap-6',
						loading && 'opacity-50'
					)}>
						<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
							<SocialButton
								src={google} text={'Google'}
								className={'sm:px-8'}
								setLoading={setLoading} />
							<SocialButton
								src={github}
								text={'Github'}
								className={'sm:px-8'}
								setLoading={setLoading} />
						
						</div>
						<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
							<SocialButton
								src={twitter}
								text={'Twitter'}
								className={'sm:pl-5 sm:pr-10'}
								setLoading={setLoading} />
							<SocialButton
								src={facebook}
								text={'Facebook'}
								className={'sm:px-6'}
								setLoading={setLoading} />
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							By signing in you accept the Terms of Use and Privacy Policy.
						</p>
					</div>
				</Modal.Body>
				
				
				{loading && (
					<div
						role="status"
						className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
						<Spinner />
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</Modal>
		</div>
	);
};

export const SocialButton: FC<SocialButtonProps> = ({src, text, className, setLoading}) => (
	<Button
		size="lg"
		variant="outlined"
		color="blue-gray"
		className={twMerge('flex w-full justify-center hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-500 max-w-xs sm:w-auto shrink-0 items-center gap-4 py-3', className)}
		onClick={async (e) => {
			e.preventDefault()
			setLoading && setLoading(true)
			await signIn(text.toLowerCase())
		}}
	>
		{/* eslint-disable-next-line @next/next/no-img-element */}
		<img src={src} alt="metamask" className="h-6 w-6" />
		Continue with {text}
	</Button>
)

const Spinner: FC = () => (
	<svg aria-hidden="true"
	     className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
	     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
			fill="currentColor" />
		<path
			d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
			fill="currentFill" />
	</svg>
)
