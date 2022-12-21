import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {db} from '../firebase';
import { AuthContext } from "../component/context/AuthContext";
import { ChatContext } from "../component/context/ChatContext";

const Chats = () => {

    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(()=>{

        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            };
        }

        currentUser.uid && getChats();

    },[currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return(
        <div className="chats">
            {
                chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                    <div className="userChat" key={chat[0]}>
                        <img src="https://images.pexels.com/photos/11586570/pexels-photo-11586570.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
                        <div 
                            className="userChatInfo"
                            onClick={() => handleSelect(chat[1].userInfo)}
                        >
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Chats;