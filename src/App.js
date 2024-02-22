import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/login/login'; 
import SignupPage from './component/signup/Signup';
import Inbox from './component/inbox/inbox';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>   
    </Router>
  );
}

export default App;
