import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import api from "../api/index";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [erro, setErro] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await api.post("/user/login", formData);
      console.log(data);
      localStorage.setItem("finance-control-jwt", data.token);
      router.push("/dashboard");
      console.log("armazenado jwt");
    } catch (error) {
      console.log("Erro na conexão com o server, erro: ", error);
      setErro(true);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className={styles.formContent}>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {erro ? <p>Login Falhou</p> : null}
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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const [erro, setErro] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/user/register", formData);
      console.log(data);
      if (data.msg === "Usuário cadastrado com sucesso!") {
        localStorage.setItem("finance-control-jwt", data.token);
        router.push("/dashboard");
        console.log("armazenado jwt");
      }
      setErro(true);
    } catch (error) {
      console.log("Erro na conexão com o server, erro: ", error);
    }
  };
  return (
    <div className={styles.formContent}>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {erro ? <p>Cadastro Realizado. Faça Login.</p> : null}
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
