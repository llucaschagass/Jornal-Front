import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Sobre } from './pages/Sobre/Sobre';
import { Materia } from './pages/Materia/Materia';
import { Gestao } from './pages/Gestao/Gestao';
import { NovaMateria } from './pages/NovaMateria/NovaMateria';
import { EditarMateria } from './pages/EditarMateria/EditarMateria';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/materia/:id" element={<Materia />} />
      <Route path="/gestao" element={<Gestao />} />
      <Route path="/nova-materia" element={<NovaMateria />} />
      <Route path="/editar-materia/:id" element={<EditarMateria />} />
    </Routes>
  );
}

export default App;