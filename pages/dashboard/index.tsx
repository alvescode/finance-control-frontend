import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import api from "../../api/index";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/expense/view");
        console.log(response);
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (transaction) => {
    console.log("transaction nova ", transaction);
    setTransactions([...transactions, transaction]);
    await api.post("/expense/register", transaction);
  };

  const editTransaction = async (expenseId, updatedTransaction) => {
    console.log("surto", expenseId, updatedTransaction);
    try {
      await api.put(`/expense/edit/${expenseId}`, updatedTransaction);
      const updatedTransactions = transactions.map((trans, i) =>
        trans.id === expenseId ? updatedTransaction : trans
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  const removeTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
    }
  };

  const deleteTransaction = async (expenseId) => {
    try {
      await api.delete(`/expense/${expenseId}`);
      console.log("Despesa removida com sucesso.");
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
      throw error;
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Controle de Finanças Pessoais</h1>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        editTransaction={editTransaction}
        removeTransaction={removeTransaction}
      />
    </div>
  );
};

export default Home;
