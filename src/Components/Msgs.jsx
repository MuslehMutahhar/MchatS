import React, { useContext, useEffect, useState } from "react";
import Msg from "./Msg";
import { ChatContext } from "../context/chatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


const Msgs = () => {

    const [messages,setMessages] = useState([]);
    const {data} = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        });

        return () => {
            unSub()
        };
    },[data.chatId]);

    console.log(messages)


    return(
        <div className="Msgs">
            {messages.map((m)=>(
                <Msg message={m} key={m.id}/>
            ))}
          
            
            
        </div>


    );
};

export default Msgs;