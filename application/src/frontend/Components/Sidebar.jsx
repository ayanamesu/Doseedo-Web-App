import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
 
function Sidebar() {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [isHomepage, setHomepage] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [iconClicked, setIconClicked] = useState(false);
 
React.useEffect(() => {
  /*
  axios.get('http://localhost:8000/api/settings')
  .then((res) => res.json())
  .then((apiRes) => {
    console.log(apiRes);
    
    setProducts(apiRes.data);
  })
  .catch((error) => {
    console.error(error);
  });
    axios.get('http://localhost:8000/api/session')
  .then((res) => res.json())
  .then((apiRes) => {
    console.log(apiRes);
    
    setProducts(apiRes.data);
  })
  .catch((error) => {
    console.error(error);
  });
*/
const isHomepage = () => {
  return window.location.pathname === "/";
};
setHomepage(isHomepage());
}, []);
  //fetchData
  const handleClick = () => {
    showSidebar();
    setIconClicked(!iconClicked);
  };
 
  const renderSidebar = () => {
    if (!isLoggedIn || isHomepage) {
      return (
        <div className="navbar">
          <img
            src={
              iconClicked
                ? "https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-512.png"
                : "https://cdn-icons-png.freepik.com/512/9293/9293128.png"
            }
            className="menu-icon"
            onClick={handleClick}
            alt="Menu"
          />
          <form className="search-bar" action="/dbtest" method="GET">
            <input type="text" placeholder="Search..." name="search" />
            <button type="submit">search</button>
          </form>
        </div>
      );
    } else {
      return null; // Return null if the condition is not met
    }
  };
  return (
    <div>
      {renderSidebar}
      <nav className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebarList">
          {SidebarData.map((link, index) => (
            <li
              key={index}
              className="row"
              id={window.location.pathname == link.to ? "active" : ""}
              onClick={() => {
                window.location.pathname = link.to;
              }}
            >
              <img id="icon" src={link.icon}></img>
              <div id="title">{link.text}</div>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}

export default Sidebar;