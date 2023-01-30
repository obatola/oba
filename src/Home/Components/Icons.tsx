import styled, {css} from 'styled-components';
import {Github} from '@styled-icons/simple-icons/Github';
import { ExternalLinkOutline } from '@styled-icons/evaicons-outline/ExternalLinkOutline'
import {Download } from '@styled-icons/evaicons-solid/Download'
// look for icons here https://styled-icons.dev/

const sizeStyle = css`
    height: 20px;
`

export const GithubIcon = styled(Github)`
    ${sizeStyle}
`;

export const ExternalLinkIcon = styled(ExternalLinkOutline)`
    ${sizeStyle}
`;

export const DownloadIcon = styled(Download)`
    ${sizeStyle}
`;