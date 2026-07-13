import { Outlet } from "react-router-dom";
import {NavBarAdmin} from '../components/NavBarAdmin';

export const LayoutAdmin = ({children})=>{
    return(
        <>
            <header>
                <NavBarAdmin></NavBarAdmin>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}