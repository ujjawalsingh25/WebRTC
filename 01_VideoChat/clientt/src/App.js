import './App.css';
import { Routes, Route } from 'react-router-dom';

import { SocketProvider } from './providers/Socket';
import HomePage from './pages/Home';

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/room/:roomId" element={<h1>Welcome</h1>} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
