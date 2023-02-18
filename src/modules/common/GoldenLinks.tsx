import styles from "../../styles/GoldenLinks.module.css";

interface IProps {
    href?: string;
    children: React.ReactNode;
    disableLink?: boolean;
}

export const GoldenLink = ({ href, children, disableLink }: IProps) => {
    if (href && !disableLink) {
        return (
            <a
                className={styles.link}
                target="_blank"
                href={href}
                rel="noreferrer"
            >
                {children}
            </a>
        );
    }

    return <span className={styles.text}>{children}</span>;
};
