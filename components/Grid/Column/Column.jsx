import { cleanClassName } from '@/lib/cleanClassName';
import styles from './Column.module.scss';

export const Column = props => {
    const {
        children,
        className,
        col,
        sm,
        md,
        lg,
        xl,
        offset,
        offsetSM,
        offsetMD,
        offsetLG,
        offsetXL,
        style,
        noPadding,
    } = props;

    return (
        <div
            style={style}
            className={cleanClassName(
                `${styles['column']} ${className ? className : ''} ${col ? styles[`col-${col}`] : ''} ${
                    sm ? styles[`col-sm-${sm}`] : ''
                } ${md ? styles[`col-md-${md}`] : ''} ${lg ? styles[`col-lg-${lg}`] : ''} ${
                    xl ? styles[`col-xl-${xl}`] : ''
                } ${offset || offset === 0 ? styles[`offset-${offset}`] : ''} ${
                    offsetSM || offsetSM === 0 ? styles[`offset-sm-${offsetSM}`] : ''
                } ${offsetMD || offsetMD === 0 ? styles[`offset-md-${offsetMD}`] : ''} ${
                    offsetLG || offsetLG === 0 ? styles[`offset-lg-${offsetLG}`] : ''
                } ${offsetXL || offsetXL === 0 ? styles[`offset-xl-${offsetXL}`] : ''} ${
                    noPadding ? styles['no-padding'] : ''
                }`,
            )}
        >
            {children}
        </div>
    );
};
