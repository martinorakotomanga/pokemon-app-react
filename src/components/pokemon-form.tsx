import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import { useNavigate } from "react-router-dom";
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon,
  isEditForm: boolean
};

type Field = {
  value: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  name: Field,
  picture: Field,
  hp: Field,
  cp: Field,
  types: Field
};

const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {

  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name },
    picture: { value: pokemon.picture, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: {value: pokemon.types, isValid: true }
  });

  const navigate = useNavigate();
  
  const types: string[] = [
    'Poison', 'Plante', 'Feu', 'Eau', 'Insecte', 'Normal',
    'Vol', 'Electrik', 'Fee', 'Combat', 'Psy'
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newField = {[fieldName]: {value: fieldValue}};

    setForm({ ...form, ... newField });
  }

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    let newField: Field;

    if(checked) {
      const newTypes = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      const newTypes = form.types.value.filter((currentType: string) => currentType !== type);
      newField = { value: newTypes };
    }

    setForm({ ...form, types: newField });
  }

  const isAddForm = () => {
    return !isEditForm;
  }

  const validateForm = (): boolean|undefined => {
    let newForm: Form = form;

    if(isAddForm()) {
      const start: string = './src/assets/pictures/';
      const end: string = '.jpg';

      if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
        const errorMsg: string = 'L\'url n\'est pas valide !';
        const newField: Field = { value: newForm.picture.value, error: errorMsg, isValid: false };
        newForm = { ...newForm, ...{ picture: newField} };
      } else {
        const newField: Field = { value: newForm.picture.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ picture: newField} };
      }
    }

    if(!/^[a-zA-Zéàè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
      const newField: Field = { value: newForm.name.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{name: newField} };
    } else {
      const newField: Field = { value: newForm.name.value, error: '', isValid: true };
      newForm = { ...newForm, ...{name: newField} };
    }

    if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = 'Les points de vie du pokémon sont requis entre 0 et 999';
      const newField: Field = { value: newForm.hp.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{hp: newField} };
    } else {
      const newField: Field = { value: newForm.hp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{hp: newField} };
    }

    if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string = 'Les dégâts du pokémon sont requis entre 0 et 99';
      const newField: Field = { value: newForm.cp.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{cp: newField} };
    } else {
      const newField: Field = { value: newForm.cp.value, error: '', isValid: true };
      newForm = { ...newForm, ...{cp: newField} };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid && newForm.picture.isValid;
  }

  const isTypesValid = (type: string) => {

    if(form.types.value.length == 1 && hasType(type)) {
      return false;
    }

    if(form.types.value.length >=3 && !hasType(type)) {
      return false;
    }

    return true;
  }

  const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if(isFormValid) {
      pokemon.picture = form.picture.value;
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;

      isEditForm ? updatePokemon() : addPokemon();
    }
  }

  const updatePokemon= () => {
    PokemonService.updatePokemon(pokemon).then(() => navigate(`/pokemons/${pokemon.id}`));
  }
  
  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => navigate('/pokemons'));
  }

  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon.id).then(() => navigate('/pokemons'));
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className="w-full lg:w-4/5 xl:w-2/3 m-auto lg:my-10 lg:border-2 rounded-sm">
      {
        isEditForm ? ( 
        <div className="w-full relative py-4">
          <img className="h-1/2 w-4/5 sm:w-3/5 lg:w-1/3 m-auto mt-5" src={`../.${pokemon.picture}`} alt={pokemon.name} />  
          <img onClick={deletePokemon} className="h-12 hover:cursor-pointer absolute right-12 bottom-0 p-3 bg-teal-500 rounded-full" src="../../src/assets/icons/trash_30px.png" alt="delete icon" />
        </div>
        ) : (
          /* Pokemon picture */
          <div className="w-full py-5 px-10 flex flex-col mt-10">
            <label htmlFor="name" className="text-gray-500">Image</label>
            <input className="outline-none h-10 border-b-2 border-gray-500" type="text" id='picture' name="picture" value={form.picture.value} onChange={e => handleInputChange(e)} />
            {
              form.picture.error &&
              <div className="p-5 text-center bg-red-300 text-lg rounded-md mt-1 text-gray-800">{form.picture.error}</div>
            }
          </div>
        )
      }
      {/* Pokémon name */}
      <div className="w-full py-5 px-10 flex flex-col">
        <label htmlFor="name" className="text-gray-500">Nom</label>
        <input className="outline-none h-10 border-b-2 border-gray-500" type="text" id='name' name="name" value={form.name.value} onChange={e => handleInputChange(e)} />
        {
          form.name.error &&
          <div className="p-5 text-center bg-red-300 text-lg rounded-md mt-1 text-gray-800">{form.name.error}</div>
        }
      </div>
      {/* Pokémon hp */}
      <div className="w-full py-5 px-10 flex flex-col">
        <label htmlFor="hp" className="text-gray-500">Points de vie</label>
        <input className="outline-none h-10 border-b-2 border-gray-500" type="number" id='hp' name="hp" value={form.hp.value} onChange={e => handleInputChange(e)} />
        {
          form.hp.error &&
          <div className="p-5 text-center bg-red-300 text-lg rounded-md mt-1 text-gray-800">{form.hp.error}</div>
        }
      </div>
      {/* Pokémon cp */}
      <div className="w-full py-5 px-10 flex flex-col">
        <label htmlFor="cp" className="text-gray-500">Dégats</label>
        <input className="outline-none h-10 border-b-2 border-gray-500" type="number" id='cp' name="cp" value={form.cp.value} onChange={e => handleInputChange(e)} />
        {
          form.cp.error &&
          <div className="p-5 text-center bg-red-300 text-lg rounded-md mt-1 text-gray-800">{form.cp.error}</div>
        }
      </div>
      {/* Pokémon types */}
      <div className="mt-8 px-10">Types
        {types.map(type => (
          <div className="p-3" key={type}>
            <input type="checkbox" id={type} value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)} />
            <label htmlFor={type}>
              <span className={`${formatType(type)} m-2 rounded-full p-2`}>{ type }</span>
            </label>
          </div>
        ))}
      </div>
      <div className="py-3 w-full flex justify-center items-center text-center mt-10 border-t">
        <button type="submit" className="py-2 rounded-sm px-4 bg-teal-600 text-white hover:cursor-pointer">VALIDER</button>
      </div>
    </form>
  )
}

export default PokemonForm;