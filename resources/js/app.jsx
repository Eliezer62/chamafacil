import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

function App() {
    return (
      <div className="App">
        <p>Olá, mundo</p>
      </div>
    );
  }


  ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<App/>}/>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
  );