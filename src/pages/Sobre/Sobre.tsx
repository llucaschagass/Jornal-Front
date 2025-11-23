import { Header } from '../../components/Header/Header';
import styles from './Sobre.module.css';

export function Sobre() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className={styles.container}>
        <div className={styles.card}>
          
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
            alt="Indústria 4.0 e Tecnologia" 
            className={styles.image}
          />

          <div className={styles.content}>
            <span className={styles.subtitle}>Indústria 4.0 & Modernização</span>
            <h1 className={styles.title}>O Futuro da Indústria no InfraLab</h1>
            
            <p className={styles.text}>
              O <strong>InfraLab</strong> é um portal dedicado a explorar as fronteiras da 
              <strong> Revolução Industrial</strong>. Nosso foco é conectar estudantes e profissionais 
              às transformações que estão remodelando o chão de fábrica e a infraestrutura global.
            </p>

            <p className={styles.text}>
              Vivemos uma era onde a linha entre o físico e o digital deixa de existir. 
              A automação avançada, a Internet das Coisas (IoT) e a inteligência artificial não 
              são apenas tendências, são os pilares da nova economia. O projeto busca entender 
              como essas tecnologias aumentam a produtividade e criam novos modelos de negócios.
            </p>

            <div className={styles.techStack}>
              <h3 className={styles.techTitle}>Desenvolvido com Tecnologias Modernas:</h3>
              <div className={styles.badges}>
                <span className={styles.badge}>React Ecosystem</span>
                <span className={styles.badge}>NestJS API</span>
                <span className={styles.badge}>Clean Architecture</span>
                <span className={styles.badge}>Scalable Infra</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}