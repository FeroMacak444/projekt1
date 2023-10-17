import React from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useState } from 'react';
import { signInWithGoogle } from './firebase';
import 'bootstrap/dist/css/bootstrap.css';


const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email2, setEmail2] = useState('');
  const [password2, setPassword2] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const signUp = (b) => {
    b.preventDefault();
    createUserWithEmailAndPassword(auth, email2, password2)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  
  return (
      <div className="App dark">
        <div className="account-pages mt-5 mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9">
                <div className="card bg-pattern border-3 border-secondary bg-dark">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <h1>{/*Treba Zadať nadpis SEM !!!!*/}</h1>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="p-sm-3">
                          {/*Nadpis -> LogIn*/}
                          <h4 className='text-light'>Log In</h4>
                          <p className='mb-4 text-light'>Zadaj email a heslo na prihlásenie.</p>
                          <form onSubmit={signIn}>
                            <div className="mb-3">
                              <label htmlFor="emailaddress" className='form-label text-light'>Email address</label>
                              <input type="email" id='emailaddress' placeholder='Zadaj Email@' className='form-control' value={email} required onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className='form-label text-light'>Password</label>
                              <input type="password" id='password' placeholder='Zadaj heslo' value={password} className='form-control' required onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                              <button className='btn btn-secondary bg-gradient btn-sm  float-sm-end'>Log In</button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-sm-3">
                          {/*Nadpis -> SignUp*/}
                          <h4 className='text-light'>Sign Up</h4>
                          <p className='mb-4 text-light'>Vytvor si účet. bude to trvať menej ako minútu.</p>
                          <form onSubmit={signUp}>
                            <div className="mb-3">
                              <label htmlFor="emailaddress2" className='form-label text-light'>Email address</label>
                              <input type="email" id='emailaddress2' placeholder='Zadaj Email@' className='form-control' value={email2} required onChange={(b) => setEmail2(b.target.value)}/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password2" className='form-label text-light'>Password</label>
                              <input type="password" id='password2' placeholder='Zadaj heslo' value={password2} className='form-control' required onChange={(b) => setPassword2(b.target.value)}/>
                            </div>
                            <div className="mb-3">
                              <button onClick={ signInWithGoogle } className='btn btn-sm btn-danger  waves-effect waves-light rounded-pill'>Google</button>
                              <button className='btn btn-secondary bg-gradient btn-sm float-sm-end'>Sign Up</button>
                            </div>  
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
  );
}
export default SignIn;