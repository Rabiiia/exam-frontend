import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import { getToken } from '../utils/apiFacade.js';


function Header({setErrorMsg, user, setUser}) {


    return (
            <nav className="topnav">
            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>

           
             {user.roles.includes("user") ? 
             <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search projecthours by developer id</NavLink> : null }
             

           {user.roles.includes("admin") ? 
                <NavLink to="/crud/create"><i/> create project </NavLink > : null}
           
             {user.roles.includes("admin") ? 
                  <NavLink to="/addDeveloperToProject"><i /> AddDeveloperToProject  </NavLink>  : null}
                  {user.roles.includes("admin") ? 
             <NavLink to="/listOfProjects"><i></i> List of Projects</NavLink> : null }
                
                
            
            {!getToken() ? //hvis man ikke er logget ind, så skal den i login komponent ellers ned i LoggedIn
                <Login setUser={setUser} setErrorMsg={setErrorMsg}/> :
                <LoggedIn user={user} setUser={setUser}/>
            }
            
        </nav>
       
    );
}

export default Header;
