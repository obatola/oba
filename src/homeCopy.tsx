import React from "react";

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
	greeting: "Hi, my name is",
	name: "Oba Seward-Evans",
	subtitle: "I build thoughtful interfaces for complex products",
	description:
		"Frontend engineer with a strong product and design focus, experienced in owning and evolving complex, high-volume SaaS products.",
};

const professionalExperience: IExperience[] = [
	{
		companyName: "Cinder",
		companyURL: "https://www.cinder.co/",
		position: "Software Engineer",
		startDate: "2023",
		location: "Brooklyn, NY",
		tech: ["ReactJS", "Typescript", "Javascript"],
		content: (
			<>
				<p>
					I owned and led frontend development across Cinder’s core reviewer-facing surfaces, working closely with design and customers to shape how trust & safety teams review and investigate content at scale.
				</p>
				<p>
					I led an in-place visual refresh using feature-flagged rollouts, helped unify fragmented review workflows into a cohesive experience, and built foundational UI systems that scaled as the company moved into enterprise.
				</p>
			</>
		),
	},
	{
		companyName: "Doordash",
		companyURL: "https://www.doordash.com/",
		position: "Software Engineer",
		startDate: "2021",
		endDate: "2022",
		location: "San Francisco, CA",
		tech: ["ReactJS", "Typescript", "Javascript", "Kotlin"],
		content: (
			<>
				<p>
					At DoorDash, I worked on high-traffic authentication flows used by millions of users daily.
					I took ownership of an under-maintained login and signup experience and reworked its
					frontend architecture to improve reliability, performance, and development velocity.
				</p>
				<p>
					I partnered closely with product and experimentation teams to ship improvements that
					meaningfully impacted user conversion and business outcomes, while introducing better
					testing and deployment confidence to a critical surface.
				</p>
			</>
		)
	},
	{
		companyName: "F5 / Shape Security",
		companyURL: "https://www.f5.com/products",
		position: "Software Engineer II",
		startDate: "2018",
		endDate: "2021",
		location: "Mountain View, CA",
		tech: [
			"React",
			"Redux",
			"Typescript",
			"Javascript",
			"Storybook",
			"Java",
			"GCP",
		],
		content: (
			<>
				<p>
					At Shape Security, I built and maintained frontend features for a security dashboard used
					to configure and analyze protections against large-scale automated attacks.
				</p>
				<p>
					The work involved visualizing complex traffic patterns, building secure administrative
					tooling, and supporting internal teams with automation and reporting infrastructure.
				</p>
			</>
		),
	},
	{
		companyName: "Optum",
		companyURL:
			"https://www.unitedhealthgroup.com/people-and-businesses/businesses/optum.html",
		position: "Data Engineering Intern",
		startDate: "2017",
		endDate: "2017",
		location: "Boston, MA",
		tech: ["Scala"],
		content: (
			<>
				<p>{"Optum helps modernize the health system's infrastructure."}</p>
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
		),
	},
	{
		companyName: "Step Champion",
		position: "iOS Developer",
		startDate: "2016",
		endDate: "2016",
		location: "Oakland, CA",
		tech: ["Scala", "Swift"],
		content: (
			<>
				<p>
					Served as a front-end mobile iOS developer to build UI and connect it
					to back-end. Created new icon and color manager to handle diﬀerent
					themes.
				</p>
			</>
		),
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
		name: "Cinder Redesign",
		date: "2024",
		tech: ["ReactJS", "Typescript"],
		content:
			(
				<>
					<p>Led the frontend implementation of Cinder’s redesigned product experience, translating a new visual system into scalable, reusable components used across complex moderation workflows.</p>
					<p>The work focused on clarity, consistency, and speed across high-volume review surfaces used daily by trust & safety teams.</p>
				</>
			),
		projectImageKey: "cinderRedesign",
		url: "https://www.cinder.co/blog-posts/bolt-cinder-design-system",
		isFeatured: true,
	},
	{
		name: "Obatola.com",
		date: "2023",
		tech: ["NextJS", "ReactJS", "Typescript"],
		content:
			"A personal playground for exploring visual design, layout, and interaction. I use it to showcase selected work and to experiment with ideas outside of company constraints.",
		projectImageKey: "personalWebsite",
		url: "https://www.obatola.com/",
		githubURL: "https://github.com/obatola/oba",
		isFeatured: true,
	},
	{
		name: "Dice Roller",
		date: "2022",
		tech: ["ReactJS", "Typescript"],
		content:
			"Website created to allow people to roll variable sets of die. It allows users to pick from a range of dice, customize color and save sets for use later. It was created using React and hosted on github using gh-pages",
		githubURL: "https://github.com/obatola/dice",
		url: "https://obatola.github.io/dice/",
		projectImageKey: "diceRoller",
		isFeatured: true,
	},
	{
		name: "Global Todo",
		date: "2017",
		tech: [
			"Javascript",
			"MongoDB",
			"jQuery",
			"HTML",
			"CSS",
			"NodeJS",
			"Express",
			"EJS",
		],
		content:
			"Small project I created to refresh node.js, express, and MongoDB skills. This is a global todo list where anybody can post an item.",
		githubURL: "https://github.com/obatola/web-todo-list",
		// url: 'https://oba-todo.herokuapp.com/', // TODO: Rehost Project or recreate
		projectImageKey: "globalTodo",
	},
	{
		name: "Venetian Bell Tower Data Collection App",
		date: "2016",
		tech: ["AngularJS", "Firebase", "Javascript"],
		content:
			"Developed a data collection application for my Worcester Polytechnic Institute Venice Project team. This application was used by the WPI Venice Project Center to collect data of Venetian Bell Towers in Venice in the hopes of preserving records of these monuments.",
		projectImageKey: "venetianBellTower",
		isFeatured: false,
	},
	{
		name: "Venice Bell Tower Website",
		date: "2016",
		tech: ["AngularJS", "Firebase", "Javascript"],
		projectImageKey: "veniceBells",
		url: "https://bells2019.veniceprojectcenter.org/#!/",
		isFeatured: false,
		content: (
			<span>
				Revitalised a website that showcases venetian bell towers, using data
				collected by the Venice Project Center. The original website was
				functional but really lacks any eye catching design. With a little help
				of Bootstrap, I&nbsp;
				<a
					rel="noopener noreferrer"
					target="_blank"
					href="http://sample-bells.s3-website-us-east-1.amazonaws.com/#/moreInfo/dffb615e-8a01-afa0-984a-cd7dce25bacf/64a1d94d-c362-87b9-ea17-1feca10dedb4"
				>
					implemented a design
				</a>
				&nbsp; that was integrated into the main site
			</span>
		),
	},
	{
		name: "TapTapWars",
		date: "2016",
		tech: ["Swift", "XCode"],
		content:
			"A little game where 2 players tap as fast as they can on their half of the screen. The game is a tug of war where one players tap increments the score while the other decrements it. If the blue player reaches 10 before the red reaches -10 he wins.",
		projectImageKey: "tapTapWars",
		githubURL: "https://github.com/obatola/iOS-TapWar",
	},
	{
		name: "iPhone Calculator",
		date: "2016",
		tech: ["Swift", "XCode"],
		content:
			"Moving forward from the Java Calculator, I created a similar calculator for iOS using Swift.",
		projectImageKey: "iosCalculator",
		githubURL: "https://github.com/obatola/iOS-Calculator",
	},
	{
		name: "Java Calculator",
		date: "2016",
		tech: ["Java"],
		content:
			"Created a calculator with Java. In order to use the application, download the runnable jar or mac app below.",
		projectImageKey: "javaCalculator",
		githubURL: "https://github.com/obatola/OSE-Calculator",
	},
	{
		name: "KabaSuji",
		date: "2016",
		tech: ["Java"],
		content:
			"My four partners and I used Java to create a shape puzzle game similar to Tangrams. Click the button below to see the progress!.",
		projectImageKey: "kabaSuji",
		githubURL: "https://github.com/baby-wpi/menelaus",
	},
	{
		name: "Deuces Solitaire",
		date: "2016",
		tech: ["Java"],
		content: "Solitaire variation I created using Java.",
		projectImageKey: "deucesSolitaire",
		githubURL: "https://github.com/obatola/Deuces.git",
		downloadURL:
			"https://obase.weebly.com/uploads/5/6/0/4/56044521/ose_deuces.jar",
	},
	{
		name: "Sci-Fi SpaceOctopi",
		date: "2015",
		tech: ["Java"],
		content:
			"Sci-Fi SpaceOctopi is a small playable visual novel, written in Python. I wrote the majority of the code and created all of the character art and the logo.",
		projectImageKey: "scifiSpaceOctopi",
	},
	{
		name: "Distance Vector Routing Protocol",
		date: "2015",
		tech: ["C"],
		content:
			"I implement a distributed asynchronous distance vector (DV) routing protocol. I wrote the sending and receiving IP-level messages for routing data over a network.",
		projectImageKey: "distanceVector",
		downloadURL:
			"https://obase.weebly.com/uploads/5/6/0/4/56044521/oasewardevans_dvrp.zip",
	},
];

export const homeCopy = {
	intro,
	professionalExperience: {
		title: "Professional Experience",
		experienceArr: professionalExperience,
	},
	projects: {
		featuredProjectsTitle: "Projects I've Worked On",
		projectsArr: csProjects,
		normalProjectsTitle: "Other Projects",
	},
};
