import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
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
};

export default Home;
