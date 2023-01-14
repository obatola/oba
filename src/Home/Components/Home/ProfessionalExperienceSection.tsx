import react, { useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';
import { IExperience, professionalExperience } from '../../copy';
import { Section, Spacer } from '../../styles';

const Text = styled.p`
    margin: 0;
    font-size: 20px;
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
    background-color: #323c4b;
    cursor: pointer;
`;

const AccordionTitle = styled.div`
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
    font-size: 16px;
    background-color: #805a53;
`;

const CompanySpan = styled.span`
    color: var(--gold-accent);
    display: inline-block;
`;

const CompanyNameNLink = styled.a`
    color: var(--gold-accent);
    position: relative;
    display: inline-block;

    :after {
        content: "";
        display: block;
        background-color: var(--gold-accent);
        width: 0;
        height: 1px;
        bottom: 0.37em;
        transition: var(--transition);
    }

    :hover {
        color: var(--gold-accent);

        :after {
            width: 100%;
        }
    }
`;

interface IExperienceAccordionEntryProps {
    experience: IExperience;
    isActive: boolean;
    onEntryClick: () => void;
}

interface ITechnologiesPanelProps {
    technologies: string[];
}

const TextBubble = styled.span`
    font-family: "SF Mono","Fira Code","Fira Mono","Roboto Mono",monospace;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #57456A;
`;

const TextBubbleContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    ${TextBubble} {
        margin: 0 15px 6px 0;
    }
`;

const TechnologiesPanel = ({technologies}: ITechnologiesPanelProps) => {
    const techDoms = technologies.map((name) => <TextBubble>{name}</TextBubble>)

    return <TextBubbleContainer>{techDoms}</TextBubbleContainer>
}

const ExperienceAccordionEntry = ({experience: exp, isActive, onEntryClick}: IExperienceAccordionEntryProps) => {
    const companyNameDom = exp.companyURL ?
        (
            <CompanyNameNLink target='_blank' href={exp.companyURL}>
                {exp.companyName}
            </CompanyNameNLink>
        ) : 
        exp.companyName;

    return ( 
        <AccordionEntry isActive={isActive}>
            <AccordionHeader onClick={onEntryClick}>
                <AccordionTitle>
                    <span>
                        {exp.position}&nbsp;
                        <CompanySpan>@&nbsp;
                            {companyNameDom}
                        </ CompanySpan>
                    </span>
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </AccordionTitle>
                <span>{isActive ? '+' : '-'}</span>
            </AccordionHeader>
            <AccordionContent isActive={isActive}>
                {exp.content}
                <Spacer bottom='15px' />
                <TechnologiesPanel technologies={exp.tech} />
            </AccordionContent>
        </AccordionEntry>
    );
}

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

export const ProfessionalExperienceSection = () => (
    <Section>
        <h2>Professional Experience</h2>
        <ExperienceAccordion />
    </Section>
)