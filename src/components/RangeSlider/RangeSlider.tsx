import type {DeepPartial, FlowbiteTextInputSizes} from '../..';
import {useTheme} from '../..';

import type {ComponentProps} from 'react';
import {forwardRef} from 'react';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteRangeSliderTheme {
    root: FlowbiteRangeSliderRootTheme;
    field: FlowbiteRangeSliderFieldTheme;
}

export interface FlowbiteRangeSliderRootTheme {
    base: string;
}

export interface FlowbiteRangeSliderFieldTheme {
    base: string;
    input: {
        base: string;
        sizes: FlowbiteTextInputSizes;
    };
}

export interface RangeSliderProps extends Omit<ComponentProps<'input'>, 'ref' | 'type'> {
    sizing?: keyof FlowbiteTextInputSizes;
    theme?: DeepPartial<FlowbiteRangeSliderTheme>;
}

export const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
    ({className, sizing = 'md', theme: customTheme = {}, ...props}, ref) => {
        const theme = mergeDeep(useTheme().theme.rangeSlider, customTheme);

        return (
            <>
                <div data-testid="flowbite-range-slider" className={twMerge(theme.root.base, className)}>
                    <div className={theme.field.base}>
                        <input
                            ref={ref}
                            type="range"
                            className={twMerge(theme.field.input.base, theme.field.input.sizes[sizing])}
                            {...props}
                        />
                    </div>
                </div>
            </>
        );
    },
);

RangeSlider.displayName = 'RangeSlider';
