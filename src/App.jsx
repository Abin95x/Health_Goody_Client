import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserRoute from './Routes/UserRoute';
import DoctorRoute from './Routes/DoctorRoute/DoctorRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
        <Route path='/doctor/*' element={<DoctorRoute/>}/>
      </Routes>
    </Router>
  );
}

export default App;
