import React from 'react';
import SignIn from './SignIn';
import Homepage from './homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;