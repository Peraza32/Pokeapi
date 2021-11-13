
import Pokedex from './components/pokedex/pokedex';

function App() {
  return (
    <div className="w-full min-h-fullscreen flex flex-col bg-gray-200">
      <header className="w-full h-16 bg-gray-300 sticky top-0 left-0 flex justify-center items-center text-black font-oswald z-10"> National Pokedex </header>

      <main className="p-8 flex flex-col justify-center gap-8">
        <Pokedex pokemons={pokemons} />
      </main>
    </div>
  );
}

export default App;
