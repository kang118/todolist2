import React, {FC, useState, ChangeEvent, useEffect} from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import { TodoPage } from './Pages/TodoPage';
import { AboutPage } from './Pages/AboutPage';

  function App() {

  return (
      <div>
        <Router>
          <Routes>
            <Route path = '/' element={<TodoPage />} />
            <Route path = '/about' element={<AboutPage />} />
            {/* <Route path = '/:id' element={<Show />} />
            <Route path = '/edit/:id' element={<EditPg />} /> */}
          </Routes>
        </Router>
      </div>
  );
}

export default App;
