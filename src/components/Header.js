import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import headerLogo from "../images/logo-mesto.svg";
import Register from "./Register";
import Login from "./Login";

function Header({ logoutProfile, userEmail }) {

  const location = useLocation();
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
          <p className="menu__link menu__link_email">
            {location.pathname === "/" ? userEmail : ""}
          </p>
          <Link to={
            location.pathname === "/sign-up"
              ? "/sign-in"
              : location.pathname === "/sign-in"
                ? "/sign-up"
                : "/sign-in"
          }
            className="menu__link menu__link_link"
            onClick={location.pathname === "/" ? logoutProfile : () => { }}
          >
            {
              location.pathname === "/sign-up"
                ? "Войти"
                : location.pathname === "/sign-in"
                  ? "Регистрация"
                  : "Выйти"
            }
          </Link>




          {/* <Link className="menu__item" to="/sign-in">
            Login
          </Link>
          <Link className="menu__item" to="/sign-up">
            Register
          </Link> */}
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
