import styles from './List.module.css';
import { requireContext } from '@utils/helpers';
import ListContext from './List.context';
import { PropsWithChildren } from 'react';

export type ListItemProps = PropsWithChildren &
    React.HTMLAttributes<HTMLDivElement> & {
        index?: number;
        styles?: ListItemStyles;
    };

type ListItemStyles = {
    size: 'sizeSmall' | 'sizeMedium' | 'sizeLarge';
};

const ListItem: React.FC<ListItemProps> = ({ className, ...props }) => {
    const listContext = requireContext(ListContext);

    const styling = props.styles ?? {
        size: 'sizeMedium',
    };

    const classes = [className, styles['listItem'], styles[styling.size]].join(' ');

    return (
        <div
            onMouseEnter={() => {
                listContext.setIndex(props.index ?? -1);
            }}
            className={classes}
            {...props}
        >
            {props.children}
        </div>
    );
};

export default ListItem;
