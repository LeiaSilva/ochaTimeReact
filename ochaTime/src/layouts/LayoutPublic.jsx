import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import './LayoutPublic.css';

export const LayoutPublic = ({children , carrito})=>{
    return(
        <>
            <header>
                <NavBar carrito={carrito}></NavBar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    )
}