import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router";
import reportWebVitals from './reportWebVitals';
import Semester from './pages/Semester';
import Subject from './pages/Subject';
import StudyPulseLoader from './components/SudyPulseLoader';
import MainPage from './pages/MainPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<Routes>
  <Route path="/" element={<Semester/>} />
  <Route path='/sub' element={<Subject/>}/>
  <Route path='/main' element={<App/>}/>
</Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
