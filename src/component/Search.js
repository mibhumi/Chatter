import React from "react";
import Input from "./Input";

const Search = () => {
    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find your contact"/>
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/11586570/pexels-photo-11586570.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" />
                <div className="userChatInfo">
                    <span>Bhumi</span>
                </div>
            </div>
        </div>
    )
}

export default Search;