import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToDo from './ToDo';
import { query, collection, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore';
import{db} from './firebase';

function Homepage(){
  const [Todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //Create Item

  const createTodo = async(e) => {
    e.preventDefault(e);
    if(input === ''){
      alert('Please enter a valid ToDo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('');
  };

  //Read Item

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(),id: doc.id});
      });
      setTodos(todosArr)
    });
    return() => unsubscribe();
  }, []);

  //Delete Item

  const deleteTodo = async(id) => {
    await deleteDoc(doc(db, 'todos', id))
  };


  return (
    <div className="app">
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h2 className='text-center'>/*Treba zadať nadpis*/</h2>
              <form onSubmit={createTodo}>
                <div className="input-group">
                  <div className="form-floating">
                    <input value={input} id='floatingInput' onChange={(e) => setInput(e.target.value)} type="text" className='form-control' placeholder="Zadaj-ulohy"/>
                    <label for="floatingInput">Zadaj úlohy</label>
                  </div>
                  <button className='btn btn-dark waves-effect waves-light'>Add</button>
                </div>
              </form>
                  {Todos.map((todo) => (
                    <ToDo key={todo.id} ToDo={todo} deleteTodo={deleteTodo}/>
                  ))}
              {Todos.length < 1 ? null : <p className='text-center mt-2 mb-0'>{`Máš ${Todos.length} úloh.`}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-5">
          <ul className='list-group'>
            <li className='list-group-item'>
              <h4 className='text-center'>Prebiehajúce</h4>
            </li>
          </ul>
        </div>
        <div className="col-5">
            <ul className='list-group'>
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