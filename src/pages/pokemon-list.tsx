import { FunctionComponent, useEffect, useState } from 'react';
import PokemonCard from '../components/pokemon-card';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';
import PokemonSearch from '../components/pokemon-search';
import { Link } from 'react-router-dom';

const PokemonList: FunctionComponent = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));
  }, []);

  return (
    <div className='w-full h-full flex flex-wrap justify-center'>
      <h1 className='hidden sm:block text-center text-4xl my-2 w-full'>Pokédex</h1>
      <PokemonSearch />
      <div className='p-5 pb-10 sm:gap-8 lg:gap-8 grid sm:grid-cols-2 lg:grid-cols-3'>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
      </div>
      <Link to='/pokemon/add'>
        <img className='shadow-lg h-13 sm:h-16 fixed bottom-2 right-2 sm:bottom-9 sm:right-9 rounded-full bg-red-500 p-3 sm:p-5' src="../src/assets/icons/plus_math_26px.png" alt="add pokemon" />
      </Link>
    </div>
  )
}

export default PokemonList;