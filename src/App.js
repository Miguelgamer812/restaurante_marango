// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/pages/Menu';
import Orden from './components/pages/ordenes';
import Plato from './components/pages/plato';
import Sidebar from './components/ui/Sidebar.js';

function App() {
  return (
    <div className='md:flex min-h-screen'>
      <Sidebar />
      <div className='md:w-3/5 xl:w-4/5 p-6'>
        <Routes>
          <Route path='/' element={<Menu />}></Route>
          <Route path='/orden' element={<Orden />}></Route>
          <Route path='/plato' element={<Plato />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
        </Routes>
      </div>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //      <img src="../public/Minecrabackground.png" className="App-logo" alt="logo" />
    //     {/*<p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //      <a
    //       className="App-link"
    //       href="https://google.com"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Go to Google
    //     </a> */}
    //     <h1>Bienvenido al Restaurante Marango</h1>
    //     <p>Elija nuestros subitems</p>
    //     <a className="App-link" href='https://google.com'>Ir a Menus</a>
    //   </header>
    // </div>
  );
}

export default App;
