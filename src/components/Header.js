import React from "react";
import { Route, Link, useRouteMatch } from "react-router-dom";
import headerLogo from "../images/logo-mesto.svg";
import Register from "./Register";
import Login from "./Login";

function Header() {

  // const { path, url } = useRouteMatch();
  // console.log('path ', path);
  // console.log('url ', url);


  return (
    <>
    <header className="header">
      <Link className="menu__item" to="/">
        <img className="header__logo" src={headerLogo} alt="лого" />
      </Link>

      <div className="menu">
        <Link className="menu__item" to="/sign-in">
          Login
        </Link>
        <Link className="menu__item" to="/sign-up">
          Register
        </Link>
      </div>
      
    </header>
    {/* <Route exact path="/sign-up">
      <Register />
    </Route>
    <Route exact path="/sign-in">
      <Login />
    </Route> */}
    </>
  );
}

export default Header;
