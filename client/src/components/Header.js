import React from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
const Header = () => {
  return (
    <div>
      <header>
        <nav>
          
          <h1> Hp Cloud</h1>
          <div className="avtar">
            <Avatar style={{background:"blue "}}>H</Avatar>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
