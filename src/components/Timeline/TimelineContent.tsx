import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {FlowbiteTimelineBodyTheme} from './TimelineBody';
import type {FlowbiteTimelineTimeTheme} from './TimelineTime';
import type {FlowbiteTimelineTitleTheme} from './TimelineTitle';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {useTimelineContext} from './TimelineContext';

export interface FlowbiteTimelineContentTheme
    extends FlowbiteTimelineBodyTheme,
        FlowbiteTimelineTimeTheme,
        FlowbiteTimelineTitleTheme {
    root: {
        base: string;
    };
}

export interface TimelineContentProps extends PropsWithChildren, ComponentProps<'div'> {
    theme?: DeepPartial<FlowbiteTimelineContentTheme>;
}

export const TimelineContent: FC<TimelineContentProps> = ({
                                                              children,
                                                              className,
                                                              theme: customTheme = {},
                                                              ...props
                                                          }) => {
    const theme = mergeDeep(useTheme().theme.timeline.item.content, customTheme);
    const {horizontal} = useTimelineContext();

    return (
        <div data-testid="timeline-content" className={twMerge(horizontal && theme.root.base, className)} {...props}>
            {children}
        </div>
    );
};
