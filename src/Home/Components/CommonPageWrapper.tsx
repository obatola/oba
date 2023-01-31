import React, { useState } from 'react';

import {
    Link
  } from "react-router-dom";
import { linkToResume, paths } from '../contants';
import { device, Main } from '../styles';
import { ATagNavBarLink, Header, LogoWrapper, NavBar, NavBarLink, ObaLogoImg, SideBar } from './headerStyles';
import obaLogo from '../Assets/obase logo.png';
import { homePageAnchorPaths } from './Home/constants';
import styled from 'styled-components';
import { CloseIcon, iconSizes, MenuIcon } from './Icons';

interface ICommonPageWrapperProps {
  children: React.ReactNode
}

export const CommonPageWrapper: React.FC<ICommonPageWrapperProps> = ({children}) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
      <div>
        <Header>
          <NavBar>
              <LogoWrapper><Link to={paths.home}><ObaLogoImg src={obaLogo} alt="oba seward-evans" /></Link></LogoWrapper>
              <div id="nav-row">
                <NavLinks />
              </div>
              <div id="hamburger-menu"><MenuIcon iconSize={iconSizes.large} onClick={() => setIsSideBarOpen(true)}/></div>
          </NavBar>
        </Header>
        <SideBar id="side-menu" isSideBarOpen={isSideBarOpen}>
          <CloseIcon iconSize={iconSizes.large} onClick={() => setIsSideBarOpen(false)}/>
          <NavLinks />
        </SideBar>
        <div>
          <Main>
            {children}
          </Main>
        </div>
      </div>
    )
}

const NavLinks = () => (
  <>
    {/* <NavLink path={paths.csProjects} name="CS Projects" /> */}
    <ATagNavBarLink href={`#${homePageAnchorPaths.about}`}>About</ATagNavBarLink>
    <ATagNavBarLink href={`#${homePageAnchorPaths.work}`}>Work</ATagNavBarLink>
    <ATagNavBarLink href={`#${homePageAnchorPaths.projects}`}>Projects</ATagNavBarLink>
    <ATagNavBarLink target="_blank" href={linkToResume}>Resume</ATagNavBarLink>
  </>
)

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