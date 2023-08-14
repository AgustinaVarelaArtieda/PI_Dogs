import './App.css';

import { Route, Routes } from 'react-router-dom';

import LandingPage from './views/landing/landing';
import ErrorPage from './views/error/error';
import DetailPage from './views/detail/detail';
import AboutPage from './views/about/about';
import FormPage from './components/form/newDog';
import HomePage from './components/home/home';

import axios from 'axios';
axios.defaults.baseURL='http://localhost:3001'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/detail/:id" element={<DetailPage/>} />
        <Route path="/newdog" element={<FormPage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}

export default App;
