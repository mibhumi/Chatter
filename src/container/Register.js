/* eslint-disable default-case */
import React, {useState} from "react";
import addAvatar from "../image/addAvatar.png";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth, storage, db} from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import {useNavigate, Link} from 'react-router-dom';

const Register = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].value;

        debugger
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register details
            uploadTask.on(
            (error) => {
                setErr(error);
            }, 
            async () => {
                   //  //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    // photoURL: downloadURL,
                });
                    await updateProfile(res.user, {
                    displayName,
                    // photoURL: downloadURL
                })
                                navigate("/");
            // Upload completed successfully, now we can get the download URL
            // getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            //     console.log('File available at', downloadURL);
                // await updateProfile(res.user, {
                //     displayName,
                //     photoURL: downloadURL
                // })

                //  //create user on firestore
                // await setDoc(doc(db, "users", res.user.uid), {
                //     uid: res.user.uid,
                //     displayName,
                //     email,
                //     photoURL: downloadURL,
                // });
    
                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                // navigate("/");
                // });
                }
            );     
        } catch(err) {
            setErr(true);
        }

    }

    return(
        <div className="formWrapper">
            <div className="formContainer">
                <span className="logo" >Chatter</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter your name" required/>
                    <input type="email" placeholder="Enter email" required/>
                    <input type="password" placeholder="Enter password" required/>
                    <input style={{display: "none"}} type="file" id="dp" required/>
                    <label htmlFor="dp">
                        <img src={addAvatar} />
                        <span>Add Profile Photo</span>
                    </label>
                    <button>Sign Up</button>
                    { err ? <span>{err}</span> : null}
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;