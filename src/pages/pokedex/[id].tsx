import { IPokemon, IPokemonIndex } from "@/modules/pokedex/types";
import PokemonData from "../api/allPokedexData.json";
import PokemonDetailPage, {
    IPokemonDetailProps,
} from "@/modules/pokedex/pokemonDetailPage";
import Head from "next/head";

const pokemonData = PokemonData as unknown as IPokemonIndex;

export default function PokemonDetail({
    pokemon,
    nextPokemon,
    previousPokemon,
}: IPokemonDetailProps) {
    return (
        <>
            <Head>
                <title>{pokemon?.name} Pokédex</title>
                <link rel="icon" href={pokemon?.imageUrl} />
            </Head>
            <PokemonDetailPage
                pokemon={pokemon}
                nextPokemon={nextPokemon}
                previousPokemon={previousPokemon}
            />
        </>
    );
}

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

interface IGetStaticPropsProps {
    params: { id: string };
}
