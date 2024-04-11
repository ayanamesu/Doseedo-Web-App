import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [iconClicked, setIconClicked] = useState(false);

  const handleClick = () => {
    showSidebar();
    setIconClicked(!iconClicked);
  };
  return (
    <div>
      <div className="navbar">
        {
          iconClicked
            ? <FontAwesomeIcon icon={faTimes} className="menu-icon" onClick={handleClick} />
            : <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={handleClick} />
        }

        {
          // comment  change the name of the action to /search 
        }
        <form className="search-bar" action="/dbtest" method="GET">
          <input type="text" placeholder="Search..." name="search" />
          <button type="submit">search</button>
        </form>
      </div>
      <nav className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebarList">
        {SidebarData.map((item, index) => (
          <li key={index} className="row">
            <Link to={item.to}>
              <FontAwesomeIcon icon={item.icon} id="icon"/>
              <span id="title">{item.text}</span>
            </Link>
          </li>
        ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;