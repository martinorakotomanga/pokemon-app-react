import Pokemon from './pokemon';

const POKEMONS: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbizarre',
    hp: 25,
    cp: 5,
    picture: './src/assets/pictures/1bulbasaur1600x1200.jpg',
    types: ['Poison', 'Plante'],
    created: new Date()
  },
  {
    id: 2,
    name: 'Salemeche',
    hp: 25,
    cp: 5,
    picture: './src/assets/pictures/4charmander1600x1200.jpg',
    types: ['Feu'],
    created: new Date()
  },
  {
    id: 3,
    name: 'Carapuce',
    hp: 21,
    cp: 4,
    picture: './src/assets/pictures/7squirtle1600x1200.jpg',
    types: ['Eau'],
    created: new Date()
  },
  {
    id: 4,
    name: 'Aspicot',
    hp: 16,
    cp: 2,
    picture: './src/assets/pictures/13weedle1600x1200.jpg',
    types: ['Poison', 'Insecte'],
    created: new Date()
  },
  {
    id: 5,
    name: 'Roucool',
    hp: 30,
    cp: 7,
    picture: './src/assets/pictures/18pidgeot1600x1200.jpg',
    types: ['Normal', 'Vol'],
    created: new Date()
  },
  {
    id: 6,
    name: 'Rattata',
    hp: 18,
    cp: 6,
    picture: './src/assets/pictures/19rattata1600x1200.jpg',
    types: ['Normal'],
    created: new Date()
  },
  {
    id: 7,
    name: 'Piafabec',
    hp: 14,
    cp: 5,
    picture: './src/assets/pictures/21spearow1600x1200.jpg',
    types: ['Normal', 'Vol'],
    created: new Date()
  },
  {
    id: 8,
    name: 'Abo',
    hp: 16,
    cp: 4,
    picture: './src/assets/pictures/23ekans1600x1200.jpg',
    types: ['Poison'],
    created: new Date()
  },
  {
    id: 9,
    name: 'Pikachu',
    hp: 21,
    cp: 7,
    picture: './src/assets/pictures/25pikachu1600x1200.jpg',
    types: ['Electrik'],
    created: new Date()
  },
  {
    id: 10,
    name: 'Sablette',
    hp: 19,
    cp: 3,
    picture: './src/assets/pictures/27sandshrew1600x1200.jpg',
    types: ['Normal'],
    created: new Date()
  },
  {
    id: 11,
    name: 'Melofee',
    hp: 25,
    cp: 5,
    picture: './src/assets/pictures/35clefairy1600x1200.jpg',
    types: ['Fee'],
    created: new Date()
  },
  {
    id: 12,
    name: 'Groupix',
    hp: 17,
    cp: 8,
    picture: './src/assets/pictures/37vulpix1600x1200.jpg',
    types: ['Feu'],
    created: new Date()
  }
];

export default POKEMONS;