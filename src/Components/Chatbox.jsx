import React, { useContext } from "react";
import frnd from "../imgs/friends.png";
import more from "../imgs/dots.png";
import Msgs from "./Msgs";
import Input from "./Input";
import { ChatContext } from "../context/chatContext";



const Chatbox = () => {
    const {data} =useContext(ChatContext)
    return(
        <div className="Chatbox">
            <div className="chatinfo">
                <span>{data.user?.displayName}</span>
                <div className="chaticons">
                    <img src={frnd} alt=""/>
                    <img src={more} alt=""/>

                </div>
                
            </div>
            <Msgs/>
            <Input/>
           
        </div>


    )
}

export default Chatbox;