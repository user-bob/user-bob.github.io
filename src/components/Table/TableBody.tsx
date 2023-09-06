import type {ComponentProps, FC, PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';
import type {DeepPartial} from '..';
import {useTheme} from '../../components/Flowbite';
import {mergeDeep} from '../../helpers/merge-deep';
import type {FlowbiteTableCellTheme} from './TableCell';

export interface FlowbiteTableBodyTheme {
    base: string;
    cell: FlowbiteTableCellTheme;
}

export interface TableBodyProps extends PropsWithChildren, ComponentProps<'tbody'> {
    theme?: DeepPartial<FlowbiteTableCellTheme>;
}

export const TableBody: FC<TableBodyProps> = ({children, className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.table.body, customTheme);

    return (
        <tbody className={twMerge(theme.base, className)} {...props}>
        {children}
        </tbody>
    );
};
