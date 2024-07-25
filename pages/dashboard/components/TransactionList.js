import React, { useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import api from "../../../api";

const TransactionList = ({
  transactions,
  editTransaction,
  removeTransaction,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editIsIncome, setEditIsIncome] = useState("Receita"); //edit

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditDescription(transactions[index].description);
    setEditValue(transactions[index].value);
    setEditCategory(transactions[index].category);
    setEditIsIncome(transactions[index].isIncome);
  };

  const handleSave = (index) => {
    editTransaction(index, {
      description: editDescription,
      value: editValue,
      category: editCategory,
      isIncome: editIsIncome,
    });
    setEditIndex(null);
  };

  return (
    <div>
      <h2 className={styles.title}>Lista de Transações</h2>
      <ul className={styles.list}>
        {transactions.map((transaction, index) => (
          <li className={styles.listItem} key={transaction.id}>
            {editIndex === index ? (
              <div>
                <input
                  className={styles.input}
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
                <select
                  className={styles.select}
                  value={editIsIncome}
                  onChange={(e) => setEditIsIncome(e.target.value)}
                >
                  <option value="Receita">Receita</option>
                  <option value="Despesa">Despesa</option>
                </select>
                <button
                  className={styles.buttonSecondary}
                  onClick={() => handleSave(transaction.id)}
                >
                  Salvar
                </button>
                <button
                  className={styles.buttonSecondary}
                  onClick={() => setEditIndex(null)}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                <span>
                  {transaction.description} - {transaction.value} -{" "}
                  {transaction.category} -{" "}
                  {transaction.isIncome == 1 ? "Receita" : "Despesa"}
                </span>
                <div className={styles.listItemContent}>
                  <button
                    className={styles.buttonEdit}
                    onClick={() => handleEdit(index)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.buttonRemove}
                    onClick={() => removeTransaction(transaction.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
