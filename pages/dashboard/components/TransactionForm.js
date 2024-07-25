import React, { useState } from "react";
import styles from "../../../styles/Dashboard.module.css";

const TransactionForm = ({ addTransaction }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [isIncome, setIsIncome] = useState("Receita");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, value, category, isIncome });
    setDescription("");
    setValue("");
    setCategory("");
    setIsIncome("Receita");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Descrição:</label>
        <input
          className={styles.input}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Valor:</label>
        <input
          className={styles.input}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Categoria:</label>
        <input
          className={styles.input}
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Entrada/Saída:</label>
        <select
          className={styles.select}
          type="text"
          value={isIncome}
          onChange={(e) => setIsIncome(e.target.value)}
        >
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>
      </div>
      <button className={styles.button} type="submit">
        Adicionar Transação
      </button>
    </form>
  );
};

export default TransactionForm;
