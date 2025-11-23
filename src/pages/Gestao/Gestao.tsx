import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './Gestao.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Materia {
    id: number;
    titulo: string;
    inseridoEm: string;
}

export function Gestao() {
    const [materias, setMaterias] = useState<Materia[]>([]);

    useEffect(() => {
        carregarMaterias();
    }, []);

    async function carregarMaterias() {
        try {
            const response = await api.get('/materias');
            setMaterias(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(id: number) {
        const result = await MySwal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/materias/${id}`);

                await MySwal.fire({
                    title: 'Deletado!',
                    text: 'A matéria foi excluída com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#fd6925'
                });

                carregarMaterias();
            } catch (error) {
                MySwal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao tentar excluir.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>Painel de Gestão</h1>
                    <Link to="/nova-materia" className={styles.addButton}>
                        + Nova Matéria
                    </Link>
                </div>

                <div className={styles.grid}>
                    {materias.map(materia => (
                        <div key={materia.id} className={styles.card}>
                            <div>
                                <h3 className={styles.cardTitle}>{materia.titulo}</h3>
                                <span className={styles.cardDate}>
                                    Publicado em: {new Date(materia.inseridoEm).toLocaleDateString()}
                                </span>
                            </div>

                            <div className={styles.actions}>
                                <Link to={`/materia/${materia.id}`} className={styles.btnEdit} style={{ marginRight: '5px' }}>
                                    Ver
                                </Link>

                                <Link
                                    to={`/editar-materia/${materia.id}`}
                                    className={styles.btnUpdate}
                                    style={{ marginRight: '5px' }}
                                >
                                    Editar
                                </Link>

                                <button onClick={() => handleDelete(materia.id)} className={styles.btnDelete}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}