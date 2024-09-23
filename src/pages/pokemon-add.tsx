import { FunctionComponent, useState } from "react";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";

const pokemonAdd: FunctionComponent = () => {

  const [id] = useState<number>(new Date().getTime());
  const [pokemon] = useState<Pokemon>(new Pokemon(id));

  return (
    <div className="w-full p-1">
      <h2 className="hidden sm:block text-center text-4xl">Ajouter un Pokémon !</h2>
      <h2 className="block sm:hidden text-center text-4xl">Ajout !</h2>
      <PokemonForm pokemon={pokemon}  isEditForm={false} />
    </div>
  )
}

export default pokemonAdd;