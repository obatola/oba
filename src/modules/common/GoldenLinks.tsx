
import react from 'react';
import styles from './GoldenLinks.module.css';


interface IProps {
    href?: string;
    children: React.ReactNode;
}

export const GoldenLink = ({href, children}: IProps) => {
    if (href) {
        return (
            <a className={styles.link} target='_blank' href={href} rel="noreferrer">
                {children}
            </a>
        );
    }

    return <span className={styles.text}>{children}</span>;
}