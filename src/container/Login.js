import React, {useState} from "react";
import addAvatar from "../image/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/")
        } catch (err) {
          setErr(true);
        }
      };

    return(
        <div className="formWrapper">
            <div className="formContainer">
                <span className="logo" >Chatter</span>
                <span className="title">Log In</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter email" required/>
                    <input type="password" placeholder="Enter password" required/>
                    <button>Sign In</button>
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                {err && <span>Something went wrong</span>}
            </div>
        </div>
    )
}

export default Login;