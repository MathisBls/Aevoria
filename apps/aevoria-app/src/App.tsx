import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App;
