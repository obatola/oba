import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../pokedex/pokedex.module.css";
import { PokemonTypeGrid } from "./pokemonType";
import { IPokemon, IPokemonIndex } from "./types";
import { getIdDisplayString } from "./utils";

interface IPokedex {
    pokemonIndex: IPokemonIndex;
    listOfPokemonIds: string[];
}

export default function Pokedex({ pokemonIndex, listOfPokemonIds }: IPokedex) {
    return (
        <div className={styles.pokemonPage}>
            Pokedex
            <PokemonGrid
                pokemonIndex={pokemonIndex}
                listOfPokemonIds={listOfPokemonIds}
            />
        </div>
    );
}

const PokemonGrid = ({ pokemonIndex, listOfPokemonIds }: IPokedex) => {
    const [numPokemonViewing, setNumPokemonViewing] = useState(30);

    const pokemonCards = listOfPokemonIds
        .slice(0, numPokemonViewing)
        .map((id) => {
            const pokemon = pokemonIndex[id];
            return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        });

    const handViewMore = () => {
        setNumPokemonViewing((previousNumber) => previousNumber + 10);
    };

    useEffect(() => {
        window.onscroll = function () {
            if (
                window.innerHeight + window.pageYOffset >=
                document.body.offsetHeight - 100
            ) {
                handViewMore();
            }
        };
    }, []);

    return (
        <div>
            <div className={styles.pokemonGrid}>{pokemonCards}</div>
            <button type="button" onClick={handViewMore}>
                view more
            </button>
        </div>
    );
};

interface IPokemonCardProps {
    pokemon: IPokemon;
}

const PokemonCard = ({ pokemon }: IPokemonCardProps) => {
    return (
        <div className={styles.pokemonCard}>
            <img
                className={styles.pokemonImage}
                alt={pokemon.name}
                src={pokemon.imageUrl}
            />
            <div>{getIdDisplayString(pokemon.id)}</div>
            <Link href={`/pokedex/${pokemon.id}`}>
                <div>{pokemon.name}</div>
            </Link>
            <PokemonTypeGrid types={pokemon.type} />
        </div>
    );
};
