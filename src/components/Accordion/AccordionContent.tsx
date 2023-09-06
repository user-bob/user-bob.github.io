import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {useAccordionContext} from './AccordionPanelContext';

export interface FlowbiteAccordionComponentTheme {
    base: string;
}

export interface AccordionContentProps extends PropsWithChildren<ComponentProps<'div'>> {
    theme?: DeepPartial<FlowbiteAccordionComponentTheme>;
}

export const AccordionContent: FC<AccordionContentProps> = ({
                                                                children,
                                                                className,
                                                                theme: customTheme = {},
                                                                ...props
                                                            }) => {
    const {isOpen} = useAccordionContext();

    const theme = mergeDeep(useTheme().theme.accordion.content, customTheme);

    return (
        <div
            className={twMerge(theme.base, className)}
            data-testid="flowbite-accordion-content"
            hidden={!isOpen}
            {...props}
        >
            {children}
        </div>
    );
};
