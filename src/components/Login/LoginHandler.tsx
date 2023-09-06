import React, {ComponentProps, FC} from "react";
import {useLogin} from "@/components/Login/LoginContext";
import {HiUser} from "react-icons/hi2";

export interface LoginHandlerProps extends ComponentProps<'button'> {
    userIcon?: FC<ComponentProps<'svg'>>;
    text?: string;
    useIcon?: boolean;
}

export const LoginHandler: FC<LoginHandlerProps> = ({
                                                        userIcon: UserIcon = HiUser,
                                                        className,
                                                        text = 'Sign in',
                                                        useIcon = false,
                                                        ...props
                                                    }) => {
    const {setOpenModal} = useLogin();

    const handleClick = () => {
        if (setOpenModal) {
            setOpenModal('dismissible');
        }
    }

    return (
        <button
            data-testid="login-modal-toggle"
            onClick={handleClick}
            className={className}
            {...props}
        >
            <span className="sr-only">Open login modal</span>
            {useIcon ? <UserIcon aria-hidden className="w-6 h-6"/> :
                <span>{text}</span>}
        </button>
    );
}