import React, { useContext } from "react";
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';
import { AuthContext } from "./context/AuthContext";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);

    return(
        <div className="navbar">
            <span className="logo">Chatter</span>
            <div className="user">
                <img src="https://images.pexels.com/photos/4545786/pexels-photo-4545786.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""/>
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;