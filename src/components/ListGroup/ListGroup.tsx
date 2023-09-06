import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {FlowbiteListGroupItemTheme} from './ListGroupItem';
import {ListGroupItem} from './ListGroupItem';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteListGroupTheme {
    root: FlowbiteListGroupRootTheme;
    item: FlowbiteListGroupItemTheme;
}

export interface FlowbiteListGroupRootTheme {
    base: string;
}

export interface ListGroupProps extends PropsWithChildren, ComponentProps<'ul'> {
    theme?: DeepPartial<FlowbiteListGroupTheme>;
}

const ListGroupComponent: FC<ListGroupProps> = ({children, className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.listGroup, customTheme);

    return (
        <ul className={twMerge(theme.root.base, className)} {...props}>
            {children}
        </ul>
    );
};

ListGroupComponent.displayName = 'ListGroup';
ListGroupItem.displayName = 'ListGroup.Item';

export const ListGroup = Object.assign(ListGroupComponent, {Item: ListGroupItem});
