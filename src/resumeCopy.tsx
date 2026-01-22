import { ResumeType } from "@/modules/resume/ResumePage.types";

export const RESUME: ResumeType = {
    header: {
        name: "Obatola Seward-Evans",
        items: [
            { icon: "Call", content: <a href="tel:5104598051" target="_blank" rel="noopener noreferrer">510.459.8051</a> },
            { icon: "Mail", content: <a href="mailto:oba.seward@gmail.com" target="_blank" rel="noopener noreferrer">oba.seward@gmail.com</a> },
            { icon: "LogoLinkedin", content: <a href="https://linkedin.com/in/obatola" target="_blank" rel="noopener noreferrer">linkedin.com/in/obatola</a> },
            { icon: "Globe", content: <a href="https://obatola.com" target="_blank" rel="noopener noreferrer">obatola.com</a> },
            { icon: "Location", content: <a href="https://maps.app.goo.gl/E2CcqNXRWG1JLNU66" target="_blank" rel="noopener noreferrer">Brooklyn, NY</a> },
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
                            Frontend engineer focused on owning and evolving complex product surfaces,
                            building thoughtful, well-crafted interfaces in close collaboration with design and product.
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
                    company: <a href="https://cinder.co/" target="_blank" rel="noopener noreferrer">Cinder</a>,
                    date: "05/2023 - Present",
                    location: "New York, NY",
                    children: (
                        <>
                            <p>
                                Cinder is a unified trust & safety operations platform that helps
                                companies manage review workflows, investigations, and policy
                                enforcement at scale.
                            </p>
                            <ul>
                                <li>
                                    Owned and led long-term frontend development across Cinder&apos;s most critical
                                    reviewer-facing surfaces, shaping product discovery and implementation through
                                    close collaboration with customers across core review, QA, and the Bolt design system.
                                </li>
                                <li>
                                    Led an in-place visual refresh of the entire Cinder frontend in close
                                    partnership with design, rolling out changes safely behind feature
                                    flags and enabling the platform to support the company&apos;s transition
                                    from five-figure to multi-million-dollar enterprise deals.
                                </li>
                                <li>
                                    Defined and delivered One Review, a unified experience that brings
                                    decision, review, and investigation workflows into a single cohesive
                                    surface shared across moderation flows.
                                </li>
                                <li>
                                    Created and evolved Bolt, Cinder&apos;s component library and design system,
                                    establishing shared UI patterns and foundations that scaled frontend
                                    development across the application.

                                </li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'experience',
                    title: "Software Engineer",
                    company: <a href="https://www.doordash.com/" target="_blank" rel="noopener noreferrer">DoorDash</a>,
                    date: "06/2021 - 09/2022",
                    location: "San Francisco Bay Area",
                    children: (
                        <>
                            <p>
                                DoorDash is a global online food ordering and food delivery platform.
                            </p>
                            <ul>
                                <li>
                                    Took ownership of the login and signup web application, which was
                                    previously under-maintained and difficult to extend.
                                </li>
                                <li>
                                    Redesigned core frontend architecture to increase developer
                                    velocity by ~60% and improve site performance by ~5% using
                                    React and TypeScript.
                                </li>
                                <li>
                                    Shipped product experiments and user flow improvements that
                                    generated over $1M in annual revenue, including a Bypass Login
                                    feature resulting in a $700k lift.
                                </li>
                                <li>
                                    Designed guided authentication flows that improved successful
                                    logins and signups by 2.7%.
                                </li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'experience',
                    title: "Software Engineer II",
                    company: <a href="https://community.f5.com/kb/technicalarticles/what-is-shape-security/284359" target="_blank" rel="noopener noreferrer">Shape Security</a>,
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
                                    Designed and developed features for Shape&apos;s web protection dashboard,
                                    enabling customers to configure security solutions and analyze real-time
                                    traffic and attack patterns.
                                </li>
                                <li>
                                    Built supporting tooling and security-sensitive features, including
                                    automated reporting pipelines and protections such as domain whitelisting
                                    and session timeouts.
                                </li>
                            </ul>
                        </>
                    )
                },
                {
                    type: 'experience',
                    disabled: true,
                    title: "Data Engineering Intern",
                    company: <a href="https://www.optum.com/" target="_blank" rel="noopener noreferrer">Optum</a>,
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
                    disabled: true,
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
                    technologies: ["ReactJS", "TypeScript", "Javascript", "GraphQL", "HTML / CSS", "Python", "Node.js", "GCP", "Java"]
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
                    url: <a href="https://www.obatola.com/" target="_blank" rel="noopener noreferrer">https://www.obatola.com/</a>,
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
                    url: <a href="https://obatola.github.io/dice/" target="_blank" rel="noopener noreferrer">https://obatola.github.io/dice/</a>,
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
                    title: "Data Collection Website",
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
