import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchProjectHours from "./components/CRUD/SearchProjectHoursByDeveloperId";

import Contact from "./pages/Contact.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CreateProject from "./components/CRUD/CreateProject";

import AddDeveloperToProject from "./components/CRUD/AddDeveloperToProject";
import ListOfProjects from "./components/CRUD/ListOfProjects";
import Header from "./components/Header.jsx";
import { useEffect } from "react";
import {
  getToken,
  verifyToken,
  decodeToken,
  removeToken,
  setToken,
} from "./utils/apiFacade";

export const initialState = {
  username: null,
  roles: [],
  isLoggedIn: false,
};

export function updateUser(token, setUser) {
  const payload = decodeToken(token); //console.log(payload);
  setUser({
    username: payload["sub"],
    roles: payload["roles"],
    isLoggedIn: true,
  });
}

function App(props) {
  const [user, setUser] = useState(initialState);

  //denne function reruns everytime page is refreshed
  // bemærk denne function er async, fordi verifyToken function return a promise.
  // and async await unpacks that promise
  async function checkToken(token) {
    console.log("Checking token");
    if ((token = await verifyToken(token))) {
      setToken(token);
      updateUser(token, setUser);
    } else {
      console.log("Session expired");
      alert("Your session has expired. Please log in again.");
      removeToken();
    }
  }

  useEffect(() => {
    if (getToken()) {
      (async () => {
        await checkToken(getToken());
      })(); //< async anonymous function is being called right away ()
      setTimeout(async () => {
        await checkToken(getToken());
      }, 1000 * 60 * 30);
    }
  }, []);

  const obj = {
    name: "TestName",
    street: "TestStreet",
    town: "TestTown",
    country: "TestCountry",
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        {!getToken() ? (
          <>
            {/* Add only Routes where you dont have to be logged ind to access */}
            <Route path="/" element={<LandingPage user={user} />} />

            {/* But when you are going to deploy it then your path={DROPLET_FOLDER}, hopefully it works correctly */}
          </>
        ) : (
          <>
            {/* You have to be logged in as user or admin to see added routes down below  */}

            <Route path="/" element={<Home user={user} />} />

            {user.roles.includes("user") && (
              <>
                <Route path="/search" element={<SearchProjectHours />} />
               
              </>
            )}

            {/* You have to be logged in as  admin to see added routes down below  */}
            {user.roles.includes("admin") && (
              <>
                <Route path="/crud/create" element={<CreateProject />} />
                
                <Route
                  path="/addDeveloperToProject"
                  element={<AddDeveloperToProject />}
                />
                <Route path="/listOfProjects" element={<ListOfProjects />} />
                {/* <Route path="/crud/edit/:id" element={<Edit />} /> */}
                {/* Add routes only admin can access */}
              </>
            )}
          </>
        )}

        {/* Does not matter if logged ind. You can always see these paths down below*/}

        {/* But when you are going to deploy it then your path={DROPLET_FOLDER + /search} path above, hopefully it works correctly */}
        <Route path="/contact" element={<Contact address={obj} />} />
        {/* <Route path="/jokes" element={<Jokes />} /> */}

        <Route path="*" element={<h1>Page Not Found !!!!</h1>} />
      </Routes>
    </>
  );
}

export default App;
