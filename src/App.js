import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import { Auth } from "./page/Auth";
import { Home } from "./page/Home";
import { Edit } from "./page/Edit";
import { Account } from "./page/Account";
import { Show } from "./page/Show";
import { LogOut } from "./page/LogOut";


const Route = () => {
  let routes = useRoutes([
    { path: "/", element: <Auth /> },
    { path: "/home", element: <Home /> },
    { path: "/logout", element: <LogOut /> },
    { path: "/edit/:id", element: <Edit /> },
    { path: "/projectData", element: <projectData /> },
    { path: "/account", element: <Account /> },
    { path: "/show/:id", element: <Show /> },
    
  ]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <Route />
    </Router>
  );
};

export default App;