import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Login from './Login';
import Home from './Home';
import Auth from './Auth';
import '../css/app.css';
import Dashboard from './Dashboard';
import Usuarios from './Usuarios';
import Chamado from './Chamados';
import Chamados from './Chamados';
import Departamentos from './Departamentos';


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path='/chamados' Component={Chamados}/>
        <Route path='/usuarios' Component={Usuarios}/>
        <Route path='/departamentos' Component={Departamentos}/>
      </Routes>
    </BrowserRouter>
</React.StrictMode>
);