import React from "react";
import { homeCopy } from "@/homeCopy";
import { HOME_PAGE_ANCHORS } from "@/constants/homeConstants";
import { FeatureProjectsPane } from "./projectComponents/FeaturedProjectPane";
import { ProjectPane } from "./projectComponents/ProjectPane";

export const ProjectsSection = () => {
    return (
        <section className="home-section" id={HOME_PAGE_ANCHORS.projects}>
            <h2>{homeCopy.projects.featuredProjectsTitle}</h2>
            <FeatureProjectsPane
                featuredProjects={homeCopy.projects.projectsArr.filter(
                    (project) => project.isFeatured
                )}
            />
            <h2>{homeCopy.projects.normalProjectsTitle}</h2>
            <ProjectPane
                projects={homeCopy.projects.projectsArr.filter(
                    (project) => !project.isFeatured
                )}
            />
        </section>
    );
};
