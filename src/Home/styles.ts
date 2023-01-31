import styled, { css } from 'styled-components';

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }

  export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`, // TODO: revert
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
  };

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0px auto;
    max-width: 1600px;
    min-height: 100vh;
    padding: 0 150px 100px 150px;

    @media ${device.laptop} { 
        padding: 0 60px 100px 60px;
    }    

    @media ${device.mobileL} { 
        padding: 0 20px 100px 20px;
    }    
`

export enum SpacerSize {
    small = '10px',
    medium = '16px',
    large = '40px',
}

interface ISpacerProps {
    bottom: string | SpacerSize;
}

export const Spacer = styled.div`
    ${({bottom}: ISpacerProps) => bottom && css`margin-bottom: ${bottom};`}
`;

export const Section = styled.section`
    padding: 80px 0;
`;