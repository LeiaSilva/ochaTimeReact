import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Shop } from './pages/Shop';
import { Home } from './pages/Home';
import { SobreNosotros } from './pages/SobreNosotros';
import { LayoutPublic } from './layouts/LayoutPublic';
import { Detalles } from './pages/Detalles';
import { Login } from './pages/Login';
import './App.css'
import { Admin } from './pages/Admin';
import { RutaProtegida } from './components/RutaProtegida';
import {LayoutAdmin} from './layouts/LayoutAdmin';
import { ListaProductos } from './pages/ListaProductos';
import {RegistroUser} from './pages/RegistroUser';
import { LoginUser } from './pages/LoginUser';
import {Acceso} from './pages/Acceso';
import { GestionCupones } from './pages/GestionCupones';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPublic></LayoutPublic>}>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/Shop' element={<Shop></Shop>}></Route>
            <Route path='/QuienesSomos' element={<SobreNosotros></SobreNosotros>}></Route>
            <Route path='/producto/:id' element={<Detalles></Detalles>}></Route>
            <Route path='/Acceso' element={<Acceso></Acceso>}></Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/loginUser' element={<LoginUser></LoginUser>}></Route>
          <Route path='/RegistroUser' element={<RegistroUser></RegistroUser>}></Route>
          <Route element={
            <RutaProtegida>
              <LayoutAdmin></LayoutAdmin>
            </RutaProtegida>}>
            <Route path='/ListaProductos' element={<ListaProductos></ListaProductos>}></Route>
            <Route path='/Admin' element={<Admin></Admin>}></Route>
            <Route path='/GestionCupones' element={<GestionCupones></GestionCupones>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
