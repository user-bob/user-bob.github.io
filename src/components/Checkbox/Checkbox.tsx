import type {ComponentProps} from 'react';
import {forwardRef} from 'react';
import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteCheckboxTheme {
    root: FlowbiteCheckboxRootTheme;
}

export interface FlowbiteCheckboxRootTheme {
    base: string;
}

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type' | 'ref'> {
    theme?: DeepPartial<FlowbiteCheckboxTheme>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({className, theme: customTheme = {}, ...props}, ref) => {
        const theme = mergeDeep(useTheme().theme.checkbox, customTheme);

        return <input ref={ref} type="checkbox" className={twMerge(theme.root.base, className)} {...props} />;
    },
);

Checkbox.displayName = 'Checkbox';
