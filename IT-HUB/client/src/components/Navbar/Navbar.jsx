import "./Navbarstyles.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkLogin } from "../../Utils/loginChecker";


const Navbar = () => {

  const [isLogin, setLogin] = useState(false);

  // To create dark and bright theme and store it in local storage according to preference of user
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark-theme"
  );
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  const Checker = async () => {
    const value = await checkLogin()
    setLogin(value);
    console.log(value);
  }

  useEffect(() => {
    Checker();

  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);



  return (
    <div>
      <div className="menu-icon">
        <a href="/" className="logo">
          <img
            className="logo-image"
            src="../../src/assets/Images/Itlogo2.png"
            alt="image"
          />
        </a>
        <ul className="navbar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/qa">Q/A</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>

            <i onClick={toggleTheme} className={theme === "dark-theme" ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off"}></i>

          </li>
          {
            isLogin ? (<NavLink to="/profile">
              <i style={{ marginTop: "0.6rem" }}
                className="fa-solid fa-user"></i>
            </NavLink>) : (<NavLink to="/login">
              <button style={{ border: "2px solid var(--hover-color)" }}>Log in</button>
            </NavLink>)
          }

          {/* <NavLink to="/login">
            <button>Log in</button>
          </NavLink> */}
          {/* <NavLink to="/profile">
            <i style={{ display: "none" }} class="fa-regular fa-user"></i>
          </NavLink> */}
          {/* To create a hamburger menu using icons pack */}
          {/* <i className="fa fa-bars menu-toggle"></i> */}
        </ul>

      </div>
    </div>
  );
};

export default Navbar;








// import './Navbarstyles.css'
// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { useState, useEffect } from 'react'

// const Navbar = () => {

//   // To create dark and bright theme
//   const [theme, setTheme] = useState("dark-theme");
//   const toggleTheme = () => {
//     if (theme === "dark-theme") {
//       setTheme("light-theme");
//     }
//     else {
//       setTheme("dark-theme");
//     }
//   };
//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);


//   return (
//     <div>
//       <div className="menu-icon">
//         <a href="/" className='logo'><img className="logo-image" src="../../src/assets/Images/Itlogo2.png" alt="image" /></a>
//         <ul className="navbar">
//           <li>
//             <NavLink to="/">Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/courses">Courses</NavLink>
//           </li>
//           <li>
//             <NavLink to="/news">News</NavLink>
//           </li>
//           <li>
//             <NavLink to="/qa">Q/A</NavLink>
//           </li>
//           <li>
//             <NavLink to="/gallery">Gallery</NavLink>
//           </li>
//           <li>
//             <NavLink to="/about">About</NavLink>
//           </li>
//           <li>
//             <img id="theme-icon" onClick={toggleTheme} src={theme === "dark-theme" ? "../../src/assets/images/sun.png" : "../../src/assets/images/moon.png"} alt="dark" />
//             {/* <i onClick={toggleTheme} className={theme === "dark-theme" ? "fa-regular fa-brightness-low" : "fa-regular fa-moon"}></i> */}
//             {/* <img id="profileImg" src="../../src/assets/images/user.png " alt="profile" srcset="" /> */}
//           </li>
//           <NavLink to="/login"><button>Log in</button></NavLink>
//           {/* To create a hamburger menu using icons pack */}
//           <i className="fa fa-bars menu-toggle"></i>
//         </ul>
//         {/* <div id="mobile">
//           <i className="fas fa-times"></i>
//         </div> */}
//       </div>
//     </div>
//   )
// }

// export default Navbar
