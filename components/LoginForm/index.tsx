import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";
import styles from "../../styles/Home.module.css";

const LoginForm = ({ switchForm }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [erro, setErro] = useState<boolean>(false);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await api.post("/user/login", formData);
      localStorage.setItem("finance-control-jwt", data.token);
      router.push("/dashboard");
      console.log("JWT Armazenado.");
    } catch (error) {
      console.log("Erro na conexão com o server. Erro: ", error);
      setErro(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        {erro ? (
          <p style={{ color: "red", marginBottom: "10px" }}>
            Email ou Senha Inválidos.
          </p>
        ) : null}
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
};
export default LoginForm;
