export const getIdDisplayString = (id: string) => `#${`000${id}`.slice(-4)}`;

export const displayWeight = (weightKg: number) =>
    `${(weightKg * 2.20462262185).toFixed(1)} lbs`;

export const displayHeight = (heightMeters: number) => {
    const inches = heightMeters * 39.3701;

    const feet = Math.floor(inches / 12);
    const roundedFeet = Math.round(inches / 12);
    const remainingInches = Math.round(inches % 12);
    if (roundedFeet > 0) {
        if (roundedFeet === 1 && feet < 1) {
            return `${roundedFeet}' 00"`;
        } else {
            return `${feet}' ${
                remainingInches >= 10 ? remainingInches : `0${remainingInches}`
            }"`;
        }
    }

    return `${remainingInches}"`;
};
