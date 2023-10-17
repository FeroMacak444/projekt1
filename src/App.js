import React,{ useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SignIn from './SignIn';
import Homepage from './homepage';

function App(){

  const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
        });
    }, []);

  return (
    <div className='app'> {/*Čo to nejde?!?! (bg-color na celu stranku iba na časť) ----> treba poriešiť*/}
      <div>{ authUser ? <Homepage/> : <SignIn/>}</div>
    </div>
  );
}
export default App;