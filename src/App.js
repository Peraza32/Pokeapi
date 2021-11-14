import { useState, useEffect } from "react";

import "./App.css";

import Pokedex from './Components/Pokedex/Pokedex';
import Party from "./Components/Party/Party";
import Search from "./Components/Search/Search";
import Card from "./Components/Card/Card";
import Button from "./Components/Button/Button";

import { pokemonServices } from "./Services/Pokemon/Pokemon.services";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [party, setParty] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const filters = { limit: 20, offset: offset };
        const response = await pokemonServices.getPokemons(filters);

        if (!response['success']) {
          throw new Error('Something was wrong')
        }

        setPokemons(response['pokemons'])
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, [offset]);

  const onAddToPartyHandler = (id) => {
    const pokemon = id ? pokemons.find(poke => poke.id === id) : searchedPokemon;

    if (pokemon && party.length < 6) {
      setParty([...party, { ...pokemon, partyId: `${pokemon.name}_${pokemon.id}_${new Date().getTime() / 1000}` }]);
    }
  }

  const onDeleteInPartyHandler = (partyId) => {
    const newParty = party.filter(poke => poke.partyId !== partyId);
    setParty(newParty);
  }

  const onSearchHandler = async (name) => {
    try {
      const response = await pokemonServices.getPokemon(name);
      if (!response['success']) {
        throw new Error('Cannot find the pokemon')
      }

      setSearchedPokemon(response['pokemon'])
    } catch (error) {
      console.error({ error })
    }
  }






  //<button id='Next' className="bg-purple-600 rounded w-24 h-9 text-white mx-4" >Next</button>



  return (
    <div className="w-full min-h-fullscreen flex flex-col bg-gray-200">
      <header className="w-full h-16 bg-gray-300 sticky top-0 left-0 flex justify-center items-center text-black font-oswald z-10"> National Pokedex </header>

      <main className="p-8 flex flex-col  justify-evenly">
        <Party party={party} onDeleteInParty={onDeleteInPartyHandler} />

        <Search onSubmit={onSearchHandler} />
        {searchedPokemon && <div className="self-center"> <Card pokemon={searchedPokemon} onAdd={() => { onAddToPartyHandler() }} /> </div>}
        <div className="w-full my-7 flex flex-row justify-center ">
          <Button id="Previous" description="Previous" action={() => (offset === 0) ? setOffset(0) : setOffset(offset - 20)} />
          <Button id="Next" description="Next" action={() => setOffset(offset + 20)} />
        </div>
        <Pokedex pokemons={pokemons} onAddToParty={onAddToPartyHandler} />
      </main>
    </div>
  );
}

export default App;
