import Link from "next/link";
import { IPokemon } from "./types";
import styles from "./pokemonDetailPage.module.css";
import { PokemonTypeGrid } from "@/modules/pokedex/pokemonType";
import {
    displayHeight,
    displayWeight,
    getIdDisplayString,
} from "@/modules/pokedex/utils";

export interface IPokemonDetailProps {
    pokemon: IPokemon | null;
    nextPokemon: IAdjacentPokemon;
    previousPokemon: IAdjacentPokemon;
}

export type IAdjacentPokemon = IPokemon;

export default function PokemonDetailPage({
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
                            value={displayWeight(pokemon.weightKg)}
                        />
                        <StatDisplayer name="species" value={pokemon.species} />
                        <StatDisplayer
                            name="heightM"
                            value={displayHeight(pokemon.heightM)}
                        />
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
