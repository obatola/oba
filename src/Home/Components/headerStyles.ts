import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0px;
    z-index: 11;
    width: 100%;
    height: 100px;
    backdrop-filter: blur(10px);
    transition: var(--transition);
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;
`;

export const NavBar = styled.nav`
    display: flex;
    padding: 0 50px;
    justify-content: space-between;
    position: relative;
    align-items: center;
    width: 100%;
    height: var( --nav-height);
`;

export const LogoWrapper = styled.div`
    display: flex;
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
`

export const ExternalNavBarLink = styled.a`
    ${navBarLinkStyle}
`