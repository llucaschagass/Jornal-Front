import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { api } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './EditarMateria.module.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function EditarMateria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [linkAuxiliar, setLinkAuxiliar] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);

  useEffect(() => {
    api.get(`/materias/${id}`)
      .then(response => {
        setTitulo(response.data.titulo);
        setTexto(response.data.texto);
        setLinkAuxiliar(response.data.linkAuxiliar || '');
      })
      .catch(() => {
        MySwal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao carregar dados da matéria.'
        });
        navigate('/gestao');
      });
  }, [id, navigate]);

  const converterBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!validTypes.includes(file.type)) {
        MySwal.fire({
          icon: 'error',
          title: 'Formato Inválido',
          text: 'Por favor, selecione apenas imagens JPG ou PNG.',
          confirmButtonColor: '#d33'
        });
        e.target.value = ""; 
        setArquivo(null);
        return;
      }
      setArquivo(file);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch(`/materias/${id}`, { 
        titulo, 
        texto, 
        linkAuxiliar 
      });

      if (arquivo) {
        const base64 = await converterBase64(arquivo);
        await api.post('/anexos', {
          materiaId: Number(id),
          fileName: arquivo.name,
          base64: base64
        });
      }

      await MySwal.fire({
        icon: 'success',
        title: 'Atualizado!',
        text: 'Matéria editada com sucesso!',
        confirmButtonColor: '#2563eb',
      });
      
      navigate('/gestao');

    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível salvar as alterações.',
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
        <h1 className={styles.title}>Editar Matéria</h1>
        
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
            <label className={styles.label}>Link da Fonte</label>
            <input 
              className={styles.input} 
              type="url" 
              value={linkAuxiliar} 
              onChange={e => setLinkAuxiliar(e.target.value)} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Substituir Imagem (Opcional)
            </label>
            <input 
              className={styles.fileInput} 
              type="file" 
              accept=".jpg, .jpeg, .png" 
              onChange={handleFileChange} 
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
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>

        </form>
      </div>
    </div>
  );
}