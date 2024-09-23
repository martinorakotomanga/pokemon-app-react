import React, { FunctionComponent, useState } from "react";
import AuthenticationService from "../services/authentication-service";
import { useNavigate } from "react-router-dom";

type Field = {
  value: any,
  error?: string,
  isValid?: boolean
}

type Form = {
  userName: Field,
  password: Field
}

const Login: FunctionComponent = () => {

  const [message, setMessage] = useState<string>('Vous êtes déconnecté. (pikachu / pikachu)');

  const [form, setForm] = useState<Form>({
    userName: { value: '' },
    password: { value: '' }
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newField = { [fieldName] : { value: fieldValue } };

    setForm({ ...form, ...newField });
  }

  const validateForm = () => {
    let newForm = form;

    if(form.userName.value.length < 3) {
      const errorMsg: string = 'Votre nom doit faire au moins 3 caractères de long.';
      const newField: Field = { value: form.userName.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ userName: newField }};
    } else {
      const newField: Field = { value: form.userName.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ userName: newField }};
    }

    if(form.password.value.length < 7) {
      const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
      const newField: Field = { value: newForm.password.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ password: newField }};
    } else {
      const newField: Field = { value: newForm.password.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ password: newField }};
    }

    setForm(newForm);
    return newForm.userName.isValid && newForm.password.value;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if(isFormValid) {
      setMessage('Tentative de connexion en cours ...');
      AuthenticationService.login(form.userName.value, form.password.value).then(isAuthenticated => {
        if(!isAuthenticated) {
          setMessage('Identifiant ou mot de passe incorrect.');
          return;
        }

        navigate("/pokemons");
      })
    }
  }

  return (
    <div className='mt-20 w-full'>
      <form className="w-full sm:w-4/5 lg:w-2/3 m-auto sm:border-2 p-10 rounded-md" onSubmit={e => handleSubmit(e)}>
        <div className="p-5 border-2 rounded-lg bg-teal-50">{message}</div>
        <div className='mt-10 px-5'>
          <label htmlFor="username">username</label>
          <input className="w-full border-b-2 py-2 mb-2 outline-none" name='userName' type="text" id="username" value={form.userName.value} onChange={e => handleInputChange(e)} />
          {
            form.userName.error && 
            <div className="p-5 text-center bg-red-300 text-lg rounded-md mb-5 text-gray-800">{form.userName.error}</div>
          }
        </div>
        <div className='px-5 mt-5'>
          <label htmlFor="password">password</label>
          <input className="w-full border-b-2 py-2 mb-2 outline-none" name='password' type="password" id="password" value={form.password.value} onChange={e => handleInputChange(e)} />
          {
            form.password.error && 
            <div className="p-5 text-center bg-red-300 text-lg rounded-md mt-1 text-gray-800">{form.password.error}</div>
          }
        </div>
        <div className="text-end mt-2 px-5">
          <button className="text-white text-lg rounded-sm px-4 py-2 bg-teal-600" type='submit'>Se connecter</button>
        </div>
      </form>
    </div>
  )
}

export default Login;