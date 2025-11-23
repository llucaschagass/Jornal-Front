import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Sobre } from './pages/Sobre/Sobre';
import { Materia } from './pages/Materia/Materia';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/materia/:id" element={<Materia />} />
    </Routes>
  );
}

export default App;