import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import { Auth } from "./page/Auth";
import { LogOut } from "./page/LogOut";
import { Home } from "./page/Home";
import { Edit } from "./page/Edit";
import { Account } from "./page/Account";
import { Show } from "./page/Show";
import { Chat } from "./page/Chat";
import { MyProjects } from "./page/MyProjects";
import { CreateProject } from "./page/CreatProject";
import RegistrationRequired from './page/RegistrationRequired';

//creatProject
const Route = () => {
  let routes = useRoutes([
    { path: "/", element: <Auth /> },
    { path: "/logout", element: <LogOut /> },
    { path: "/home", element: <Home /> },
    { path: "/myProjects", element: <MyProjects /> },
    { path: "/logout", element: <LogOut /> },
    { path: "/edit/:id", element: <Edit /> },
    { path: "/creatProject", element: <CreateProject /> },
    { path: "/projectData", element: <projectData /> },
    { path: "/account", element: <Account /> },
    { path: "/show/:id", element: <Show /> },
    { path: "/chat", element: <Chat /> },
    { path: "/registrationrequired", element: <RegistrationRequired /> },    
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