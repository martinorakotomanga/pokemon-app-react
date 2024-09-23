import { FunctionComponent, useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import { useParams } from "react-router-dom";
import PokemonForm from "../components/pokemon-form";
import PokemonService from "../services/pokemon-service";
import Loader from "../components/loader";

const PokemonEdit: FunctionComponent = () => {

  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  const id = useParams().id ?? -1;

  useEffect(() => {
    PokemonService.getPokemon(+id).then(pokemon => setPokemon(pokemon));
  }, [id]);

  return (
    <div className="w-full p-1">
      {pokemon ? (
          <div className="w-full">
            <h2 className="text-center text-4xl">Editer {pokemon.name}</h2>
            <PokemonForm pokemon={pokemon} isEditForm={true} />
          </div>
        ) : (
          <Loader />
        )
      }
    </div>
  )
}

export default PokemonEdit;