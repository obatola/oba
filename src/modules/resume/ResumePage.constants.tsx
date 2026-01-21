import { ResumeType } from "./ResumePage.types";

export const RESUME: ResumeType = {
    header: {
        name: "Obatola Seward-Evans",
        items: [
            { icon: "Call", content: "510 459 8051" },
            { icon: "Mail", content: "oba.seward@gmail.com" },
            { icon: "Link", content: "linkedin.com/in/obatola | obase.weebly.com" },
            { icon: "Location", content: "Brooklyn, NY" },
        ]
    },
    mainPanel: [
        {
            title: "About Me",
            content: [
                {
                    type: 'generic',
                    children: (
                        <p>
                            I&apos;m a frontend engineer. I have a passion for creating clean, intuitive,
                            and elegant user flows, designs, applications and code.
                        </p>
                    )
                }
            ]
        },
        {
            title: "Experience",
            content: [
                {
                    type: 'experience',
                    title: "Software Engineer",
                    company: "DoorDash",
                    date: "06/2021 - 09/2022",
                    location: "San Francisco Bay Area",
                    children: (
                        <>
                            <p>
                                DoorDash is a global online food ordering and food delivery platform
                            </p>
                            <ul>
                                <li>
                                    When joining, the login and sign up page was minimally maintained,
                                    poorly tested, and lead to convoluted development.
                                </li>
                                <li>
                                    Took over the login and sign up web app and redesigned the internal
                                    code base to increase developer velocity by 60% and increase site
                                    speed by 5% using React JS and Typescript
                                </li>
                                <li>
                                    Added E2E testing to improve trust of the project / code /
                                    deployments
                                </li>
                                <li>
                                    Added experimental features that lead to over $1,000,000 in annual
                                    revenue
                                </li>
                                <li>
                                    In order to alleviate the frustrations of legitimate customers who
                                    are having trouble logging in, we implemented a Bypass Login
                                    feature that lead to a $700k annual lift in orders.
                                </li>
                                <li>
                                    Created a guided sign up and login flow to guide users attempting
                                    to log in with unknown accounts and users attempting to sign up
                                    with known accounts down the right path. This lead to a 2.7% lift
                                    in user logins and signups.
                                </li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'experience',
                    title: "Software Engineer II",
                    company: "Shape Security",
                    date: "02/2018 - 05/2021",
                    location: "San Francisco Bay Area",
                    children: (
                        <>
                            <p>
                                Shape Security provides best-in-class cybersecurity to protect your
                                enterprise from automated attacks on web and mobile apps
                            </p>
                            <ul>
                                <li>
                                    Designed and developed features for Shape&apos;s web protection dashboard
                                    to customize Shape&apos;s security solutions as well as visualize,
                                    analyze, and comprehend real-time traffic and attack patterns
                                </li>
                                <li>
                                    Worked with Google Cloud Function and Google App Engine to create a
                                    scheduled report downloader, to automate previously manually
                                    generated weekly reports
                                </li>
                                <li>
                                    Implemented security-sensitive features such as Domain Whitelist
                                    Validation and User Session Timeout to better secure the web
                                    dashboard
                                </li>
                                <li>
                                    Built Chrome Extension in React, NodeJS to interact with their main
                                    platform to simulate web entries
                                </li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'experience',
                    title: "Data Engineering Intern",
                    company: "Optum",
                    date: "06/2017 - 08/2017",
                    location: "Boston, MA",
                    children: (
                        <>
                            <p>Optum helps modernize the health system&apos;s infrastructure.</p>
                            <ul>
                                <li>
                                    Transformed the existing Oracle SQL based ETL process to Spark on
                                    Hadoop to accelerate the process and scalability of electronic
                                    medical records
                                </li>
                                <li>
                                    Reached 300% increase in time to create and complete an ETL spec
                                </li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'experience',
                    title: "iOS Developer",
                    company: "Step Champion",
                    date: "06/2016 - 10/2016",
                    location: "San Francisco Bay Area",
                    children: (
                        <>
                            <ul>
                                <li>
                                    Served as a front-end mobile iOS developer to build UI and connect
                                    it to back-end. Created new icon and color manager to handle
                                    different themes.
                                </li>
                            </ul>
                        </>
                    )
                },
            ]
        },
    ],
    rightPanel: [
        {
            title: "Technologies",
            content: [
                {
                    type: 'technologies',
                    technologies: ["ReactJS", "Typescript", "Javascript", "NodeJS", "GCP", "Java", "Python", "HTML / CSS"]
                }
            ]
        },
        {
            title: "Achievements",
            content: [
                {
                    type: 'achievements',
                    achievements:
                        [
                            { icon: "Code", content: "Upsilon Pi Epsilon (International Computer Science Honors Society)" },
                            { icon: "Hammer", content: "Eagle Scout in the Boy Scouts of America" },
                        ]
                }
            ]
        },
        {
            title: "Projects",
            content: [
                {
                    type: 'project',
                    title: "Personal Website",
                    url: "https://www.obatola.com/",
                    children: (
                        <>
                            <p>
                                Designed personal website in Sketch and implemented using NextJS.
                                Used as a location showcase my work and a quick place to spin up
                                small test projects.
                            </p>
                        </>
                    )
                },
                {
                    type: 'project',
                    title: "Dice Roller",
                    url: "https://obatola.github.io/dice/",
                    children: (
                        <>
                            <p>Website created to allow people roll sets of die.</p>
                            <ul>
                                <li>
                                    Allows users to pick from a range of dice, customize color and save
                                    sets for use later
                                </li>
                                <li>Created using React and hosted on github using gh-pages</li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'project',
                    title: "Data Collection Website - AngularJS",
                    url: "tiny.cc/ve-collect",
                    children: (
                        <>
                            <ul>
                                <li>
                                    Website created to help users collect information about over 180
                                    Venetian Bell Towers in Venice, Italy
                                </li>
                                <li>Created using AngularJS interfacing with Firebase</li>
                            </ul>
                        </>
                    )
                }
            ]
        },
        {
            title: "Education",
            content: [
                {
                    type: 'education',
                    degree: "Bachelor of Science in Computer Science",
                    school: "Worcester Polytechnic Institute (WPI)",
                    date: "08/2014 - 05/2018",
                    gpa: "3.66 / 4"
                }
            ]
        },
        {
            title: "Courses",
            content: [
                {
                    type: 'generic',
                    children: (
                        <p>
                            Software Engineering, Algorithms, Object-Oriented Design Concepts,
                            Mobile &amp; Ubiquitous Computing, Artificial Intelligence, Database
                            Systems, Computer Networks, Operating Systems, Systems Programming,
                            Privacy Protection Technology
                        </p>
                    )
                }
            ]
        }
    ]
}