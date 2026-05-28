import React from "react";
import styles from "../scss/BackgroundOrbs.module.scss";

const BackgroundOrbs = () => {
  return (
    <div className={styles.orbsContainer} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
};

export default BackgroundOrbs;
