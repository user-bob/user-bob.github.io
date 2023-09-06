import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {FlowbiteTableHeadCellTheme} from './TableHeadCell';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteTableHeadTheme {
    base: string;
    cell: FlowbiteTableHeadCellTheme;
}

export interface TableHeadProps extends PropsWithChildren, ComponentProps<'thead'> {
    theme?: DeepPartial<FlowbiteTableHeadTheme>;
}

export const TableHead: FC<TableHeadProps> = ({children, className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.table, customTheme);

    return (
        <thead className={twMerge(theme.head.base, className)} {...props}>
        <tr>{children}</tr>
        </thead>
    );
};
