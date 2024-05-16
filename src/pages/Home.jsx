import React from "react";
import Slidebar from "../Components/Slidebar";
import Chatbox from "../Components/Chatbox";


const Home = () => {
    return(
        <div className="Home">
            <div className="Container">
                <Slidebar/>
                <Chatbox/>

            </div>
        </div>


    )
}

export default Home;