import React from "react";

const Register = ({onRegister}) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    console.log(email);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("email: ", email, "pass"::::::::kk)
    onRegister(email, password);
  }

  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input className="register__input" onChange={handleEmailChange} placeholder="Email" required></input>
        <input className="register__input" onChange={handlePasswordChange} placeholder="Пароль" required></input>
        <button className="register__submit">Зарегистрироваться</button>
      </form>
      <a className="register__link">Уже зарегистрированы? Войти</a>
    </section>
  );
}

export default Register;
