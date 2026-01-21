import * as Icons from "@styled-icons/ionicons-solid";

export type ResumeHeaderType = {
    name: string;
    items: {
        icon: keyof typeof Icons;
        content: string;
    }[]
}

export type ResumeExperienceType = {
    title: string;
    company: string;
    date: string;
    location: string;
    children: React.ReactNode;
}

export type ResumeTechnologiesType = {
    technologies: string[];
}

export type ResumeAchievementsType = {
    achievements: {
        icon: keyof typeof Icons;
        content: string;
    }[];
}

export type ResumeProjectType = {
    title: string;
    url: string;
    children: React.ReactNode;
}

export type ResumeEducationType = {
    degree: string;
    school: string;
    date: string;
    gpa: string;
}

type SectionContentType =
    (ResumeExperienceType & {type: 'experience'}) | 
    (ResumeTechnologiesType & {type: 'technologies'}) |
    (ResumeAchievementsType & {type: 'achievements'}) |
    (ResumeProjectType & {type: 'project'}) |
    (ResumeEducationType & {type: 'education'}) |
    ({children: React.ReactNode} & {type: 'generic'})


export type SectionType = {
    title: string;
    content: SectionContentType[];
}


export type ResumeType = {
    header: ResumeHeaderType;
    mainPanel: SectionType[];
    rightPanel: SectionType[];
}