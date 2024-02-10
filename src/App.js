import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/login/login'; 
import SignupPage from './component/signup/Signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>   
    </Router>
  );
}

export default App;
