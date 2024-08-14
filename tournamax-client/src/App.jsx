import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Crud from './Components/Home/home';
import { Form } from './Components/Home/add';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Crud/>}>
          <Route path='/add' element={<Form/>}/>
          <Route path='/update/:id' element={<Form/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
