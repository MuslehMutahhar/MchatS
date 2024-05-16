import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {

    const {currentUser} = useContext(AuthContext)

    return(
        <div className="Navbar">
            <span className="logo">MchatS</span>
            
            <div className="user">
                <br></br>
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                
            </div>
            
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>


    )
}

export default Navbar;