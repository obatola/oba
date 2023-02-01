import react, { useState } from "react";
import { homeCopy, IExperience } from "@/copy";
import { clsx } from 'clsx';
import { GoldenLink } from "../common/GoldenLinks";
import styles from '../../styles/ProfessionalExperience.module.css';
import { Spacer, SPACER_SIZE } from "../common/Spacer";
import { TechnologiesPanel } from "../common/TechnologiesPanel";
import { HOME_PAGE_ANCHORS } from "@/constants/homeConstants";


export const ProfessionalExperienceSection = () => (
    <section className="home-section" id={HOME_PAGE_ANCHORS.work}>
        <h2>{homeCopy.professionalExperience.title}</h2>
        <ExperienceAccordion />
    </section>
);

const ExperienceAccordion = () => {
    const [activeEntry, setActiveEntry] = useState<number | null>(null);

    const entryClicked = (index: number) => () => {
        setActiveEntry(activeEntry === index ? null : index);
    }

    const content = homeCopy.professionalExperience.experienceArr.map((exp: IExperience, i) =>
        <ExperienceAccordionEntry key={exp.companyName} experience={exp} isActive={activeEntry === i} onEntryClick={entryClicked(i)} />)

    return (
        <div className={styles.accordionWrapper}>
            {content} 
        </div>
    );
}

interface IExperienceAccordionEntryProps {
    experience: IExperience;
    isActive: boolean;
    onEntryClick: () => void;
}

const ExperienceAccordionEntry = ({experience: exp, isActive, onEntryClick}: IExperienceAccordionEntryProps) => {
    return ( 
        <div className={styles.accordionEntry}>
            <div className={styles.accordionHeader} onClick={onEntryClick}>
                <h3 className={styles.accordionTitle}>
                    <span>
                        {exp.position}&nbsp;
                        <span className={styles.companySpan}>@&nbsp;
                            <GoldenLink href={exp.companyURL} disableLink>{exp.companyName}</GoldenLink>
                        </ span>
                    </span>
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </h3>
                <span className={styles.openCloseIconContainer}>{isActive ? '+' : '-'}</span>
            </div>
            <div className={clsx({
                [styles.accordionContentActive]: isActive,
                [styles.accordionContentInactive]: !isActive,
            })}>
                {exp.content}
                <Spacer bottom={SPACER_SIZE.medium} />
                <TechnologiesPanel technologies={exp.tech} />
            </div>
        </div>
    );
}