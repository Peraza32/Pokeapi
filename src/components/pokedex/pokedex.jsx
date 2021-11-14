import Card from '../card/card';

const Pokedex = ({pokemons = []}) =>{
    return (
        <div className=" w-full flex justify-center items-center gap-4 flex-wrap">
      {pokemons.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
    )
}