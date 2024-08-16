import { useEffect, useState } from 'react'
import { FaPenToSquare,FaTrash } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
const Topics = () => {
    const [tasks,setTasks]=useState([]);
    useEffect(() => {
        fetch('https://tournamax-task1-apii.vercel.app')
        .then(response => response.json())
        .then(data => setTasks(data))
        },
    )

    const deleteTodo = (id) =>{
        console.log(id);
        fetch(`https://tournamax-task1-apii.vercel.app/${id}`,{
          method:'DELETE' 
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if(data.acknowledged===true){
                  alert("task deleted successfully");
                }
            location.reload();
          });    
      } 
  return (
    <>
      {
        tasks.length==0?<div>{}</div>:
        tasks.map((task, index) => (      
    <div key={index} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>          
            <div>
                <h2 className="text-lg font-bold">{task.task}</h2>
                <p className="text-gray-600">{task.descr}</p>
            </div>
            <div className='flex gap-2'>
                <button className='text-red-400' onClick={() => deleteTodo(task._id)}>
                <FaTrash />
                </button>
                <NavLink to={`/update/${task._id}`} className='text-slate-500 hover:text-slate-700 transition-colors duration-200'>
                    <FaPenToSquare className='text-slate-500 hover:text-slate-700 transition-colors duration-200'/>
                </NavLink>
            </div>
        </div>
        )
        )
    }
    </>
  )
}

export default Topics
