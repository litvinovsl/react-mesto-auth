import React from "react";

function Login() {
  return (
    <section className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__form">
        <input className="register__input" placeholder="Email"></input>
        <input className="register__input" placeholder="Пароль"></input>
        <button className="register__submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;