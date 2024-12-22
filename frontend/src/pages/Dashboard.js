import React from 'react';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        Dashboard Header
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          Sidebar Content
        </aside>
        <main className={styles.mainContent}>
          Main Content Area
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
