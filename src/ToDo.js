import React from 'react'
import {FaTrashCan} from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.css';
import {LuMove} from 'react-icons/lu';

const ToDo = ({ToDo, deleteTodo}) => {
  return (
    <form action="#">
        <div className="card m-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-auto">
                        <LuMove/>
                    </div>
                    <div className="col-auto position-absolute top-50 start-50 translate-middle">
                        <label className='form-label'>{ToDo.text}</label>
                    </div>
                    <div className="col-auto position-absolute top-50 end-0 translate-middle-y">
                        <button onClick={() => deleteTodo(ToDo.id)} className='btn btn-xl pt-0'>{<FaTrashCan/>}</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}
export default ToDo;