import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Home.module.css';

interface Anexo {
  id: number;
  nomeArquivo: string;
}

interface Materia {
  id: number;
  titulo: string;
  texto: string;
  inseridoEm: string;
  anexos: Anexo[];
}

interface CardImageProps {
  anexoId: number;
  alt: string;
  className: string;
}

function CardImage({ anexoId, alt, className }: CardImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    api.get(`/anexos/${anexoId}`)
      .then(response => {
        if (response.data.base64) {
          setImageSrc(response.data.base64);
        }
      })
      .catch(console.error);
  }, [anexoId]);

  if (!imageSrc) {
    return <div className={className} style={{ backgroundColor: '#e5e7eb' }} />;
  }

  return <img src={imageSrc} alt={alt} className={className} />;
}

export function Home() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/materias')
      .then(response => setMaterias(response.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className={styles.container}>
        <h1 className={styles.headerTitle}>Destaques InfraLab</h1>

        {isLoading ? (
          <p>Carregando notícias...</p>
        ) : materias.length === 0 ? (
          <p>Nenhuma notícia encontrada.</p>
        ) : (
          <div className={styles.newsGrid}>
            {materias.map((materia) => (
              <Link to={`/materia/${materia.id}`} key={materia.id} className={styles.card}>
                
                {materia.anexos && materia.anexos.length > 0 ? (
                  <CardImage 
                    anexoId={materia.anexos[0].id} 
                    alt={materia.titulo}
                    className={styles.cardImage}
                  />
                ) : (
                  <div className={styles.cardImage} style={{ backgroundColor: '#333' }} />
                )}

                <div className={styles.cardContent}>
                  <span className={styles.category}>Infraestrutura & Inovação</span>
                  <h2 className={styles.title}>{materia.titulo}</h2>
                  <span className={styles.date}>
                    {new Date(materia.inseridoEm).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}