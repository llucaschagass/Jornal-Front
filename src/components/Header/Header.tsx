import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <Link to="/" className={styles.logoArea}>
          <div className={styles.iconBox}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          
          <div className={styles.logoText}>
            <span className={styles.brandName}>
              Infra<span className={styles.highlight}>Lab</span>
            </span>
          </div>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Início
          </Link>
          <Link to="/sobre" className={styles.link}>
            O Projeto
          </Link>
          <Link to="/admin" className={styles.adminBtn}>
            Área do Grupo
          </Link>
        </nav>

      </div>
    </header>
  );
}