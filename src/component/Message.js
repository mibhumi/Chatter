import React, {useContext} from "react";
import { AuthContext } from "../component/context/AuthContext";
import { ChatContext } from "../component/context/ChatContext";

const Message = ({message}) => {

    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    return(
        <div className="message owner">
            <div className="messageInfo">
                <img src="https://images.pexels.com/photos/11586570/pexels-photo-11586570.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>{message}</p>
                <img src="https://images.pexels.com/photos/12972548/pexels-photo-12972548.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""/>
            </div>
        </div>
    )
}

export default Message;