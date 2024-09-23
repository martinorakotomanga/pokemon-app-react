import { FunctionComponent, useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import { useParams } from "react-router-dom";
import formatType from "../helpers/format-type";
import formatDate from "../helpers/format-date";
import { Link } from "react-router-dom";
import PokemonService from "../services/pokemon-service";
import Loader from "../components/loader";

const PokemonDetail: FunctionComponent = () => { 

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const id = useParams().id ?? -1;

  useEffect(() => {
    PokemonService.getPokemon(+id).then(pokemon => setPokemon(pokemon));
  }, [id]);

  return (
    <div className="w-full lg:w-4/5 xl:w-2/3 m-auto pt-20 lg:py-20">
      { pokemon ? (
        <div className="flex flex-col items-center">
          <div className="text-center text-4xl font-medium mb-10">{pokemon.name} !</div>
          <div className="w-full lg:shadow-lg font-medium text-lg lg:border p-5">
            <div className="relative sm:h-72">
              <img src={`.${pokemon.picture}`} className="sm:w-2/5 lg:w-1/3 m-auto mb-5" alt={pokemon.name} />
              <Link to={`/pokemons/edit/${pokemon.id}`}>
                <img className="h-12 bg-teal-500 m-10 absolute bottom-0 right-0 p-3 rounded-full"
                  src="../src/assets/icons/edit_24px.png" alt="edit" />
              </Link>
            </div>
            <div className="mt-10 p-5 bg-gray-100 grid grid-cols-2 sm:mx-10">
              <p>Nom</p>
              <p>{pokemon.name}</p>
            </div>
            <div className="p-5 grid grid-cols-2 sm:mx-10 mt-3">
              <p>Points de vie</p>
              <p>{pokemon.hp}</p>
            </div>
            <div className="p-5 bg-gray-100 grid grid-cols-2 sm:mx-10 mt-3">
              <p>Dégats</p>
              <p>{pokemon.cp}</p>
            </div>
            <div className="p-5 grid grid-cols-2 sm:mx-10 mt-3">
              <p>Types</p>
              <div>
                {pokemon.types.map(type => (
                  <span key={type} className={`${formatType(type)} text-center p-2 m-1 rounded-3xl`}>{type}</span>
                ))}
              </div>
            </div>
            <div className="p-5 bg-gray-100 grid grid-cols-2 sm:mx-10 mt-3">
              <p>Date de création</p>
              <p>{formatDate(pokemon.created)}</p>
            </div>
            <div className="sm:m-5 my-10 p-5 grid grid-cols-2 text-orange-400 text-2xl">
              <Link to='/'>Retour</Link>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default PokemonDetail;