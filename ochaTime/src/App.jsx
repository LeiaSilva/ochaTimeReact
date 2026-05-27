import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Shop } from './pages/Shop';
import { Home } from './pages/Home';
import { SobreNosotros } from './pages/SobreNosotros';
import { LayoutPublic } from './layouts/LayoutPublic';
import { Detalles } from './pages/Detalles';
import './App.css'
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
          <Route path='/Home' element={<Home></Home>}></Route>
          <Route path='/QuienesSomos' element={<SobreNosotros></SobreNosotros>}></Route>
          <Route path='/producto/:id' element={<Detalles addToCarrito={addToCarrito}></Detalles>}></Route>
        </Route>
      </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
