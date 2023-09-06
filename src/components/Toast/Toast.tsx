import type {ComponentProps, FC, PropsWithChildren} from 'react';
import {useState} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {Duration} from './ToastContext';
import {ToastContext} from './ToastContext';
import {ToastToggle} from './ToastToggle';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteToastTheme {
    root: {
        base: string;
        closed: string;
        removed: string;
    };
    toggle: {
        base: string;
        icon: string;
    };
}

export interface ToastProps extends PropsWithChildren<ComponentProps<'div'>> {
    duration?: Duration;
    theme?: DeepPartial<FlowbiteToastTheme>;
}

const durationClasses: Record<Duration, string> = {
    75: 'duration-75',
    100: 'duration-100',
    150: 'duration-150',
    200: 'duration-200',
    300: 'duration-300',
    500: 'duration-500',
    700: 'duration-700',
    1000: 'duration-1000',
};

const ToastComponent: FC<ToastProps> = ({children, className, duration = 300, theme: customTheme = {}, ...props}) => {
    const [isClosed, setIsClosed] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    const theme = mergeDeep(useTheme().theme.toast, customTheme);

    return (
        <ToastContext.Provider value={{duration, isClosed, isRemoved, setIsClosed, setIsRemoved}}>
            <div
                data-testid="flowbite-toast"
                className={twMerge(
                    theme.root.base,
                    durationClasses[duration],
                    isClosed && theme.root.closed,
                    isRemoved && theme.root.removed,
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </ToastContext.Provider>
    );
};

ToastComponent.displayName = 'Toast';
ToastToggle.displayName = 'Toast.Toggle';

export const Toast = Object.assign(ToastComponent, {
    Toggle: ToastToggle,
});
