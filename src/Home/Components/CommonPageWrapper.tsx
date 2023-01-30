import React from 'react';

import {
    Link
  } from "react-router-dom";
import { linkToResume, paths } from '../contants';
import { Main } from '../styles';
import { ATagNavBarLink, Header, LogoWrapper, NavBar, NavBarLink } from './headerStyles';
import obaLogo from '../Assets/obase logo.png';
import { homePageAnchorPaths } from './Home/constants';

interface ICommonPageWrapperProps {
  children: React.ReactNode
}

export const CommonPageWrapper: React.FC<ICommonPageWrapperProps> = ({children}) => {
    return (
    <div>
        <Header>
          <NavBar>
              <LogoWrapper><Link to={paths.home}><img height="50px" src={obaLogo} alt="oba seward-evans" /></Link></LogoWrapper>
              <div>
                {/* <NavLink path={paths.csProjects} name="CS Projects" /> */}
                <ATagNavBarLink href={`#${homePageAnchorPaths.about}`}>About</ATagNavBarLink>
                <ATagNavBarLink href={`#${homePageAnchorPaths.work}`}>Work</ATagNavBarLink>
                <ATagNavBarLink href={`#${homePageAnchorPaths.projects}`}>Projects</ATagNavBarLink>
                <ATagNavBarLink target="_blank" href={linkToResume}>Resume</ATagNavBarLink>
              </div>
          </NavBar>
        </Header>
        <div style={{width: '100%'}}>
          <Main>
            {children}
          </Main>
        </div>
      </div>
    )
}

interface INavLinkProps {
  name: string;
  path: string;
}

export const NavLink = ({name, path}: INavLinkProps) => {
  const isCurrentPath = path === window.location.pathname;

  return (
    <NavBarLink isCurrentPath={isCurrentPath} to={path}>{name.toUpperCase()}</NavBarLink>
  )
}