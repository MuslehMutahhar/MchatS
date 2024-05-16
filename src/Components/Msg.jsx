import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";


const Msg = ({message}) => {

    console.log(message)

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const ref = useRef()

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[message])


    return(
        <div ref={ref}

            className={`message ${message.senderId === currentUser.uid} && "owner"`}
            style={{
                display: "flex",
                gap: "20px",
                flexDirection: message.senderId === currentUser.uid ? "row-reverse" : "row"
            }}
            
        >
            <div className="msginfo"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: 300,
                    color: "gray"
                }}
            >
             
                <img className="profile-img"
                    style={{
                        height: "45px",
                        width: "45px",
                        borderRadius: "50%",
                        objectFit: "cover"
                    }} 
                    src= {message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                alt=""/> 

                <span>just now</span>

            </div>
            <div className="msgcontent"
                style={{
                    maxWidth: "80%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: message.senderId === currentUser.uid ? "flex-end" : "flex-start"
                }}
            >
                <p
                    style={{
                        color: "rgb(17, 17, 17)",
                        padding: "10px 20px",
                        borderRadius: message.senderId === currentUser.uid ? "10px 0px 10px 10px" : "0px 10px 10px 10px",
                        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                        backgroundColor: message.senderId === currentUser.uid ? "#a7bcff" : "#a0aedc"
                    }}
                >
                    {message.text}</p>


                {message.img && <img
                style={{
                    height: "250px",
                    width: "300px",
                    borderRadius: "3px",
                    
                }} 
                src={message.img} 
                className="msg-img"
                alt=""/>} 

            </div>
        </div>


    )
}

export default Msg;