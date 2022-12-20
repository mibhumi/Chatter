import React from "react";
import attach from "../image/attach.png";
import img from "../image/img.png";

const Input = () => {
    return(
        <div className="input">
            <input type="text" placeholder="Enter your message"/>
            <div className="send">
                <img src={attach} alt=""/>
                <input type="file" id="file" style={{ display: "none" }}/>
                <label htmlFor="file">
                    <img src={img} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input;