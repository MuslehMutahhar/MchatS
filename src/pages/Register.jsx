import React, { useState , useEffect, useRef } from "react";
import Add from "../imgs/img.jpg"
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth, db,storage } from "../firebase";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate,Link } from "react-router-dom";



const Register = () => 
    {
        const [err,setErr] = useState(false);
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();
        const handleSubmit = async (e) =>{
            setLoading(true);
            e.preventDefault()
            const displayName = e.target[0].value;
            const email = e.target[1].value;
            const password = e.target[2].value;
            const file = e.target[3].files[0];


            try{
                const res = await createUserWithEmailAndPassword(auth,email,password);

                const date = new Date().getTime();
                const storageRef = ref(storage, `${displayName + date}`);

                
    
                await uploadBytesResumable(storageRef,file).then(() => {
                    console.log("1st await");

                    getDownloadURL(storageRef).then(async (getDownloadURL) =>{

                        try{
                            console.log("2nd await");
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: getDownloadURL,
                            });

                            console.log("3rd await");
                            const userData = {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: getDownloadURL,
                            };
                            console.log("User data:", userData);

                            await setDoc(doc(db,"users",res.user.uid),{
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: getDownloadURL,
                            })
    
                           

                            console.log("4th await");

                         
    
                        
                            console.log("User data:", userData); 

                            await setDoc(doc(db, "users", res.user.uid), userData);
                            console.log("User document created successfully");
    
                            await setDoc(doc(db, "userChats", res.user.uid), {});
                            console.log("User chat document created successfully");
    
                            setLoading(false);
                            navigate("/");
                            
                            


                        }catch(err){
                            console.log(err);
                            setErr(true);
                            setLoading(false);
                            
                        }
                    });
                });
    
            }catch(err){
                console.log(err);
                setErr(true);
                setLoading(false);

            
        }
    }




    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">MchatS</span> <br></br>
                <span className="title">Register</span>
                
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="Create Password"/>
                    
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an Avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>

                    {err && <span style={{ color: "red" }}>Ops, Something went Wrong!!</span>}

                </form>
                
                <p>You already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;