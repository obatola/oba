import react, { useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';

const Text = styled.p`
    margin: 0;
    font-size: 20px;
`

interface IExperience {
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    location: string;
    content: JSX.Element;
}

const experienceLog: IExperience[] = [
    {
        companyName: 'Doordash',
        position: 'Software Engineer',
        startDate: '2021',
        endDate: '2022',
        location: 'San Francisco, CA',
        content: (
            <div>
                <p>DoorDash is a global online food ordering and food delivery platform</p>
                <ul>
                    <li>When joining, the login and sign up page was minimally maintained, poorly tested, and lead to convoluted development.</li>
                    <li>Took over the login and sign up web app and redesigned the internal code base to increase developer velocity by 60% and increase site speed by 5% using React JS and Typescript</li>
                    <li>Added E2E testing to improve trust of the project / code / deployments</li>
                    <li>Added experimental features that lead to over $1,000,000 in annual revenue</li>
                    <li>In order to alleviate the frustrations of legitimate customers who are having trouble logging in, we implemented a Bypass Login feature that lead to a $700k annual lift in orders.</li>
                    <li>Created a guided sign up and login ﬂow to guide users attempting to log in with unknown accounts and users attempting to sign up with known accounts down the right path. This lead to a 2.7% lift in user logins and signups.</li>
                </ul>
            </div>
        )
    },
    {
        companyName: 'F5 / Shape Security',
        position: 'Software Engineer II',
        startDate: '2018',
        endDate: '2021',
        location: 'Mountain View, CA',
        content: (
            <div>
                <p>Shape Security provides best-in-class cybersecurity to protect your enterprise from automated attacks on web and mobile apps.</p>
                <ul>
                    <li>Designed and developed features for Shapes’ web protection dashboard to customize Shape’s security solutions as well as visualize, analyze, and comprehend real-time traﬃc and attack patterns</li>
                    <li>Worked with Google Cloud Function and Google App Engine to create a scheduled report downloader, to automate previously manually generated weekly reports</li>
                    <li>Implemented security-sensitive features such as Domain Whitelist Validation and User Session Timeout to better secure the web dashboard</li>
                    <li>Built Chrome Extension in React, NodeJS to interact with their main platform to simulate web entries</li>
                </ul>
            </div>
        )
    },
    {
        companyName: 'Optum',
        position: 'Data Engineering Intern',
        startDate: '2017',
        endDate: '2017',
        location: 'Boston, MA',
        content: (
            <div>
                <p>Optum helps modernize the health system's infrastructure.</p>
                <ul>
                    <li>Transformed the existing Oracle SQL based ETL process to Spark on Hadoop to accelerate the process and scalability of electronic medical records</li>
                    <li>Reached 300% increase in time to create and complete an ETL spec</li>
                </ul>
            </div>
        )
    },
    {
        companyName: 'Step Champion',
        position: 'iOS Developer',
        startDate: '2016',
        endDate: '2016',
        location: 'Oakland, CA',
        content: (
            <div>
                <p>Served as a front-end mobile iOS developer to build UI and connect it to back-end. Created new icon and color manager to handle diﬀerent themes.</p>
            </div>
        )
    },
];

const AccordionWrapper = styled.div`
    width: 100%;
`;

interface IIsActiveProps {
    isActive: boolean;
}

const AccordionEntry = styled.div<IIsActiveProps>`
    margin: ${({isActive}: IIsActiveProps) => isActive ? '20px auto' : '10px auto'};
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
                // height: 500px;
                overflow: hidden;
                padding: 15px 20px;
                margin-top: 10px;
            `;
        }

        return css`
            height: 0px;
            overflow: hidden;
            margin: 0;
            padding: 0;
        `;
    }};

    // transition: all cubic-bezier(.4,0,.2,1) .4s;
    font-size: 16px;
    background-color: #805a53;
`;

const CompanyName = styled.span`
    color: var(--gold-accent);
`;

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
                    <span>{exp.position} <CompanyName>@ {exp.companyName}</ CompanyName></span>
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </AccordionTitle>
                <span>{isActive ? '+' : '-'}</span>
            </AccordionHeader>
            <AccordionContent isActive={isActive}>
                {exp.content}
            </AccordionContent>
        </AccordionEntry>
    );
}

const ExperienceAccordion = () => {
    const [activeEntry, setActiveEntry] = useState<number | null>(null);

    const entryClicked = (index: number) => () => {
        setActiveEntry(activeEntry === index ? null : index);
    }

    const content = experienceLog.map((exp: IExperience, i) =>
        <ExperienceAccordionEntry experience={exp} isActive={activeEntry === i} onEntryClick={entryClicked(i)} />)

    return (
        <AccordionWrapper>
            {content} 
        </AccordionWrapper>
    );
}

export const ProfessionalExperienceSection = () => (
    <section>
        <Text>Professional Experience</Text>
        <ExperienceAccordion />
    </section>
)