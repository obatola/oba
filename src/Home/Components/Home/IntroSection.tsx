import react from 'react';
import styled from 'styled-components';

export const IntroSection = () => (
    <IntroSectionWrapper id="intro-section">
        <Text>Hi, my name is</Text>
        <TitleContainer>
            <Title>Oba Seward-Evans</Title>
            <Subtitle>I help companies launch and grow their products</Subtitle>
        </TitleContainer>
        <Text>I'm a full stack engineer with a heavy focus in frontend development based out of Brooklyn, NY. I have a passion for creating clean, intuitive, and elegant user ﬂows, designs, applications and code.</Text>
    </IntroSectionWrapper>
);

const IntroSectionWrapper = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    min-height: 100vh;
    height: 100vh;
    padding: 0px;
`

const TitleContainer = styled.div`
    margin 20px 0;
`

const Title = styled.h2`
    font-size: 7vw;
    margin: 0;
    line-height: 1em;
`

const Subtitle = styled.h2`
    font-size: 4vw;
    color: var(--gold-accent);
    margin: 0;
    line-height: 1em;
`

const Text = styled.p`
    margin: 0;
    font-size: 20px;
`