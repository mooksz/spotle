import { cleanClassName } from '@/lib/cleanClassName';
import styles from './Row.module.scss';

export const Row = props => {
    const {
        children,
        className,
        style,
        alignCenter,
        alignStart,
        alignEnd,
        justifyCenter,
        justifyStart,
        justifyEnd,
        noMargin,
    } = props;

    return (
        <div
            style={style}
            className={cleanClassName(
                `${styles['row']} ${className ? className : ''} ${alignCenter ? styles['align-center'] : ''} ${
                    alignStart ? styles['align-start'] : ''
                } ${alignEnd ? styles['align-end'] : ''} ${justifyCenter ? styles['justify-center'] : ''} ${
                    justifyStart ? styles['justify-start'] : ''
                } ${justifyEnd ? styles['justify-end'] : ''} ${noMargin ? styles['no-margin'] : ''}`,
            )}
        >
            {children}
        </div>
    );
};
