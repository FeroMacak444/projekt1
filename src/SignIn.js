import React,{useState, useEffect} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { auth } from './firebase';
import { signInWithGoogle } from './firebase';
import 'bootstrap/dist/css/bootstrap.css';
import {FaGoogle} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerInformation, setRegisterInformation] = useState({
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  //LogIn
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        navigate('/homepage');
      }
    })
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const handleSignIn = (a) => {
    signInWithEmailAndPassword(auth, email, password).then(()=>{
      localStorage.setItem('email', email);
      navigate('/homepage');
    }).catch((error) => alert("Nesprávne meno alebo heslo"));
  };


  ///Create Account

  const handleRegister = (e) => {
    if(registerInformation.password !== registerInformation.confirmPassword){
      alert('Heslá sa nezhodujú');
      return;
    };
    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password).then(()=>{
      localStorage.setItem('email', registerInformation.email);
      navigate('/homepage');
    }).catch((error) => alert(error.message));
  };

  return (
      <div className="App dark">
        <div className="account-pages mt-5 mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <h1>Treba Zadať nadpis SEM !!!!</h1>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="p-sm-3">
                          {/*Nadpis -> LogIn*/}
                          <h4>Log In</h4>
                          <p className='mb-3'>Zadaj email a heslo na prihlásenie.</p>
                            <div className="mb-3">
                              <label htmlFor="emailaddress" className='form-label'>Email address</label>
                              <input type="email" id='emailaddress' placeholder='Zadaj Email@' className='form-control' value={email} required onChange={handleEmailChange}/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className='form-label'>Password</label>
                              <input type="password" id='password' placeholder='Zadaj heslo' value={password} className='form-control' required onChange={handlePasswordChange}/>
                            </div>
                            <div className="mb-3">
                              <button className='btn btn-dark bg-gradient btn-sm  float-sm-end' onClick={handleSignIn}>Log In</button>
                            </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-sm-3">
                          <h4>Sign Up</h4>
                          <p className='mb-3'>Vytvor si účet. Bude to trvať menej ako minútu.</p>
                            <div className="mb-3">
                              <label htmlFor="emailaddress2" className='form-label'>Email address</label>
                              <input type="email" id='emailaddress2' placeholder='Zadaj Email@' className='form-control' value={registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})} required/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password2" className='form-label'>Password</label>
                              <input type="password" id='password2' placeholder='Zadaj heslo'className='form-control' value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})} required/>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password2" className='form-label'>Password</label>
                              <input type="password" id='password3' placeholder='Zadaj heslo'className='form-control' value={registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})} required/>
                            </div>
                            <div className="mb-3">
                              <button onClick={ signInWithGoogle } className='btn btn-sm waves-effect waves-light rounded-pill'><FaGoogle/></button>
                              <button className='btn btn-dark bg-gradient btn-sm float-sm-end' onClick={handleRegister}>Sign Up</button>
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
      </div>
  );
}
export default SignIn;