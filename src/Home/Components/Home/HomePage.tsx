import React from 'react';
import styled from 'styled-components';
import { IntroSection } from './IntroSection';
import { ProfessionalExperienceSection } from './ProfessionalExperienceSection';
import { ProjectsSection } from './ProjectsSection';

export const HomePage = () => {
    return (
        <>
            <IntroSection />
            <ProfessionalExperienceSection />
            <ProjectsSection />
        </>
    )
}