import type {ComponentProps, ReactNode} from 'react';
import {forwardRef} from 'react';
import type {DeepPartial, FlowbiteTextInputColors, FlowbiteTextInputSizes} from '../..';
import {HelperText, useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteFileInputTheme {
    root: FlowbiteFileInputRootTheme;
    field: FlowbiteFileInputFieldTheme;
}

export interface FlowbiteFileInputRootTheme {
    base: string;
}

export interface FlowbiteFileInputFieldTheme {
    base: string;
    input: FlowbiteFileInputFieldInputTheme;
}

export interface FlowbiteFileInputFieldInputTheme {
    base: string;
    colors: FlowbiteTextInputColors;
    sizes: FlowbiteTextInputSizes;
}

export interface FileInputProps extends Omit<ComponentProps<'input'>, 'type' | 'ref' | 'color'> {
    color?: keyof FlowbiteTextInputColors;
    helperText?: ReactNode;
    sizing?: keyof FlowbiteTextInputSizes;
    theme?: DeepPartial<FlowbiteFileInputTheme>;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    ({className, color = 'gray', helperText, sizing = 'md', theme: customTheme = {}, ...props}, ref) => {
        const theme = mergeDeep(useTheme().theme.fileInput, customTheme);

        return (
            <>
                <div className={twMerge(theme.root.base, className)}>
                    <div className={theme.field.base}>
                        <input
                            className={twMerge(
                                theme.field.input.base,
                                theme.field.input.colors[color],
                                theme.field.input.sizes[sizing],
                            )}
                            {...props}
                            type="file"
                            ref={ref}
                        />
                    </div>
                </div>
                {helperText && <HelperText color={color}>{helperText}</HelperText>}
            </>
        );
    },
);

FileInput.displayName = 'FileInput';
