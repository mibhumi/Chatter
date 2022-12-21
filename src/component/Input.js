import React, {useState, useContext} from "react";
import attach from "../image/attach.png";
import img from "../image/img.png";
import { AuthContext } from "../component/context/AuthContext";
import { ChatContext } from "../component/context/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

const Input = () => {

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if(img) {
            const storageRef = ref(storage, uuidv4());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) => {
                    console.log("upload error", error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                      messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                      }),
                    });
                  });
                }
              );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion
                ({
                    id: uuidv4(),
                    text,
                    sendId: currentUser.uid,
                    date: Timestamp.now()
                })
            });

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                  text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                  text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
        }

        setImg(null);
        setText("");
    }

    return(
        <div className="input">
            <input type="text" placeholder="Enter your message" value={text} onChange={(e)=>setText(e.target.value)}/>
            <div className="send">
                {/* <img src={attach} alt=""/> */}
                {/* <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={img} alt="" />
                </label> */}
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input;