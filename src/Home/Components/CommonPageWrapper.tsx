import React from 'react';

import {
    Link
  } from "react-router-dom";
import { linkToResume, paths } from '../contants';
import { Main } from '../styles';
import { ExternalNavBarLink, Header, LogoWrapper, NavBar, NavBarLink } from './headerStyles';
import obaLogo from '../Assets/obase logo.png';

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
                <NavLink path={paths.csProjects} name="CS Projects" />
                <NavLink path={paths.uiUX} name="UI | UX" />
                <NavLink path={paths.art} name="2D | 3D ART" />
                <NavLink path={paths.about} name="About" />
                <ExternalNavBarLink target="_blank" href={linkToResume}>Resume</ExternalNavBarLink>
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