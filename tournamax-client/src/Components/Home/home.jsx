import { NavLink, useParams } from "react-router-dom"
import { Form } from "./add";
import Topics from "./Topics";
import { useState } from "react";

const Crud = () => {
    const [add,setAdd]=useState(false);
    const {id}=useParams();
    const handleAdd=()=>{
        setAdd(!add)
    }
  return (
    <div className="max-w-3xl mx-auto p-4">
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 shadow-md">
            <NavLink to="/" className="text-white text-xl font-semibold hover:text-slate-300 transition duration-200">Tournamax</NavLink>
            <NavLink to="/add" onClick={handleAdd} className="bg-white text-slate-800 font-medium py-2 px-4 rounded hover:bg-slate-100 transition duration-200">Add</NavLink>
        </nav>
        <div className="mt-8">
            {
                add?<Form/>:id?<Form/>:<Topics/>
            }
        </div>
    </div>
  )
}

export default Crud
