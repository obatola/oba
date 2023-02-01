import React from 'react';

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

const intro = {
    greeting: 'Hi, my name is',
    name: 'Oba Seward-Evans',
    subtitle: 'I help companies launch and grow their products',
    description: "I'm a full stack engineer with a heavy focus in frontend development based out of Brooklyn, NY. I have a passion for creating clean, intuitive, and elegant user ﬂows, designs, applications and code.",
}

const professionalExperience: IExperience[] = [
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

export interface ICSProject {
    name: string;
    date: string;
    tech: string[];
    content: JSX.Element | string;
    projectImageKey: string;
    githubURL?: string;
    downloadURL?: string;
    url?: string;
    isFeatured?: boolean;
}

const csProjects: ICSProject[] = [
    {
        name: 'Personal Website',
        date: '2023',
        tech: ['NextJS', 'ReactJS', 'Typescript'],
        content: 'Redesigned my personal website designed in Sketch and implimented using NextJS. I plan to use it as a place to showcase my work and also utilize as a quick place to spin up small test projects.',
        projectImageKey: 'personalWebsite',
        isFeatured: true,
    },
    {
        name: 'Dice Roller',
        date: '2022',
        tech: ['ReactJS', 'Typescript'],
        content: 'Website created to allow people to roll variable sets of die. It allows users to pick from a range of dice, customize color and save sets for use later. It was created using React and hosted on github using gh-pages',
        githubURL: 'https://github.com/obatola/dice',
        url: 'https://obatola.github.io/dice/',
        projectImageKey: 'diceRoller',
        isFeatured: true,
    },
    {
        name: 'Global Todo',
        date: '2017',
        tech: ['Javascript', 'MongoDB', 'jQuery', 'HTML', 'CSS', 'NodeJS', 'Express', 'EJS'],
        content: 'Small project I created to refresh node.js, express, and MongoDB skills. This is a global todo list where anybody can post an item.',
        githubURL: 'https://github.com/obatola/web-todo-list',
        // url: 'https://oba-todo.herokuapp.com/', // TODO: Rehost Project or recreate
        projectImageKey: 'globalTodo',
    },
    {
        name: 'Venetian Bell Tower Data Collection App',
        date: '2016',
        tech: ['AngularJS', 'Firebase', 'Javascript'],
        content: 'In the process of developing the data collection application for my WPI Venice Project team. I have a working demo version live at the following url tiny.cc/ve-collect. This application is used by the Venice Project Center to collect data of Venetian Bell Towers in Venice.',
        projectImageKey: 'venetianBellTower',
        isFeatured: true,
    },
    {
        name: 'Venice Bell Tower Website',
        date: '2016',
        tech: ['AngularJS', 'Firebase', 'Javascript'],
        content: 'Revitalizing a website that showcases venetian bell towers. The original website is functional but really lacks any eye catching design. With a little help of Bootstrap I created a mockup version that I will soon integrate with the actual site.',
        projectImageKey: 'veniceBells',
        url: 'http://sample-bells.s3-website-us-east-1.amazonaws.com/#/moreInfo/dffb615e-8a01-afa0-984a-cd7dce25bacf/64a1d94d-c362-87b9-ea17-1feca10dedb4',
        isFeatured: true,
    },
    {
        name: 'TapTapWars',
        date: '2016',
        tech: ['Swift', 'XCode'],
        content: 'A little game where 2 players tap as fast as they can on their half of the screen. The game is a tug of war where one players tap increments the score while the other decrements it. If the blue player reaches 10 before the red reaches -10 he wins.',
        projectImageKey: 'tapTapWars',
        githubURL: 'https://github.com/obatola/iOS-TapWar',
    },
    {
        name: 'iPhone Calculator',
        date: '2016',
        tech: ['Swift', 'XCode'],
        content: 'Moving forward from the Java Calculator, I created a similar calculator for iOS using Swift.',
        projectImageKey: 'iosCalculator',
        githubURL: 'https://github.com/obatola/iOS-Calculator',
    },
    {
        name: 'Java Calculator',
        date: '2016',
        tech: ['Java',],
        content: 'Created a calculator with Java. In order to use the application, download the runnable jar or mac app below.',
        projectImageKey: 'javaCalculator',
        githubURL: 'https://github.com/obatola/OSE-Calculator',
    },
    {
        name: 'KabaSuji',
        date: '2016',
        tech: ['Java',],
        content: 'My four partners and I used Java to create a shape puzzle game similar to Tangrams. Click the button below to see the progress!.',
        projectImageKey: 'kabaSuji',
        githubURL: 'https://github.com/baby-wpi/menelaus',
    },
    {
        name: 'Deuces Solitaire',
        date: '2016',
        tech: ['Java',],
        content: 'Solitaire variation I created using Java.',
        projectImageKey: 'deucesSolitaire',
        githubURL: 'https://github.com/obatola/Deuces.git',
        downloadURL: 'https://obase.weebly.com/uploads/5/6/0/4/56044521/ose_deuces.jar'
    },
    {
        name: 'Sci-Fi SpaceOctopi',
        date: '2015',
        tech: ['Java',],
        content: 'Sci-Fi SpaceOctopi is a small playable visual novel, written in Python. I wrote the majority of the code and created all of the character art and the logo.',
        projectImageKey: 'scifiSpaceOctopi',
    },
    {
        name: 'Distance Vector Routing Protocol',
        date: '2015',
        tech: ['C',],
        content: 'I implement a distributed asynchronous distance vector (DV) routing protocol. I wrote the sending and receiving IP-level messages for routing data over a network.',
        projectImageKey: 'distanceVector',
        downloadURL: 'https://obase.weebly.com/uploads/5/6/0/4/56044521/oasewardevans_dvrp.zip',
    },
]

export const homeCopy = {
    intro,
    professionalExperience: {
        title: 'Professional Experience',
        experienceArr: professionalExperience,
    },
    projects: {
        featuredProjectsTitle: "Projects I've Worked On",
        projectsArr: csProjects,
        normalProjectsTitle: 'Other Projects'
    }
}