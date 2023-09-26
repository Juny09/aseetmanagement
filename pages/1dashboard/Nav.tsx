import React from 'react';
import { useState } from 'react'


const Nav = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    
    const openNav = () => {
      const mySidenav = document.getElementById('mySidenav');
      const main = document.getElementById('main');
      const body = document.body;
      setIsNavOpen(true);
    
      if (mySidenav && main) {
        mySidenav.style.width = '250px';
        main.style.marginLeft = '250px';
        body.style.backgroundColor = 'black';
      }
    
      // Ensure the button remains visible
      const myButton = document.getElementById('myButton'); // Replace with the actual button ID
      if (myButton) {
        myButton.style.visibility = 'visible';
      }
    };
    
    const closeNav = () => {
      const mySidenav = document.getElementById('mySidenav');
      const main = document.getElementById('main');
      const body = document.body;
      setIsNavOpen(false);
    
      if (mySidenav && main && body) {
        mySidenav.style.width = '0';
        main.style.marginLeft = '0';
        body.style.backgroundColor = 'black';
      }
    
      // Ensure the button remains visible
      const myButton = document.getElementById('myButton'); // Replace with the actual button ID
      if (myButton) {
        myButton.style.visibility = 'visible';
      }
    };

return (
    <div>
        <div className="homebg">
            <div id="mySidenav" className={`sidenav ${isNavOpen ? "open" : ""}`}>
            <a href="#" className="closebtn" onClick={closeNav}>
            &times;
            </a>
            <div className="homebg"></div>
        <div id="mySidenav" className={`sidenav ${isNavOpen ? "open" : ""}`}>
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="./1dashboard" className="">
          Dashboard
        </a>
        <a href="./assetpopup" className="text-white">
          Asset
        </a>
        <a href="./partlist" className="text-white">
          Space
        </a>
        <a href="./cobipopup" className="text-white">
          Cobinerual
        </a>
        <a href="./brandpopup" className="text-white">
          Brand
        </a>
        <a href="./partpopup" className="text-white">
          Part
        </a>
      </div>
        </div>
      </div>
      <span
        className="sibebar text-black"
        style={{ fontSize: "30px", cursor: "pointer", visibility: isNavOpen ? 'hidden' : 'visible' }}
        onClick={openNav}
      >
        &#9776;
      </span>
      </div>
    )
}

export default Nav;
