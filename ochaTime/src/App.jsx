import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Shop } from './pages/Shop';
import { Home } from './pages/Home';
import { SobreNosotros } from './pages/SobreNosotros';
import { LayoutPublic } from './layouts/LayoutPublic';
import { Detalles } from './pages/Detalles';
import './App.css'
function App() {


  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route element={<LayoutPublic></LayoutPublic>}>
          <Route path='/' element={<Shop></Shop>}></Route>
          <Route path='/Home' element={<Home></Home>}></Route>
          <Route path='/QuienesSomos' element={<SobreNosotros></SobreNosotros>}></Route>
          <Route path='/producto/:id' element={<Detalles></Detalles>}></Route>
        </Route>
      </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
