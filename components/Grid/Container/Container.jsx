import { cleanClassName } from '@/lib/cleanClassName';
import styles from './Container.module.scss';

export const Container = props => {
    const { children, large, small, className, style } = props;

    return (
        <div
            style={style}
            className={cleanClassName(
                `${styles['container']} ${className ? className : ''} ${large ? styles['large'] : ''} ${
                    small ? styles['small'] : ''
                }`,
            )}
        >
            {children}
        </div>
    );
};
