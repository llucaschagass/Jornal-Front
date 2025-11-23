import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Header } from '../../components/Header/Header';
import styles from './Materia.module.css';

interface Anexo {
  id: number;
  nomeArquivo: string;
}

interface MateriaDetalhada {
  id: number;
  titulo: string;
  texto: string;
  inseridoEm: string;
  anexos: Anexo[];
}

export function Materia() {
  const { id } = useParams();
  const [materia, setMateria] = useState<MateriaDetalhada | null>(null);
  const [imagemSrc, setImagemSrc] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get(`/materias/${id}`);
        const dadosMateria = response.data;
        setMateria(dadosMateria);

        if (dadosMateria.anexos && dadosMateria.anexos.length > 0) {
          const anexoId = dadosMateria.anexos[0].id;
          const responseImg = await api.get(`/anexos/${anexoId}`);
          
          if (responseImg.data.base64) {
            setImagemSrc(responseImg.data.base64);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className={styles.container} style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ color: '#fd6925', fontWeight: 'bold' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!materia) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className={styles.container}>
          <h1>Matéria não encontrada.</h1>
          <Link to="/" className={styles.backLink}>Voltar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className={styles.container}>
        
        <Link to="/" className={styles.backLink}>
          &larr; Voltar para o Início
        </Link>

        <article className={styles.article}>
          
          {imagemSrc ? (
             <img 
               src={imagemSrc} 
               alt={materia.titulo} 
               className={styles.heroImage}
             />
          ) : (
             <img 
               src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
               alt="Placeholder" 
               className={styles.heroImage}
             />
          )}

          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.tag}>Infraestrutura</span>
              <span className={styles.date}>
                {new Date(materia.inseridoEm).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <h1 className={styles.title}>{materia.titulo}</h1>

            <div className={styles.textBody}>
              {materia.texto}
            </div>
          </div>
        </article>

      </main>
    </div>
  );
}