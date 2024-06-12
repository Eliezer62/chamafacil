import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import Login from './Login';
import Home from './Home';
import Auth from './Auth';
import '../css/app.css';



ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path="/login" Component={Login} />
        <Route path="/dashboard"/>
      </Routes>
    </BrowserRouter>
</React.StrictMode>
);