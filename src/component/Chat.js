import React from "react";
import cam from "../image/cam.png";
import more from "../image/more.png";
import add from "../image/add.png";
import Messages from "./Messages";
import Input from "./Input";


const Chat = () => {
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>Bhumi</span>
                <div className="chatIcons">
                    <img src={cam} alt=""/>
                    <img src={add} alt=""/>
                    <img src={more} alt=""/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat;