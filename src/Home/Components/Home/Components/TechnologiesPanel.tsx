import React from 'react';
import styled, {css} from "styled-components";

interface ITechnologiesPanelProps extends ITextBubbleProps {
    technologies: string[];
}

export const TechnologiesPanel = ({technologies, simple}: ITechnologiesPanelProps) => {
    const techDoms = technologies.map((name) => <TextBubble simple={simple}>{name}</TextBubble>)

    return <TextBubbleContainer>{techDoms}</TextBubbleContainer>
}

interface ITextBubbleProps {
    simple?: boolean;
}

export const TextBubble = styled.span<ITextBubbleProps>`
    font-family: "SF Mono","Fira Code","Fira Mono","Roboto Mono",monospace;
    font-size: 14px;
    ${({simple}: ITextBubbleProps) => simple ? simpleBubbleStyle : normalBubbleStyle}
`;

export const TextBubbleContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    ${TextBubble} {
        margin: 0 15px 6px 0;
    }
`;

const normalBubbleStyle = css`
    padding: 5px 15px;
    border-radius: 20px;
    background-color: var(--text-bubble-background-color);
    color: var(--text-bubble-text-color);
`;

const simpleBubbleStyle = css`
    color: var(--font-color);
`;