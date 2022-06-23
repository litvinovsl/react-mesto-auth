import React from "react";

function Register() {
  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <input className="register__input" placeholder="Email"></input>
        <input className="register__input" placeholder="Пароль"></input>
        <button className="register__submit">Зарегистрироваться</button>
      </form>
      <a className="register__link">Уже зарегистрированы? Войти</a>
    </section>
  );
}

export default Register;
