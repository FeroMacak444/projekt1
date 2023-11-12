import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import{ auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import {FaTrashCan} from 'react-icons/fa6';
import {LuMove} from 'react-icons/lu';
import {FaCheck} from 'react-icons/fa6';


function Homepage () {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

    //-----------------Create Item-------------------------------------------
    const writeToDatabase = () => {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd
      });
      setTodo("");
    };


    //-----------------Delete Item-------------------------------------------
    const handleDelete = (uid) => {
      if (window.confirm("Praješ si odstrániť túto položku?")){
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
      }
    };

    //-----------------Check Item-------------------------------------------
    const handleCheck = (uid) => {
      if(window.confirm("Praješ si aby táto položka bola braná ako dokončená a odstránila sa?")){
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
      }
    };

    //----------------Sign Out button---------------------------------------
    const navigate = useNavigate();

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if(user){
          onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
            setTodos([]);
            const data = snapshot.val();
            if(data !== null){
              Object.values(data).map(todo => {
                setTodos((oldArray) => [...oldArray, todo]);
              })
            }
          });
        }else if(!user){
        navigate('/');
        }
      });
    }, []);

    const handleSignOut = () => {
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error) => alert(error.message));
    };
    

  return (
    <div className="app overflow-hidden">
      {/* NAVBAR */}
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">ToDo aplikácia</span>
          <form action="#" className='d-flex'>
            <button className='btn btn-dark bg-gradient btn-sm float-sm-end ' onClick={handleSignOut}><span>Sign Out      </span><ImExit/></button>
          </form>
        </div>
      </nav>
      {/* Page */}
      <div className="row justify-content-center mt-5">
        <div className="col-6" droppable>
              <div className="input-group mt-3">
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className='form-control'/>
                <button  onClick={writeToDatabase} className='btn btn-dark waves-effect waves-light'>Add</button>
              </div>
          </div>
        </div>
      <div className="row m-2 mt-4 justify-content-center">
        <div className="col-4">
            <ul className='list-group shadow'>
              <li className='list-group-item'>
                <h4 className='text-center'>Vytvorené</h4>
                {
                  todos.map(todo => (
                      <div className="card m-3">
                          <div className="card-body pb-2 pt-2">
                              <div className="d-flex justify-content-between align-middle">
                                  <div className="col-auto">
                                      <button className='btn btn-md'><LuMove/></button>
                                  </div>
                                  <div className="col-7 overflow-auto mt-1" style={{height: "43px"}}>
                                      <h5 className='text-center mb-0'>{todo.todo}</h5> 
                                  </div>
                                  <div className="col-auto">
                                      <button onClick={() => handleDelete(todo.uidd)} className='btn btn-xl'>{<FaTrashCan/>}</button>
                                      <button onClick={() => handleCheck(todo.uidd)} className='btn btn-xl'>{<FaCheck/>}</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                }
              </li>
            </ul>
          </div>
          <div className="col-4">
            <ul className='list-group shadow'>
              <li className='list-group-item'>
                <h4 className='text-center'>Prebiehajúce</h4>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <ul className='list-group shadow'>
              <li className='list-group-item'>
                <h4 className='text-center'>Dokončené</h4>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}
export default Homepage;