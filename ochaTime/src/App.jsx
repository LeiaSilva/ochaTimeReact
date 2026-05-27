import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Shop } from './pages/shop';
import { LayoutPublic } from './layouts/LayoutPublic';
import './App.css'
import { Detalles } from './pages/Detalles';

function App() {

  const [carrito, setCarrito] = useState([]);
  const addToCarrito = (producto) =>{
    setCarrito([...carrito,producto])
  }

  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route element={<LayoutPublic carrito={carrito}></LayoutPublic>}>
          <Route path='/' element={<Shop addToCarrito={addToCarrito}></Shop>}></Route>
          <Route path='/producto/:id' element={<Detalles addToCarrito={addToCarrito}></Detalles>}></Route>
        </Route>
      </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
