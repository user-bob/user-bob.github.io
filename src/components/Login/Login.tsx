import React, {FC, PropsWithChildren, useMemo} from 'react';
import {LoginContext, useLoginModal} from "./LoginContext";

export const Login: FC<PropsWithChildren> = ({
                                                 children
                                             }) => {
    const [openModal, onToggleModal] = useLoginModal();

    const loginContextValue = useMemo(
        () => ({
            openModal,
            setOpenModal: onToggleModal,
        }),
        [openModal, onToggleModal],
    );

    return (
        <LoginContext.Provider value={loginContextValue}>
            {children}
        </LoginContext.Provider>
    );
};
