import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/login/login'; 
import Inbox from './component/inbox/inbox';
// import Buttons from './component/inbox/button';
import SignupPage from './component/signup/signup';
import { AllActiveUsersForAssigned } from './component/inbox/inboxapi';
import Navigation from './component/native/navigation';

import Settings from './component/settings/settings';
import Reports from './component/reports/reports';
import Master from './component/masters/master';
import Assigned from './component/assignedToMe/assigned';
import Dashboard from './component/dashbard/dashboard';
import Ticket from './component/ticket/ticket';
// import Ticket from './component/ticket/ticket';
function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inbox" element={<Inbox />} />
        {/* <Route path="/button" element={<Buttons />} />  */}
        <Route path="/inboxapi" element={AllActiveUsersForAssigned } />  
        <Route path="/navigate" element={Navigation} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/assigned" element={<Assigned/>} />
        <Route path="/masters" element={<Master/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/settings" element={<Settings/>} />      
             
      </Routes>   
    </Router>
  );
}

export default App;
