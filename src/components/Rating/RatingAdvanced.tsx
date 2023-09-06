import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteRatingAdvancedTheme {
    base: string;
    label: string;
    progress: {
        base: string;
        fill: string;
        label: string;
    };
}

export interface RatingAdvancedProps extends PropsWithChildren, ComponentProps<'div'> {
    percentFilled?: number;
    theme?: DeepPartial<FlowbiteRatingAdvancedTheme>;
}

export const RatingAdvanced: FC<RatingAdvancedProps> = ({
                                                            children,
                                                            className,
                                                            percentFilled = 0,
                                                            theme: customTheme = {},
                                                            ...props
                                                        }) => {
    const theme = mergeDeep(useTheme().theme.rating.advanced, customTheme);

    return (
        <div className={twMerge(theme.base, className)} {...props}>
            <span className={theme.label}>{children}</span>
            <div className={theme.progress.base}>
                <div
                    className={theme.progress.fill}
                    data-testid="flowbite-rating-fill"
                    style={{width: `${percentFilled}%`}}
                />
            </div>
            <span className={theme.progress.label}>{`${percentFilled}%`}</span>
        </div>
    );
};
