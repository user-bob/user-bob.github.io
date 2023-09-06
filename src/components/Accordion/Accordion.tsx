import type {ComponentProps, FC, PropsWithChildren, ReactElement} from 'react';
import {Children, cloneElement, useMemo, useState} from 'react';
import type {DeepPartial, FlowbiteBoolean} from '../..';
import {useTheme} from '../..';

import type {FlowbiteAccordionComponentTheme} from './AccordionContent';
import {AccordionContent} from './AccordionContent';
import type {AccordionPanelProps} from './AccordionPanel';
import {AccordionPanel} from './AccordionPanel';
import type {FlowbiteAccordionTitleTheme} from './AccordionTitle';
import {AccordionTitle} from './AccordionTitle';
import {HiChevronDown} from 'react-icons/hi';
import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteAccordionTheme {
    root: FlowbiteAccordionRootTheme;
    content: FlowbiteAccordionComponentTheme;
    title: FlowbiteAccordionTitleTheme;
}

export interface FlowbiteAccordionRootTheme {
    base: string;
    flush: FlowbiteBoolean;
}

export interface AccordionProps extends PropsWithChildren<ComponentProps<'div'>> {
    alwaysOpen?: boolean;
    arrowIcon?: FC<ComponentProps<'svg'>>;
    children: ReactElement<AccordionPanelProps> | ReactElement<AccordionPanelProps>[];
    flush?: boolean;
    collapseAll?: boolean;
    theme?: DeepPartial<FlowbiteAccordionTheme>;
}

const AccordionComponent: FC<AccordionProps> = ({
                                                    alwaysOpen = false,
                                                    arrowIcon = HiChevronDown,
                                                    children,
                                                    flush = false,
                                                    collapseAll = false,
                                                    className,
                                                    theme: customTheme = {},
                                                    ...props
                                                }) => {
    const [isOpen, setOpen] = useState(collapseAll ? -1 : 0);

    const panels = useMemo(
        () =>
            Children.map(children, (child, i) =>
                cloneElement(child, {
                    alwaysOpen,
                    arrowIcon,
                    flush,
                    isOpen: isOpen === i,
                    setOpen: () => setOpen(isOpen === i ? -1 : i),
                }),
            ),
        [alwaysOpen, arrowIcon, children, flush, isOpen],
    );

    const theme = mergeDeep(useTheme().theme.accordion.root, customTheme);

    return (
        <div
            className={twMerge(theme.base, theme.flush[flush ? 'on' : 'off'], className)}
            data-testid="flowbite-accordion"
            {...props}
        >
            {panels}
        </div>
    );
};

AccordionComponent.displayName = 'Accordion';
AccordionPanel.displayName = 'Accordion.Panel';
AccordionTitle.displayName = 'Accordion.Title';
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = Object.assign(AccordionComponent, {
    Panel: AccordionPanel,
    Title: AccordionTitle,
    Content: AccordionContent,
});
