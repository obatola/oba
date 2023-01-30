import styled, { css } from 'styled-components';

export const Main = styled.main`
    margin: 0px auto;
    max-width: 1600px;
    min-height: 100vh;
    padding: 0 150px 100px 150px;
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
`