import styled, {css} from 'styled-components';
import {Github} from '@styled-icons/simple-icons/Github';
import { ExternalLinkOutline } from '@styled-icons/evaicons-outline/ExternalLinkOutline'
import {Download } from '@styled-icons/evaicons-solid/Download'
import { Menu } from '@styled-icons/evaicons-solid/Menu'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'

// look for icons here https://styled-icons.dev/

export enum iconSizes {
    medium = '20px',
    large = '30px',
}

interface IIconProps {
    iconSize?: iconSizes;
}

const sizeStyle = css<IIconProps>`
    height: ${({iconSize = iconSizes.medium}: IIconProps) => iconSize};
`

export const GithubIcon = styled(Github)<IIconProps>`
    ${sizeStyle}
`;

export const ExternalLinkIcon = styled(ExternalLinkOutline)<IIconProps>`
    ${sizeStyle}
`;

export const DownloadIcon = styled(Download)<IIconProps>`
    ${sizeStyle}
`;

export const MenuIcon = styled(Menu)<IIconProps>`
    ${sizeStyle}
`;

export const CloseIcon = styled(CloseOutline)<IIconProps>`
    ${sizeStyle}
`;