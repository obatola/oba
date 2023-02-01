import React from 'react';
import { clsx } from 'clsx';
import { ICSProject } from '@/copy';
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaDownload } from 'react-icons/fa';
import styles from './FeaturedProjectPane.module.css';
import { GoldenLink } from '@/modules/common/GoldenLinks';
import { Spacer, SPACER_SIZE } from '@/modules/common/Spacer';
import { TechnologiesPanel } from '@/modules/common/TechnologiesPanel';
import DeucesSolitaire from '../../../../public/images/deuces_solitaire.png'
import { getProjectImageByKey } from '@/utils/getProjectImageByKey';
import { ICON_SIZE } from '@/contants';

interface IFeatureProjectsPane {
    featuredProjects: ICSProject[];
}

export const FeatureProjectsPane = ({featuredProjects}: IFeatureProjectsPane) => (
    <div>
        {featuredProjects.map((project, index) => <FeaturedProject project={project} index={index} />)}
    </div>
)

interface IFeaturedProjectProps {
    project: ICSProject;
    index?: number;
}

const FeaturedProject = ({project, index}: IFeaturedProjectProps) => {
    const {name, date, tech, content, projectImageKey} = project;

    if (!project) {
        return <></>
    }

    const isTextContentOnRightSide = typeof index === 'number' && index % 2 > 0;
    const isImageOnRightSide = !isTextContentOnRightSide;

    return (
        <div className={clsx({
            [styles.projectContainerRight]: isTextContentOnRightSide,
            [styles.projectContainerLeft]: !isTextContentOnRightSide,
        })}>
            <div className={clsx({
                [styles.projectTextContentContainerRight]: isTextContentOnRightSide,
                [styles.projectTextContentContainerLeft]: !isTextContentOnRightSide,
            })}>
                <div>
                    <h3>
                        <GoldenLink href={project.url}>
                            {name}&nbsp;
                        </GoldenLink>
                        - {date}
                    </h3>
                    <Spacer bottom={SPACER_SIZE.medium} />
                    <div className={styles.textContainer}>
                        {content}
                    </div>
                    <Spacer bottom={SPACER_SIZE.medium} />
                    <TechnologiesPanel technologies={tech} />
                    <Spacer bottom={SPACER_SIZE.medium} />
                    <ProjectLinks project={project} />
                </div>
            </div>

            <div className={clsx({
                [styles.projectImageContainerRight]: isImageOnRightSide,
                [styles.projectImageContainerLeft]: !isImageOnRightSide,
            })}>
                <Image src={getProjectImageByKey(projectImageKey)} alt="oba seward-evans" className={styles.projectImage} />
            </div>
        </div>
    )
}

interface IProjectLinksProps {
    project: ICSProject
}

export const ProjectLinks = ({project: {githubURL, url: externalLink, downloadURL}}: IProjectLinksProps) => (
    <span className={styles.projectLinkContainer}>
        {githubURL && <a href={githubURL} target="_blank"><FaExternalLinkAlt size={ICON_SIZE.small} /></a>}
        {externalLink && <a href={externalLink} target="_blank"><FaGithub size={ICON_SIZE.small} /></a>}
        {downloadURL && <a href={downloadURL} target="_blank"><FaDownload size={ICON_SIZE.small} /></a>}
    </span>
)