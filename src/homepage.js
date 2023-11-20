import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import{ auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PiSignOutBold } from 'react-icons/pi';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
import {FaTrashCan} from 'react-icons/fa6';
import {FaCheck} from 'react-icons/fa6';
import { toast, Toaster } from 'react-hot-toast';

function Homepage (props) {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

    //-----------------Create Item-------------------------------------------
    const writeToDatabase = () => {
      if (todo.trim() === "") {
        toast('Nemôžeš pridať prázdnu položku',
          {
            icon: '⛔',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        return;
      } else if(todo.trim() !== ""){
        toast('Položka bola pridaná',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
          todo: todo,
          uidd: uidd
        });
        setTodo("");
      }
    };

    //-----------------Delete Item-------------------------------------------
    const handleDelete = (uid) => {
      toast('Položka bola odstránená',
          {
            icon: '🗑️',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
      remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    //-----------------Check Item-------------------------------------------
    const handleCheck = (uid) => {
      toast('Položka bola označená ako dokončená a následne odstránená',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
      remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
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
      <div><Toaster position="top-center" reverseOrder={true}/></div>
      {/* NAVBAR */}
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">ToDo aplikácia</span>
          <form action="#" className='d-flex'>
            <button className='btn btn-dark bg-gradient btn-sm float-sm-end ' onClick={handleSignOut}><span className='pe-2'>Sign Out</span><PiSignOutBold/></button>
          </form>
        </div>
      </nav>
      {/* Page */}
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <div className="input-group mt-3">
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className='form-control'/>
                <button onClick={writeToDatabase} className='btn btn-dark waves-effect waves-light'>Add</button>
              </div>
              {todos.map(todo => (
                    <div className="card m-3">
                        <div className="card-body pb-2 pt-2">
                            <div className="row g3">
                              <div className='col-2'/>
                              <div className="col-7 overflow-auto mt-1" style={{height: "43px"}}>
                                  <h5 className='text-center'>{todo.todo}</h5> 
                              </div>
                              <div className='col-1'/>
                              <div className="col-auto">
                                  <button onClick={() => handleDelete(todo.uidd)} className='btn btn-xl'>{<FaTrashCan/>}</button>
                                  <button onClick={() => handleCheck(todo.uidd)} className='btn btn-xl'>{<FaCheck/>}</button>
                              </div>
                            </div>
                        </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Homepage;