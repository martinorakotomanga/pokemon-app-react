import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const PageNotFound: FunctionComponent = () => {
  return(
    <div className="h-full w-full">
      <img className="mt-10 w-2/5 m-auto" src="./src/assets/pictures/35clefairy1600x1200.jpg" alt="" />
      <p className="mt-10 text-gray-900 text-center text-xl"> 
        Hi, Cette page n'existe pas !
        <small className="p-2 text-lg text-gray-700">
          Pour <br />
          retourner dans l'accueil
        </small>
      </p>
      <h2  className="mt-5 text-center text-teal-600 text-lg font-bold">
        <Link to='/pokemons'> Clicker ici !</Link>
      </h2>
    </div>
  )
}

export default PageNotFound;