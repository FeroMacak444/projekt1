import React from 'react'
import {FaTrashCan} from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.css';
import {LuMove} from 'react-icons/lu';
import {FaCheck} from 'react-icons/fa6';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function ToDo ({ToDo, deleteTodo, checkTodo}) {

    const{
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: ToDo.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

  return (
    <form action="#" >
        <div className="card m-3" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="card-body pb-2 pt-2">
                <div className="d-flex justify-content-between align-middle">
                    <div className="col-auto">
                        <button className='btn btn-md'><LuMove/></button>
                    </div>
                    <div className="col-7 overflow-auto mt-1" style={{height: "43px"}}>
                        <h5 className='text-center mb-0'>{ToDo.text}</h5> 
                    </div>
                    <div className="col-auto">
                        <button onClick={() => deleteTodo(ToDo.id)} className='btn btn-xl'>{<FaTrashCan/>}</button>
                        <button onClick={() => checkTodo(ToDo.id)} className='btn btn-xl'>{<FaCheck/>}</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}
export default ToDo;