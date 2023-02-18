export enum SPACER_SIZE {
    small = "10px",
    medium = "16px",
    large = "40px",
}

interface ISpacerProps {
    bottom: string | SPACER_SIZE;
}

export const Spacer = ({ bottom }: ISpacerProps) => (
    <div style={{ marginBottom: bottom }} />
);
