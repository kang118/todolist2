import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { TodoPage } from './Pages/TodoPage';
import { Show } from './Pages/Show';


  function App() {

  return (
      <div>
        <Router>
          <Routes>
            <Route path = '/' element={<TodoPage />} />
            <Route path = '/:id' element={<Show />} />

          </Routes>
        </Router>
      </div>
  );
}

export default App;
