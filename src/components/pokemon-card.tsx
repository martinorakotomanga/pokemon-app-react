import { FunctionComponent, useState } from "react";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import Pokemon from "../models/pokemon";
import '../components/pokemon-card.css';
import { useNavigate } from "react-router-dom";

type Props = {
  pokemon: Pokemon,
  borderColor?: string
};

const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}) => {

  const [color, setColor] = useState<string>('#f5f5f5');
  const navigate = useNavigate();

  const showBorder = () => {
    setColor(borderColor);
  }

  const hideBorder = () => {
    setColor('#f5f5f5');
  }

  const gotoPokemon = (id: number) => {
    navigate(`/pokemons/${id}`);
  }

  return (
    <div key={pokemon.id} onClick={() => gotoPokemon(pokemon.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder} style={{ borderColor: color }} className='card px-5 h-52 rounded-md flex justify-center items-center shadow-lg'>
      <div className='flex items-center'>
        <img className='rounded-sm h-28 w-32' src={pokemon.picture} alt={pokemon.name} />
      </div>
      <div className='w-48 p-2'>
        <p>{pokemon.name}</p>
        <p><small>{formatDate(pokemon.created)}</small></p>
        <div className="m-2">
          {pokemon.types.map(type => (
            <span className={`${formatType(type)} text-center p-2 rounded-3xl`}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard;