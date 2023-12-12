
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../assets/styles/App.css'
import Home from '../pages/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}