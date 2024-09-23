import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import { Link } from "react-router-dom";


const PokemonSearch:FunctionComponent = () => {

  const [term, setTerm] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term: string = e.target.value;
    setTerm(term);

    if(term.length<=1) {
      setPokemons([]);
      return;
    }

    PokemonService.searchPokemon(term).then(pokemons => setPokemons(pokemons));
  }

  return (
    <div className='relative w-4/5 sm:w-4/5 lg:w-1/2 m-auto border-2 rounded-sm p-7 my-10'>
      <input type="text" className="text-lg outline-none border-b-4 border-teal-500 py-3 w-full my-3" placeholder="Rechercher un pokémon" value={term} onChange={e => handleInputChange(e)} />
      <div className="border-2 mt-3">
        {
          pokemons.map(pokemon => (
            <Link to={`/pokemons/${pokemon.id}`}>
              <div className="p-5 border-b-2 text-teal-500 font-medium hover:bg-gray-200" key={pokemon.id}>{pokemon.name}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default PokemonSearch;