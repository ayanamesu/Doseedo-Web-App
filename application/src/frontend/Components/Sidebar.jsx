import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { SidebarData } from './SidebarData';

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
      <div className='navbar'>
        <img 
          src={iconClicked ? "https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-512.png" : "https://cdn-icons-png.freepik.com/512/9293/9293128.png"} 
          className='menu-icon' 
          onClick={handleClick} 
          alt="Menu"
        />
        <form className="search-bar" action="/search" method="GET">
            <input type="text" placeholder="Search..." name="search"/>
            <button type="submit">search</button>
        </form>
      </div>
      <nav className={sidebar ? 'sidebar active':'sidebar'}>
        <ul className='sidebarList'>
          {SidebarData.map((link, index) => (
            <li key={index} className='row' id={window.location.pathname == link.to ? "active" :""} onClick={()=> {window.location.pathname = link.to}}>
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