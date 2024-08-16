import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
export const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {id}=useParams();
    const navigate=useNavigate();

    useEffect(() => {
        if(id){
            fetch(`https://tournamax-task1-apii.vercel.app/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Task not found');
                }
                return response.json()
        })
            .then(data =>{
                if(data && data.task && data.descr){
                    setTitle(data.task);
                    setDescription(data.descr);
                }
            } )
            .catch(error => {
                console.error('Error fetching task:', error);
                alert('Task not found or server error');
                // Optionally navigate back to home or show an error message
                navigate('/');
            });
        }
    },[id,navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            const url = id ? `https://tournamax-task1-apii.vercel.app/${id}` : `https://tournamax-task1-apii.vercel.app`;
            const method = id ? 'PUT' : 'POST';
            console.log(`Making ${method} request to: ${url}`);
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: title, descr: description })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if (result.acknowledged === true) {
                        alert(id ? "Task updated successfully" : "Task added successfully");
                        navigate('/');
                        location.reload();
                    }
                })
                .catch(error => {
                    console.error('Error updating task:', error);
                    alert('Error updating task');
                });
        } else {
            alert("Title and Description are required.");
        }
    };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-slate-500 px-8 py-2" placeholder='Topic title' />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-slate-500 px-8 py-2" placeholder='Topic description' />
        <button type="submit" className='bg-green-600 font-bold text-white py-3 rounded px-6 w-fit'>{id?'Update Topic':'Add Topic'}</button>
    </form>
  )
}
