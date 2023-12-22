import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PiSignOutBold } from 'react-icons/pi';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
import { toast, Toaster } from 'react-hot-toast';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FiAlignJustify } from "react-icons/fi";
import { FaRegUser, FaRegCheckCircle } from "react-icons/fa";
import {FaTrashCan, FaCheck} from 'react-icons/fa6';

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
        localStorage.clear();
      }).catch((error) => alert(error.message));
    };

    //-----------------Modal-------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const email = localStorage.getItem('email');
    const googleEmail = localStorage.getItem('googleEmail');
    const password = localStorage.getItem('password');

  return (
    <div className="app overflow-hidden">
      <div><Toaster position="top-center" reverseOrder={true}/></div>
      {/* NAVBAR */}
      <nav className="navbar bg-dark border-bottom border-body p-0" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Todo App   <FaRegCheckCircle/></span>
          <form action="#">
          <Dropdown className='btn'>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FiAlignJustify/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={handleShow}><span className='me-2'>Account</span><FaRegUser /></Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={handleSignOut}><span className='me-2'>Sign Out</span><PiSignOutBold/></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </form>
        </div>
      </nav>
      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><span className='me-2'>Account</span><FaRegUser /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Dispaly name:</Form.Label>
              <Form.Label><span className='ms-2 fw-bold'>{email}{googleEmail}</span></Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Password:</Form.Label>
              <Form.Label>
                  {password ? <span className='ms-2 fw-bold'>{password}</span> : <span className='ms-2 fw-bold text-danger'>Nemáš prístup k heslu, lebo si sa prihlásil pomocou Google účtu</span>}
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Page */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form action="#" onSubmit={writeToDatabase}>
                <div className="input-group mt-3">
                  <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className='form-control'/>
                  <button className='btn btn-dark waves-effect waves-light'>Add</button>
                </div>
              </form>
              {todos.map(todo => (
                <div className="card m-3">
                    <div className="card-body pb-2 pt-2">
                      <div className="row justify-content-between" style={{height: "43px"}}>
                            <div className="col-8 overflow-auto mt-2 pe-0" style={{height: "43px"}}>
                                <h5>{todo.todo}</h5> 
                            </div>
                          <div className="col-auto position-absolute top-50 end-0 translate-middle-y" style={{height: "43px"}}>
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