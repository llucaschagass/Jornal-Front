import { useState, FormEvent, ChangeEvent } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './NovaMateria.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function NovaMateria() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);

  const converterBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const resMateria = await api.post('/materias', { titulo, texto });
      const novoId = resMateria.data.id;

      if (arquivo && novoId) {
        const base64 = await converterBase64(arquivo);
        await api.post('/anexos', {
          materiaId: novoId,
          fileName: arquivo.name,
          base64: base64
        });
      }

      await MySwal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Matéria criada com sucesso!',
        confirmButtonColor: '#fd6925',
      });
      
      navigate('/gestao'); 

    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao criar matéria. Tente novamente.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Adicionar Nova Matéria</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Título</label>
            <input 
              className={styles.input} 
              type="text" 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Imagem (Capa)</label>
            <input 
              className={styles.input} 
              type="file" 
              accept="image/*" 
              onChange={(e) => setArquivo(e.target.files ? e.target.files[0] : null)} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Texto</label>
            <textarea 
              className={styles.textarea} 
              value={texto} 
              onChange={e => setTexto(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Salvando...' : 'Publicar Matéria'}
          </button>

        </form>
      </div>
    </div>
  );
}