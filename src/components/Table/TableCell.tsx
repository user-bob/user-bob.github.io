import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteTableCellTheme {
    base: string;
}

export interface TableCellProps extends PropsWithChildren, ComponentProps<'td'> {
    theme?: DeepPartial<FlowbiteTableCellTheme>;
}

export const TableCell: FC<TableCellProps> = ({children, className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.table.body.cell, customTheme);

    return (
        <td className={twMerge(theme.base, className)} {...props}>
            {children}
        </td>
    );
};
