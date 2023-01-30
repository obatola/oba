import React from 'react'
import styled from 'styled-components';

interface IProps {
    href?: string;
    children: React.ReactNode;
}

export const GoldenLink = ({href, children}: IProps) => {
    if (href) {
        return (
            <Link target='_blank' href={href}>
                {children}
            </Link>
        );
    }

    return <Text>{children}</Text>;
}

const Text = styled.span`
    color: var(--gold-accent);
`;

const Link = styled.a`
    color: var(--gold-accent);
    position: relative;
    display: inline-block;

    :after {
        content: "";
        display: block;
        background-color: var(--gold-accent);
        width: 0;
        height: 1px;
        bottom: 0.37em;
        transition: var(--transition);
    }

    :hover {
        color: var(--gold-accent);

        :after {
            width: 100%;
        }
    }
`;
