import type {ComponentProps, FC, MouseEvent} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {HiX} from 'react-icons/hi';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {useToastContext} from './ToastContext';

export interface FlowbiteToastToggleTheme {
    base: string;
    icon: string;
}

export interface ToastToggleProps extends ComponentProps<'button'> {
    theme?: DeepPartial<FlowbiteToastToggleTheme>;
    xIcon?: FC<ComponentProps<'svg'>>;
}

export const ToastToggle: FC<ToastToggleProps> = ({
                                                      className,
                                                      onClick,
                                                      theme: customTheme = {},
                                                      xIcon: XIcon = HiX,
                                                      ...props
                                                  }) => {
    const theme = mergeDeep(useTheme().theme.toast.toggle, customTheme);
    const {duration, isClosed, isRemoved, setIsClosed, setIsRemoved} = useToastContext();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);
        setIsClosed(!isClosed);
        setTimeout(() => setIsRemoved(!isRemoved), duration);
    };

    return (
        <button
            aria-label="Close"
            onClick={handleClick}
            type="button"
            className={twMerge(theme.base, className)}
            {...props}
        >
            <XIcon aria-hidden className={theme.icon}/>
        </button>
    );
};
