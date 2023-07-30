import './App.css';

import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<h1>Landing</h1>}/>
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/home/:id" element={<h1>Detail</h1>} />
        <Route path="/newdog" element={<h1>NewDog</h1>} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </div>
  );
}

export default App;
