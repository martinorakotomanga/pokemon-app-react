import { FunctionComponent } from 'react';
import PokemonList from './pages/pokemon-list';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonDetail from './pages/pokemon-detail';
import { Link } from 'react-router-dom';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';
import pokemonAdd from './pages/pokemon-add';
import Login from './pages/Login';
import PrivateRoute from './private-route';

const App: FunctionComponent = () => {

  return (
    <Router>
      <nav>
        <h1 className='text-center py-5 mb-5 text-white text-4xl font-medium bg-teal-600'>
          <Link to='/'>Pokédex</Link>
        </h1>
      </nav>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route Component={PrivateRoute}>
          <Route path='/' Component={PokemonList} />
          <Route path='/pokemons' Component={PokemonList} />
          <Route path='/pokemons/:id' Component={PokemonDetail} />
          <Route path='/pokemons/edit/:id' Component={PokemonEdit} />
          <Route path='/pokemon/add' Component={pokemonAdd} />
          <Route path='*' Component={PageNotFound} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
