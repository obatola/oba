import React from 'react';
import { ICSProject } from '@/copy';
import styles from './ProjectPane.module.css';
import { GoldenLink } from '@/modules/common/GoldenLinks';
import { Spacer, SPACER_SIZE } from '@/modules/common/Spacer';
import { TechnologiesPanel } from '@/modules/common/TechnologiesPanel';
import { ProjectLinks } from './FeaturedProjectPane';


interface IProjectsPaneProps {
    projects: ICSProject[];
}

export const ProjectPane = ({projects}: IProjectsPaneProps) => (
    <div className={styles.projectPaneContainer}>
        {projects.map((project) => <Project project={project}/>)}
    </div>
)

interface IProjectProps {
    project: ICSProject;
}

const Project = ({project}: IProjectProps) => {
    const {name, date, tech, content, projectImageKey, githubURL, url} = project;

    if (!project) {
        return <></>
    }

    return (
        <div className={styles.projectWrapper}>
            <div className={styles.projectContainer}>
                <h3>
                    <GoldenLink href={project.url}>
                        {name}&nbsp;
                    </GoldenLink>
                    - {date}
                </h3>
                <Spacer bottom={SPACER_SIZE.medium} />
                <div>
                    {content}
                </div>
                <Spacer bottom={SPACER_SIZE.medium} />
                <TechnologiesPanel technologies={tech} simple />
                <Spacer bottom={SPACER_SIZE.medium} />
                <ProjectLinks project={project} />
            </div>
        </div>
    )
}