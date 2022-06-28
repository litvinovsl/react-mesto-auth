import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import headerLogo from "../images/logo-mesto.svg";

function Header({ logoutProfile, userEmail }) {

  const location = useLocation();

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
        </div>

      </header>
    </>
  );
}

export default Header;
