import { HOME_PAGE_ANCHORS } from '@/constants/homeConstants';
import { csProjects } from '@/copy';
import React from 'react';
import { FeatureProjectsPane } from './projectComponents/FeaturedProjectPane';
import { ProjectPane } from './projectComponents/ProjectPane';

export const ProjectsSection = () => {
    return (
        <section className="home-section" id={HOME_PAGE_ANCHORS.projects}>
            <h2>Projects I've Worked On</h2>
            <FeatureProjectsPane featuredProjects={csProjects.filter((project) => project.isFeatured)} />
            <h2>Other Projects</h2>
            <ProjectPane projects={csProjects} />
        </section>
    )
}