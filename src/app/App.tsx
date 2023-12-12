
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../assets/styles/App.css'
import Home from '../pages/Home/Home';
import Profile from '../pages/profile/profile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  )
}