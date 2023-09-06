import {createContext, ReactNode, useContext, useState} from 'react';

export interface LoginContextProps {
    openModal?: string;
    setOpenModal?: (openModal: string | undefined) => void | null;
}

export const LoginContext = createContext<LoginContextProps>({});

interface LoginProviderProps {
    children: ReactNode;
    value: LoginContextProps;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({children, value}) => {
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export const useLogin: () => LoginContextProps = () => {
    return useContext(LoginContext);
}

export const useLoginModal: () => [string | undefined, (openModal: string | undefined) => void] = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();

    const onToggleModal = (newModal: string | undefined) => {
        setOpenModal(newModal);
    };

    return [openModal, onToggleModal];
}