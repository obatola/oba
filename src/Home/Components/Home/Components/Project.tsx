
import React from 'react';
import styled from 'styled-components';
import { csProjects, ICSProject } from '../../../copy';
import { Spacer, SpacerSize } from '../../../styles';
import { GoldenLink } from '../Components/GoldenLinks';
import { TechnologiesPanel } from '../Components/TechnologiesPanel';
import { ProjectLinks } from './FeaturedProject';

interface IProjectsPaneProps {
    projects: ICSProject[];
}

export const ProjectPane = ({projects}: IProjectsPaneProps) => (
    <ProjectGridWrapper>
        {csProjects.map((project) => !project.isFeatured && <Project project={project}/>)}
    </ProjectGridWrapper>
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
        <ProjectWrapper>
            <ProjectContainer>
                <h3>
                    <GoldenLink href={project.url}>
                        {name}&nbsp;
                    </GoldenLink>
                    - {date}
                </h3>
                <Spacer bottom={SpacerSize.medium} />
                <div>
                    {content}
                </div>
                <Spacer bottom={SpacerSize.medium} />
                <TechnologiesPanel technologies={tech} simple />
                <Spacer bottom={SpacerSize.medium} />
                <ProjectLinks project={project} />
            </ProjectContainer>
        </ProjectWrapper>
    )
}

export const ProjectGridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
`;

const ProjectWrapper = styled.div`
    background-color: var(--darkerer-brown);
    width: 100%;
`;

const ProjectContainer = styled.div`
    padding: 20px;
`