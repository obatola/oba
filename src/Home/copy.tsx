import React from 'react';
import { Url } from 'url';

export interface ICSProject {
    name: string;
    date: string;
    tech: string[];
    content: JSX.Element | string;
    imageURL?: string;
    githubURL?: string;
    url?: string;
}

export interface IExperience {
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    location: string;
    tech: string[];
    companyURL?: string;
    content: JSX.Element;
}


export const professionalExperience: IExperience[] = [
    {
        companyName: 'Doordash',
        companyURL: 'https://www.doordash.com/',
        position: 'Software Engineer',
        startDate: '2021',
        endDate: '2022',
        location: 'San Francisco, CA',
        tech: ['ReactJS', 'Typescript', 'Javascript', 'Kotlin'],
        content: (
            <>
                <p>DoorDash is a global online food ordering and food delivery platform</p>
                <ul>
                    <li>When joining, the login and sign up page was minimally maintained, poorly tested, and lead to convoluted development.</li>
                    <li>Took over the login and sign up web app and redesigned the internal code base to increase developer velocity by 60% and increase site speed by 5% using React JS and Typescript</li>
                    <li>Added E2E testing to improve trust of the project / code / deployments</li>
                    <li>Added experimental features that lead to over $1,000,000 in annual revenue</li>
                    <li>In order to alleviate the frustrations of legitimate customers who are having trouble logging in, we implemented a Bypass Login feature that lead to a $700k annual lift in orders.</li>
                    <li>Created a guided sign up and login ﬂow to guide users attempting to log in with unknown accounts and users attempting to sign up with known accounts down the right path. This lead to a 2.7% lift in user logins and signups.</li>
                </ul>
            </>
        )
    },
    {
        companyName: 'F5 / Shape Security',
        companyURL: 'https://www.f5.com/products',
        position: 'Software Engineer II',
        startDate: '2018',
        endDate: '2021',
        location: 'Mountain View, CA',
        tech: ['React', 'Redux', 'Typescript', 'Javascript', 'Storybook', 'Java', 'GCP'],
        content: (
            <>
                <p>Shape Security provides best-in-class cybersecurity to protect your enterprise from automated attacks on web and mobile apps.</p>
                <ul>
                    <li>Designed and developed features for Shapes’ web protection dashboard to customize Shape’s security solutions as well as visualize, analyze, and comprehend real-time traﬃc and attack patterns</li>
                    <li>Worked with Google Cloud Function and Google App Engine to create a scheduled report downloader, to automate previously manually generated weekly reports</li>
                    <li>Implemented security-sensitive features such as Domain Whitelist Validation and User Session Timeout to better secure the web dashboard</li>
                    <li>Built Chrome Extension in React, NodeJS to interact with their main platform to simulate web entries</li>
                </ul>
            </>
        )
    },
    {
        companyName: 'Optum',
        companyURL: 'https://www.unitedhealthgroup.com/people-and-businesses/businesses/optum.html',
        position: 'Data Engineering Intern',
        startDate: '2017',
        endDate: '2017',
        location: 'Boston, MA',
        tech: ['Scala'],
        content: (
            <>
                <p>Optum helps modernize the health system's infrastructure.</p>
                <ul>
                    <li>Transformed the existing Oracle SQL based ETL process to Spark on Hadoop to accelerate the process and scalability of electronic medical records</li>
                    <li>Reached 300% increase in time to create and complete an ETL spec</li>
                </ul>
            </>
        )
    },
    {
        companyName: 'Step Champion',
        position: 'iOS Developer',
        startDate: '2016',
        endDate: '2016',
        location: 'Oakland, CA',
        tech: ['Scala', 'Swift'],
        content: (
            <>
                <p>Served as a front-end mobile iOS developer to build UI and connect it to back-end. Created new icon and color manager to handle diﬀerent themes.</p>
            </>
        )
    },
];