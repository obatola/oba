import { IPokemon, IPokemonIndex } from "@/modules/pokedex/types";
import { getIdDisplayString } from "@/modules/pokedex/utils";
import PokemonData from "../api/allPokedexData.json";
import styles from "../../modules/pokedex/pokedex[id].module.css";
import Link from "next/link";
import { PokemonTypeGrid } from "@/modules/pokedex/pokemonType";

const pokemonData = PokemonData as unknown as IPokemonIndex;

interface IPokemonDetailProps {
    pokemon: IPokemon | null;
    nextPokemon: IAdjacentPokemon;
    previousPokemon: IAdjacentPokemon;
}

export default function PokemonDetail({
    pokemon,
    nextPokemon,
    previousPokemon,
}: IPokemonDetailProps) {
    if (!pokemon) {
        return <>no pokemon found</>;
    }

    return (
        <>
            <style jsx global>
                {`
                    body {
                        /* color */
                        --pokemon-red: #f35067;
                        --pokemon-border-color: #d4d5ce;

                        /* component-color */
                        --pokemon-background-color: var(--pokemon-red);

                        background-color: var(--pokemon-background-color);
                    }
                `}
            </style>
            <div className={styles.pokemonPage}>
                <div>
                    <AdjacentPokemonLink
                        pokemon={previousPokemon}
                        displayString="previous"
                    />
                    <Link href="/pokedex">all</Link>
                    <AdjacentPokemonLink
                        pokemon={nextPokemon}
                        displayString="next"
                    />
                    <div />
                    <div className={styles.pokemonCard}>
                        <img
                            className={styles.pokemonImage}
                            alt={pokemon.name}
                            src={pokemon.imageUrl}
                        />
                        <div>{getIdDisplayString(pokemon.id)}</div>
                        <div>{pokemon.name}</div>
                        <PokemonTypeGrid types={pokemon.type} />
                        <div>{pokemon.descriptions[0]}</div>
                        <StatDisplayer
                            name="catchRate"
                            value={pokemon.catchRate}
                        />
                        <StatDisplayer
                            name="baseExperience"
                            value={pokemon.baseExperience}
                        />
                        <StatDisplayer
                            name="growthRate"
                            value={pokemon.growthRate}
                        />
                        <StatDisplayer name="hp" value={pokemon.hp} />
                        <StatDisplayer name="attack" value={pokemon.attack} />
                        <StatDisplayer name="defense" value={pokemon.defense} />
                        <StatDisplayer
                            name="weightKg"
                            value={pokemon.weightKg}
                        />
                        <StatDisplayer name="heightM" value={pokemon.heightM} />
                        <StatDisplayer
                            name="baseStatTotal"
                            value={pokemon.baseStatTotal}
                        />
                        <StatDisplayer
                            name="specialAttack"
                            value={pokemon.specialAttack}
                        />
                        <StatDisplayer
                            name="specialDefense"
                            value={pokemon.specialDefense}
                        />
                        <StatDisplayer name="speed" value={pokemon.speed} />
                    </div>
                </div>
            </div>
        </>
    );
}

interface IStatDisplayerProps {
    name: string;
    value: string | number;
}

const StatDisplayer = ({ name, value }: IStatDisplayerProps) => (
    <div>
        {name}:&nbsp;{value}
    </div>
);

interface IAdjacentPokemonLinkProps {
    pokemon: IAdjacentPokemon | null;
    displayString: "next" | "previous";
}

const AdjacentPokemonLink = ({
    pokemon,
    displayString,
}: IAdjacentPokemonLinkProps) => {
    if (!pokemon) {
        return <span>{displayString}</span>;
    }
    return (
        <Link href={`/pokedex/${pokemon.id}`}>
            {displayString}
            <img src={pokemon.tinyImageURL} alt={pokemon.name} />
        </Link>
    );
};

export async function getStaticPaths() {
    const paths = Object.keys(pokemonData).map((pokemonId) => ({
        params: {
            id: pokemonId,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

interface IGetStaticPropsProps {
    params: { id: string };
}

type IAdjacentPokemon = IPokemon;

export async function getStaticProps({ params }: IGetStaticPropsProps) {
    console.log(params);
    const pokemon = pokemonData[params.id] as unknown as IPokemon;
    const nextPokemon =
        (pokemonData[+params.id + 1] as unknown as IPokemon) || null;
    const previousPokemon =
        (pokemonData[+params.id - 1] as unknown as IPokemon) || null;

    const props: IPokemonDetailProps = {
        pokemon: pokemon.name ? pokemon : null,
        nextPokemon,
        previousPokemon,
    };

    return {
        props,
    };
}
