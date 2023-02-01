import React from 'react';
import { clsx } from 'clsx';
import styles from '../../styles/TechnologiesPanel.module.css';

interface ITechnologiesPanelProps {
    technologies: string[];
    simple?: boolean;
}

export const TechnologiesPanel = ({technologies, simple}: ITechnologiesPanelProps) => {
    const techDoms = technologies.map((name, index) => (
        <span key={`${index}${name}`} className={clsx({
            [styles.textBubbleSimple]: simple,
            [styles.textBubbleNormal]: !simple
        })}>
            {name}
        </span>
    ))

    return <div className={`${styles.textBubbleContainer} textBubbleContainer`}>{techDoms}</div>
}