import React, {useState} from 'react';
import {useRouter} from "next/router";
import AuthForm from "@/components/Form/auth";
import {login, register, validateEmail, validatePassword} from "@/components/Form/auth/helper";

type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const registerContent = {
    linkUrl: "/login",
    accountText: "Already have an account?",
    otherPage: "Login",
    header: "Create a new account",
    buttonText: "Create account"
};

const loginContent = {
    linkUrl: "/signup",
    accountText: "Don't have an account?",
    otherPage: "Create account",
    header: "Sign in to your account",
    buttonText: "Login to your account",
};

const initial = {
    email: "",
    password: "",
    confirmPassword: "",
};



const ModalForm = ({isOpen, setIsOpen}: ModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formState, setFormState] = useState({...initial});
    const [formStateErrors, setFormStateErrors] = useState({...initial});

    const content = isLogin ? loginContent : registerContent;
    const router = useRouter();

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value, name} = event.target;
        setFormState((s) => ({...s, [name]: value}));
        setFormStateErrors((s) => ({...s, [name]: ""}));
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateInput();
        if (!formStateErrors) {
            handleSubmit(e).then(r => {
                console.log(r);
            });
        }
    };

    const validateInput = () => {
        setFormStateErrors((s) => {
            const {email, password, confirmPassword} = formState;
            const errObj = {...s};
            if (!email || !validateEmail(email)) {
                // Check if the email is valid
                errObj.email = "Please enter a valid email";
            }
            if (!password || !validatePassword(password)) {
                // Check if the password is valid
                errObj.password = "Please must be 8 characters or above";
            }
            // Check if the confirmation password matches the password
            if (!confirmPassword || confirmPassword !== password) {
                errObj.confirmPassword = "Password and Confirm Password does not match.";
            }
            return errObj;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent page refresh on form submit
        e.preventDefault();
        // Declare message variable

        try {
            const msg = isLogin ? await login(formState) : await register(formState);
            // If message is success, push user to home page
            if (msg === "success") {
                await router.push("/");
                // Reset form state
                setFormState(initial);
            } else {
                // Set error message
                msg.toLowerCase().includes("password")
                    ? setFormStateErrors((s) => ({...s, password: msg}))
                    : setFormStateErrors((s) => ({...s, email: msg}));
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={'relative z-10'} aria-modal="true">
            <div
                className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity"/>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 min-w-min w-3/4 sm:w-full max-w-md md:max-w-lg">
                        {isOpen &&
                            <AuthForm
                                content={content} onSubmit={onFormSubmit}
                                formState={formState} onChange={onInputChange}
                                formStateErrors={formStateErrors} login={isLogin}
                                onClick={() => setIsOpen(false)}
                                onClick1={() => setIsLogin(!isLogin)}/>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ModalForm;
