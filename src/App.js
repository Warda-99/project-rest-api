import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import { Auth } from "./page/Auth";
import { Home } from "./page/Home";


const Route = () => {
  let routes = useRoutes([
    { path: "/", element: <Auth /> },
    { path: "/home", element: <Home /> },
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