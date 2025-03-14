import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
