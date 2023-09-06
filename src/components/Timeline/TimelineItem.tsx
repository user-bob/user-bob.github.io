import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {FlowbiteTimelineContentTheme} from './TimelineContent';
import type {FlowbiteTimelinePointTheme} from './TimelinePoint';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {useTimelineContext} from './TimelineContext';

export interface FlowbiteTimelineItemTheme {
    root: {
        horizontal: string;
        vertical: string;
    };
    content: FlowbiteTimelineContentTheme;
    point: FlowbiteTimelinePointTheme;
}

export interface TimelineItemProps extends PropsWithChildren, ComponentProps<'li'> {
    theme?: DeepPartial<FlowbiteTimelineItemTheme>;
}

export const TimelineItem: FC<TimelineItemProps> = ({children, className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.timeline.item, customTheme);
    const {horizontal} = useTimelineContext();

    return (
        <li
            data-testid="timeline-item"
            className={twMerge(horizontal && theme.root.horizontal, !horizontal && theme.root.vertical, className)}
            {...props}
        >
            {children}
        </li>
    );
};
