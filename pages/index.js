import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";

function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.homeBody}>
      <div className={styles.homeContainer}>
        <div className={styles.logoContainer}>
          <img
            src="/images/logo.jpeg"
            alt="Finance Control"
            className={styles.logo}
          />
        </div>
        <div className={styles.formContainer}>
          {isLogin ? (
            <LoginForm switchForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm switchForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm({ switchForm }) {
  return (
    <div className={styles.formContent}>
      <h2>Login</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className={styles.homeButton}>
          Entrar
        </button>
      </form>
      <p>
        <br></br>Não tem uma conta?{" "}
        <span onClick={switchForm} className={styles.switch}>
          Cadastre-se
        </span>
      </p>
    </div>
  );
}

function RegisterForm({ switchForm }) {
  return (
    <div className={styles.formContent}>
      <h2>Cadastro</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className={styles.homeButton}>
          Cadastrar
        </button>
      </form>
      <p>
        <br></br>Já tem uma conta?{" "}
        <span onClick={switchForm} className={styles.switch}>
          Entre
        </span>
      </p>
    </div>
  );
}

export default Home;
