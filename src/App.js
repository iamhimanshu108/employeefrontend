
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Headers from './pages/header/Header';

import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import PostUser from './pages/employees/PostUser';
import UpdateUser from './pages/employees/UpdateUser';

function App() {
  return (
   <>
   <div>
   <Headers />
   <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employee" element={<PostUser />} />
    <Route path="/employee/:id" element={<UpdateUser />} />
    <Route path="*" element={<NoMatch />} />
    
   </Routes>

   </div>
   </>
  );
}

export default App;
