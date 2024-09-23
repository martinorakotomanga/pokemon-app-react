import POKEMONS from "../models/mock-pokemon";
import Pokemon from "../models/pokemon";

export default class PokemonService {

  static pokemons: Pokemon[] = POKEMONS;
  
  static isDev = false;

  static getPokemons(): Promise<Pokemon[]> {
    if(this.isDev) {
      return fetch('http://localhost:8080/pokemons')
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      resolve(this.pokemons);
    });
  }

  static getPokemon(id: number): Promise<Pokemon|null|undefined> {
    if(this.isDev) {
      return fetch(`http://localhost:8080/pokemons/${id}`)
        .then(response => response.json())
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      resolve(this.pokemons.find(pokemon => pokemon.id === id));
    });
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if(this.isDev) {
      return fetch(`http://localhost:8080/pokemons/${pokemon.id}`, {
        method: 'PUT',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json'}
      })
        .then(pokemon => pokemon.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    });
  }

  static deletePokemon(pokemonId: number): Promise<{}> {
    if(this.isDev) {
      return fetch(`http://localhost:8080/pokemons/${pokemonId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
      }
      
      return new Promise(resolve => {
        this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== pokemonId);
        resolve({});
      })
    }

  static addPokemon(newPokemon: Pokemon): Promise<Pokemon> {
    delete newPokemon.created;

    if(this.isDev) {
      return fetch('http://localhost:8080/pokemons', {
        method: 'POST',
        body: JSON.stringify(newPokemon),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      this.pokemons.push(newPokemon);
      resolve(newPokemon);
    });
  }

  static searchPokemon(term: string): Promise<Pokemon[]> {
    if(this.isDev) {
      return fetch(`http://localhost:8080/pokemons?q=${term}`)
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const results = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLocaleLowerCase()));
      resolve(results);
    });
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}