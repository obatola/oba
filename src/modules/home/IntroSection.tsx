import { HOME_PAGE_ANCHORS } from '@/constants/homeConstants';
import React from 'react';
import styles from './IntroSection.module.css';


export const IntroSection = () => (
    <section id={HOME_PAGE_ANCHORS.about} className={styles.sectionWrapper}>
        <p className={styles.text}>Hi, my name is</p>
        <div className={styles.titleContainer}>
            <h2 className={styles.title}>Oba Seward-Evans</h2>
            <p className={styles.subTitle}>I help companies launch and grow their products</p>
        </div>
        <p className={styles.text}>I'm a full stack engineer with a heavy focus in frontend development based out of Brooklyn, NY. I have a passion for creating clean, intuitive, and elegant user ﬂows, designs, applications and code.</p>
    </section>
);