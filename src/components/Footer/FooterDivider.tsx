import type {ComponentProps, FC} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteFooterDividerTheme {
    base: string;
}

export interface FooterDividerProps extends ComponentProps<'hr'> {
    theme?: DeepPartial<FlowbiteFooterDividerTheme>;
}

export const FooterDivider: FC<FooterDividerProps> = ({className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.footer.divider, customTheme);

    return <hr data-testid="footer-divider" className={twMerge(theme.base, className)} {...props} />;
};
