import { useRouter } from "next/router";
import { useState } from "react";
import api from "../../api";
import styles from "../../styles/Home.module.css";

export default function RegisterForm({ switchForm }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [erroCadastro, setErroCadastro] = useState<string | null>(null);
  const router = useRouter();

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
      localStorage.setItem("finance-control-jwt", data.token);
      router.push("/dashboard");
    } catch (error) {
      if (error.response.data.message === "Email já está em uso") {
        setErroCadastro(error.response.data.message);
      }
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
        {erroCadastro ? (
          <p style={{ color: "red", marginBottom: "10px" }}>{erroCadastro}</p>
        ) : null}
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
