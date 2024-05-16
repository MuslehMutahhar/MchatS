import React, { useContext, useState } from "react";
import { collection, doc, setDoc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from "../context/AuthContext";
import { Await } from "react-router-dom";



const Search = () => {
    const [username,setUsername] = useState("")
    const [user,setUser] = useState(null)
    const [err,setErr] = useState(false)

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async () => {
        const q  = query(
            collection(db,"users"),
            where("displayName","==" , username)
        );

        try{

            const querySnapshot = await getDocs(q);
            console.log("Number of documents:", querySnapshot.size); // Log the number of documents in the query result
            querySnapshot.forEach((doc) => {
                console.log("Document data:", doc.data()); // Log the data of each document
                setUser(doc.data());
            });

            
            console.log(user);
        }catch(err){
            setErr(true);

        }


    }

    const handleKey = (e) =>{
        if(e.code === "Enter"){
            console.log("Enter key pressed");
            handleSearch();
        }
        
    };

    const handleSelect = async () => {
        
        // check if the chats exists , if not create
        const combinedId = 
        currentUser.uid > user.uid 
        ? currentUser.uid + user.uid  
        : user.uid + currentUser.uid;

        console.log("After setDoc: combinedId =", combinedId);

        try{
            

            const res = await getDoc(doc(db,"chats", combinedId));
            
            if(!res.exists()){
                //create a chat in chat collections
                console.log("Eabm");
                
                await setDoc(doc(db,"chats",combinedId),{ messages: []});

                console.log("E1");

                //create userchat
                await updateDoc(doc(db,"userChats",currentUser.uid),{
                    [combinedId+".userInfo"]:{
                        uid:user.uid,
                        displayName: user.displayName,
                        photoURL : user.photoURL,
                    },
                    [combinedId+".data"]:serverTimestamp()

                });
                console.log("E2");
                await updateDoc(doc(db,"userChats",user.uid),{
                    [combinedId+".userInfo"]:{
                        uid:currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL : currentUser.photoURL,
                    },
                    [combinedId+".data"]:serverTimestamp()

                });
                console.log("E3");


            }
        }catch(err){}

        setUser(null);
        

    

        
    }

    return(
       <div className="Search">
        
        <div className="searchform">
            <input type ="text" placeholder="Find a user" 
            onKeyDown={handleKey} 
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            />
            
        </div>
        {err && <span>user not found!</span>}
        {user && (
        <div className="userchat" onClick={handleSelect}>
            <img src={user.photoURL} alt=""/>
                <div className="userinfo">
                    <span>{user.displayName}</span>
                </div>
            </div>)}
       </div>


    )
}

export default Search;

