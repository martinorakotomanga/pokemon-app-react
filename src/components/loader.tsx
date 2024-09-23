import { FunctionComponent } from "react";

const Loader: FunctionComponent = () => {
  return (
    <div className='w-full h-full flex justify-center content-center'>
      <img className='animate-spin h-20' src="../../src/assets/icons/spinner_40px.png" alt="loader" />
    </div>
  )
}

export default Loader;