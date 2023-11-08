import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToDo from './ToDo';
import { query, collection, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore';
import{ db } from './firebase';
import {DndContext, closestCenter} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function Homepage () {
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
        text: input
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
    const DeleteTodo = async(id) => {
      await deleteDoc(doc(db, 'todos', id))
    };


    //Check Item
    const CheckTodo = async(id) => {
      const confirmation = window.confirm('Praješ si aby bola táto úloha dokončená a následne zmazaná?');
      if (confirmation) {
        await deleteDoc(doc(db, 'todos', id));
      }
    };

    //Drag and drop

    function handleDragEnd(event) {
      console.log('Drag end over'); 
      const {active, over} = event;
      console.log("Active: " + active.id);
      console.log("Over: " + over.id);

      if (active.id !== over.id){
        setTodos((items) => {
          const activeIndex = items.indexOf((active.id));
          const overIndex = items.indexOf((over.id));
          console.log(arrayMove(items, activeIndex, overIndex));
          return arrayMove(items, activeIndex, overIndex);
        });
      }
    };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
    <div className="app overflow-hidden">
      {/* NAVBAR */}
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">ToDo aplikácia</span>
          <form action="#" className='d-flex'>
          </form>
        </div>
      </nav>
      {/* Page */}
      <div className="row justify-content-center mt-5">
        <div className="col-6" droppable>
            <form onSubmit={createTodo}>
              <div className="input-group mt-3">
                  <input value={input} id='Input' onChange={(e) => setInput(e.target.value)} type="text" className='form-control'/>
                <button className='btn btn-dark waves-effect waves-light'>Add</button>
              </div>
            </form>
          </div>
        </div>
      <div className="row m-2 mt-4 justify-content-center">
        <div className="col-4">
            <ul className='list-group shadow'>
              <li className='list-group-item'>
                <h4 className='text-center'>Vytvorené</h4>
                <SortableContext items={Todos} strategy={verticalListSortingStrategy}>
                  {Todos.map((todo) =>(
                      <ToDo key={todo.id} ToDo={todo} deleteTodo={DeleteTodo} checkTodo={CheckTodo}/>
                    ))}
                </SortableContext>
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
    </DndContext>
  )
}
export default Homepage;