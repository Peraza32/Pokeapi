import {
    BASE_URL,
    fetchAllPokemons,
    fetchUrlPokemons,
    transformPokemonData
} from './helpers';

//object defined to export
export const pokemonServices = {}

//Traemos una lista de pokemons basandose en los filtros pasados por parametro
getPokemons: async (filters = {}) => {
    const { limit = 20, offset = 0 } = filters
    try {
        const urlPokemons = await fetchAllPokemons({ limit, offset });
        const pokemons = await fetchUrlPokemons(urlPokemons);

        const mappedPokemons = pokemons.map(transformPokemonData);
        return { success: true, pokemons: mappedPokemons };

    } catch (error) {
        console.log({ error });
        return { success: false, pokemon: [] };
    }

}

//Traerá un pokemon en especifico, el cual indicaremos vía parametro el nombre.
getPokemon: async (name = "") => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${name}`);
        const data = await response.json();
        if (!data) throw new Error("Pokemon not found");

        const transformPokemon = transformPokemonData(data);
        return { success: true, pokemons: transformPokemon };

    } catch (error) {
        console.log({ error });
        return { success: false, pokemon: null };
    }
}
