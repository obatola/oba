import react, { useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';
import { IExperience, professionalExperience } from '../../copy';
import { Section, Spacer } from '../../styles';
import { GoldenLink } from './Components/GoldenLinks';
import { TechnologiesPanel } from './Components/TechnologiesPanel';

export const ProfessionalExperienceSection = () => (
    <Section id="professional-experience-section">
        <h2>Professional Experience</h2>
        <ExperienceAccordion />
    </Section>
);

interface IExperienceAccordionEntryProps {
    experience: IExperience;
    isActive: boolean;
    onEntryClick: () => void;
}

const ExperienceAccordionEntry = ({experience: exp, isActive, onEntryClick}: IExperienceAccordionEntryProps) => {
    return ( 
        <AccordionEntry isActive={isActive}>
            <AccordionHeader onClick={onEntryClick}>
                <AccordionTitle>
                    <span>
                        {exp.position}&nbsp;
                        <CompanySpan>@&nbsp;
                            <GoldenLink href={exp.companyURL}>{exp.companyName}</GoldenLink>
                        </ CompanySpan>
                    </span>
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </AccordionTitle>
                <OpenCloseIconContainer>{isActive ? '+' : '-'}</OpenCloseIconContainer>
            </AccordionHeader>
            <AccordionContent isActive={isActive}>
                {exp.content}
                <Spacer bottom='15px' />
                <TechnologiesPanel technologies={exp.tech} />
            </AccordionContent>
        </AccordionEntry>
    );
}

const OpenCloseIconContainer = styled.span`
    align-self: center;
`

const ExperienceAccordion = () => {
    const [activeEntry, setActiveEntry] = useState<number | null>(null);

    const entryClicked = (index: number) => () => {
        setActiveEntry(activeEntry === index ? null : index);
    }

    const content = professionalExperience.map((exp: IExperience, i) =>
        <ExperienceAccordionEntry experience={exp} isActive={activeEntry === i} onEntryClick={entryClicked(i)} />)

    return (
        <AccordionWrapper>
            {content} 
        </AccordionWrapper>
    );
}

const Text = styled.p`
    margin: 0;
    font-size: 1rem;
`

const AccordionWrapper = styled.div`
    width: 100%;
`;

interface IIsActiveProps {
    isActive: boolean;
}

const AccordionEntry = styled.div<IIsActiveProps>`
    margin: 10px auto;
`;

const AccordionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: var(--accordion-header-color);
    cursor: pointer;
`;

const AccordionTitle = styled.h3`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    width: 90%;
`;

const AccordionContent = styled.div<IIsActiveProps>`
    ${({isActive}: IIsActiveProps) => {
        if (isActive) {
            return css`
                // height: 250px; // TODO: make dynamic
                overflow: hidden;
                padding: 30px 20px;
                margin-top: 10px;

                p:first-child {
                    margin-top: 0;
                }
            `;
        }

        return css`
            height: 0px;
            overflow: hidden;
            margin: 0;
            padding: 0 20px;
        `;
    }};

    // transition: all cubic-bezier(.4,0,.2,1) .4s;
    font-size: 1rem;
    background-color: var(--accordion-content-background-color);
`;

const CompanySpan = styled.span`
    color: var(--gold-accent);
    display: inline-block;
`;
