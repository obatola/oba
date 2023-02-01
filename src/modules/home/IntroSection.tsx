import { HOME_PAGE_ANCHORS } from '@/constants/homeConstants';
import { homeCopy } from '@/copy';
import React from 'react';
import styles from '../../styles/IntroSection.module.css';


export const IntroSection = () => (
    <section id={HOME_PAGE_ANCHORS.about} className={styles.sectionWrapper}>
        <p className={styles.text}>{homeCopy.intro.greeting}</p>
        <div className={styles.titleContainer}>
            <h2 className={styles.title}>{homeCopy.intro.name}</h2>
            <p className={styles.subTitle}>{homeCopy.intro.subtitle}</p>
        </div>
        <p className={styles.text}>{homeCopy.intro.description}</p>
    </section>
);