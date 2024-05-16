import React, { useState } from "react";
// import Register from "./pages/Register";
import Add from "../imgs/img.jpg"
import { useNavigate , Link} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {

    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        const email = e.target[0].value;
        const password = e.target[1].value;
        


        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
            // .catch((err) => {       
            //     navigate("/");
            // });


        }catch(err){
            setErr(true);

        }
    };



    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">MchatS</span> <br></br>
                <span className="title">Login</span>
                {err && <p style={{ color: "red" }}>Invalid email or password!</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign in</button>
                </form>
                <p>You Don't have an account?<Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;