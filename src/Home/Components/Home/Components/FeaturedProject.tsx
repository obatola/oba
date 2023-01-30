import React from 'react';
import styled, {css} from 'styled-components';
import { csProjects, getProjectImageByKey, ICSProject } from '../../../copy';
import { Section, Spacer, SpacerSize } from '../../../styles';
import { GoldenLink } from '../Components/GoldenLinks';
import { TechnologiesPanel, TextBubbleContainer } from '../Components/TechnologiesPanel';
import { DownloadIcon, ExternalLinkIcon, GithubIcon } from '../../Icons';

interface IFeatureProjectsPane {
    projects: ICSProject[];
}

export const FeatureProjectsPane = ({projects}: IFeatureProjectsPane) => (
    <div>
        {csProjects.filter((project) => project.isFeatured).map((project, index) => <FeaturedProject project={project} index={index} />)}
    </div>
)


interface IFeaturedProjectProps {
    project: ICSProject;
    index?: number;
}

const FeaturedProject = ({project, index}: IFeaturedProjectProps) => {
    const {name, date, tech, content, projectImageKey, githubURL, url} = project;

    if (!project) {
        return <></>
    }

    const isTextContentOnRightSide = typeof index === 'number' && index % 2 > 0;

    return (
        <ProjectContainer contentRight={isTextContentOnRightSide}>
            <ProjectTextContentContainer contentRight={isTextContentOnRightSide}>
                    <div>
                        <h3>
                            <GoldenLink href={project.url}>
                                {name}&nbsp;
                            </GoldenLink>
                            - {date}
                        </h3>
                    <Spacer bottom={SpacerSize.medium} />
                    <TextContainer>
                        {content}
                    </TextContainer>
                    <Spacer bottom={SpacerSize.medium} />
                    <TechnologiesPanel technologies={tech} />
                    <Spacer bottom={SpacerSize.medium} />
                    <ProjectLinks project={project} />
                </div>
            </ProjectTextContentContainer>

            <ProjectImageContainer contentRight={isTextContentOnRightSide}>
                <ProjectImage src={getProjectImageByKey(projectImageKey)} alt="oba seward-evans" />
            </ProjectImageContainer>
        </ProjectContainer>
    )
}

interface IProjectLinksProps {
    project: ICSProject
}

export const ProjectLinks = ({project: {githubURL, url: externalLink, downloadURL}}: IProjectLinksProps) => (
    <ProjectLinkContainer>
        {githubURL && <a href={githubURL} target="_blank"><ExternalLinkIcon /></a>}
        {externalLink && <a href={externalLink} target="_blank"><GithubIcon /></a>}
        {downloadURL && <a href={downloadURL} target="_blank"><DownloadIcon /></a>}
    </ProjectLinkContainer>
)

interface IAlignmentProps {
    contentRight?: boolean;
}

const ProjectContainer = styled.div<IAlignmentProps>`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 10px;
    margin-bottom: ${SpacerSize.large};

    ${({contentRight}: IAlignmentProps) => {
        if (contentRight) {
            return css`
                text-align: right;
                
                ${TextBubbleContainer} {
                    justify-content: flex-end;
                }
            `;
        }

        return css`
            text-align: left;
        `;
    }}

    img {
        filter: grayscale(80%) brightness(80%) contrast(80%) opacity(80%);
    }

    &:hover {
        img {
            filter: none;
        }
    }
`;

const ProjectTextContentContainer = styled.div<IAlignmentProps>`
    position: relative;
    display: flex;
    align-items: center;
    ${({contentRight}: IAlignmentProps) => contentRight ? contentRightStyle : contentLeftStyle };
`;

const TextContainer = styled.div`
    background-color: var(--project-grid-project-background-color);
    color: var(--font-color);
    padding: 1rem 2rem;
    border-radius: 4px;
    box-shadow: 0 10px 30px -15px var(--darkerer-brown);
`;

const ProjectImageContainer = styled.div`
    height: 400px;
    max-width: 100%;
    position: relative;
    z-index: -1;
    display: flex;
    justify-content: center;
    ${({contentRight}: IAlignmentProps) => contentRight ? imageLeftStyle : imageRightStyle };
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 1;
    transition: var(--project-image-transition);
`;

const imageLeftStyle = css`
    grid-row-start: 1;
    grid-column-start: 1;
    grid-row-end: 1;
    grid-column-end: 7;
`

const imageRightStyle = css`
    grid-row-start: 1;
    grid-column-start: 5;
    grid-row-end: 1;
    grid-column-end: 12;
`;

const contentLeftStyle = css`
    grid-row-start: 1;
    grid-column-start: 1;
    grid-row-end: 1;
    grid-column-end: 8;
`;

const contentRightStyle = css`
    grid-row-start: 1;
    grid-column-start: 4;
    grid-row-end: 1;
    grid-column-end: 12;
`;

export const ProjectLinkContainer = styled.span`
    a {
        margin-right: 10px;
    }
`;