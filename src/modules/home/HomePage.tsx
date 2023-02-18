import React from "react";
import { IntroSection } from "./IntroSection";
import { ProfessionalExperienceSection } from "./ProfessionalExperience";
import { ProjectsSection } from "./ProjectSection";

export const HomePage = () => {
    return (
        <>
            <IntroSection />
            <ProfessionalExperienceSection />
            <ProjectsSection />
        </>
    );
};
