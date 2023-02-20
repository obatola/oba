export interface IPokemon {
    id: string;
    name: string;
    tinyImageURL: string;
    imageUrl: string;
    type: string;
    species: string;
    catchRate: number;
    baseExperience: number;
    growthRate: string;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    evolutions: string;
    descriptions: string;
    weightKg: number;
    heightM: number;
    baseStatTotal: string;
}

export interface IPokemonIndex {
    [id: string]: IPokemon;
}
