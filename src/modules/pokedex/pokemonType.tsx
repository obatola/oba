import styles from "../../modules/pokedex/pokemonType.module.css";

interface IPokemonTypeGridProps {
    types: string[];
}

export const PokemonTypeGrid = ({ types }: IPokemonTypeGridProps) => {
    const typeDoms = types.map((type) => (
        <PokemonType key={type} type={type} />
    ));
    return <div className={styles.typeGrid}>{typeDoms}</div>;
};

interface IPokemonTypeProps {
    type: string;
}

const PokemonType = ({ type }: IPokemonTypeProps) => {
    return (
        <span
            className={styles.type}
            style={{
                color: "white",
                backgroundColor: typeToColorMap[type],
            }}
        >
            {type}
        </span>
    );
};

const typeToColorMap = {
    grass: "#06b248",
    poison: "#ee00d0",
    fire: "#fd0600",
    flying: "#02b1f4",
    water: "#139cd8",
    bug: "#6ed141",
    normal: "#dadada",
    electric: "#fffc00",
    ground: "#ffbf00",
    fairy: "#fd9efe",
    fighting: "#e00201",
    psychic: "#f02b94",
    rock: "#cf8f00",
    steel: "#81807e",
    ice: "#b4d8f1",
    ghost: "#001b62",
    dragon: "#7e2fa2",
    dark: "#973802",
};
