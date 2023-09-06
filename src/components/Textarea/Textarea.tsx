import type {ComponentProps, ReactNode} from 'react';
import {forwardRef} from 'react';
import type {DeepPartial, FlowbiteBoolean, FlowbiteColors} from '../..';
import {HelperText, useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteTextareaTheme {
    base: string;
    colors: TextareaColors;
    withShadow: FlowbiteBoolean;
}

export interface TextareaColors extends Pick<FlowbiteColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
    [key: string]: string;
}

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'color' | 'ref'> {
    color?: keyof TextareaColors;
    helperText?: ReactNode;
    shadow?: boolean;
    theme?: DeepPartial<FlowbiteTextareaTheme>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, color = 'gray', helperText, shadow, theme: customTheme = {}, ...props}, ref) => {
        const theme = mergeDeep(useTheme().theme.textarea, customTheme);

        return (
            <>
        <textarea
            ref={ref}
            className={twMerge(theme.base, theme.colors[color], theme.withShadow[shadow ? 'on' : 'off'], className)}
            {...props}
        />
                {helperText && <HelperText color={color}>{helperText}</HelperText>}
            </>
        );
    },
);

Textarea.displayName = 'Textarea';
