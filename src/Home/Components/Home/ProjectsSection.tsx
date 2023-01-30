import React from 'react';
import { csProjects } from '../../copy';
import { Section } from '../../styles';
import { FeatureProjectsPane } from './Components/FeaturedProject';
import { ProjectPane } from './Components/Project';


export const ProjectsSection = () => {

    return (
        <Section id="projects-section">
            <h2>Projects I've Worked On</h2>
            <FeatureProjectsPane projects={csProjects} />
            <h2>Other Projects</h2>
            <ProjectPane projects={csProjects} />
        </Section>
    )
}