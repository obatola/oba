import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import { device } from '../styles';

export const Header = styled.div`
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100px;
    backdrop-filter: blur(10px);
    transition: var(--transition);
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;

    @media ${device.mobileL} { 
        height: 80px;
    }   
`;

export const NavBar = styled.nav`
    display: flex;
    padding: 0 50px;
    justify-content: space-between;
    position: relative;
    align-items: center;
    width: 100%;
    height: var( --nav-height);

    #hamburger-menu {
        display: none;
    }

    #side-menu {
        display: none;
    }

    @media ${device.tablet} { 
        padding: 0 20px;
        
        #nav-row {
            display: none;
        }

        #hamburger-menu {
            display: block;
        }
    }   
`;


export const LogoWrapper = styled.div`
    display: flex;
`;

export const ObaLogoImg = styled.img`
  height: 50px;
  
  @media ${device.mobileL} { 
    height: 35px;
  }    
`;

interface INavBarLinkProps {
    isCurrentPath?: boolean;
}

const navBorderStyle = css`
    border: 1px solid var(--font-color);
`;

const navBarLinkStyle = css`
    background-color: transparent;
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-family: var(--font-mono);
    line-height: 1;
    cursor: pointer;
    margin-left: 5px;
    font-size: var(--fz-xs);
    transition: var(--transition);
    color: var(--font-color) !important;

    :hover {
        ${navBorderStyle}
        color: var(--font-color) !important;
    }
`;

export const NavBarLink = styled(Link)<INavBarLinkProps>`
    ${navBarLinkStyle}

    ${({isCurrentPath: isSelected}: INavBarLinkProps) => isSelected && navBorderStyle}
`;

export const ATagNavBarLink = styled.a`
    ${navBarLinkStyle}
`;


interface ISidebarProps {
    isSideBarOpen: boolean;
  }
  
export const SideBar = styled.div<ISidebarProps>`
    background-color: var(--darkerer-brown);
    height: 100%;
    position: fixed;
    z-index: 3;
    top: 0;
    right: 0;
    overflow-x: hidden;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.25rem;

    width: ${({isSideBarOpen}: ISidebarProps) => isSideBarOpen ? '40%' : '0'};
    padding: ${({isSideBarOpen}: ISidebarProps) => isSideBarOpen ? '100px 60px;' : '100px 0'};
    box-shadow: ${({isSideBarOpen}: ISidebarProps) => isSideBarOpen ? '21px 2px 45px 13px rgba(0,0,0,0.75);' : '0'};

    ${ATagNavBarLink} {
        width: 100%;
        margin-bottom: 20px;
    }
`;