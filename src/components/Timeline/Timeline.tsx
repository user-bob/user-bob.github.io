import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {FlowbiteTimelineItemTheme} from './TimelineItem';
import {TimelineItem} from './TimelineItem';
import {TimelineBody} from './TimelineBody';
import {TimelineContent} from './TimelineContent';
import {TimelineContext} from './TimelineContext';
import {TimelinePoint} from './TimelinePoint';
import {TimelineTime} from './TimelineTime';
import {TimelineTitle} from './TimelineTitle';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteTimelineTheme {
    root: {
        direction: {
            horizontal: string;
            vertical: string;
        };
    };
    item: FlowbiteTimelineItemTheme;
}

export interface TimelineProps extends PropsWithChildren, ComponentProps<'ol'> {
    horizontal?: boolean;
    theme?: DeepPartial<FlowbiteTimelineTheme>;
}

const TimelineComponent: FC<TimelineProps> = ({
                                                  children,
                                                  className,
                                                  horizontal,
                                                  theme: customTheme = {},
                                                  ...props
                                              }) => {
    const theme = mergeDeep(useTheme().theme.timeline, customTheme);

    return (
        <TimelineContext.Provider value={{horizontal}}>
            <ol
                data-testid="timeline-component"
                className={twMerge(
                    horizontal && theme.root.direction.horizontal,
                    !horizontal && theme.root.direction.vertical,
                    className,
                )}
                {...props}
            >
                {children}
            </ol>
        </TimelineContext.Provider>
    );
};

TimelineComponent.displayName = 'Timeline';
TimelineItem.displayName = 'Timeline.Item';
TimelinePoint.displayName = 'Timeline.Point';
TimelineContent.displayName = 'Timeline.Content';
TimelineTime.displayName = 'Timeline.Time';
TimelineTitle.displayName = 'Timeline.Title';
TimelineBody.displayName = 'Timeline.Body';

export const Timeline = Object.assign(TimelineComponent, {
    Item: TimelineItem,
    Point: TimelinePoint,
    Content: TimelineContent,
    Time: TimelineTime,
    Title: TimelineTitle,
    Body: TimelineBody,
});
