import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Sobre } from './pages/Sobre/Sobre';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;