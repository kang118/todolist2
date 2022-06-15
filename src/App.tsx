import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { TodoPage } from './Pages/TodoPage';
import { Show } from './Pages/Show';
import { EditPg } from './Pages/EditPg';
import Test from './Pages/Test'

  function App() {

  return (
      <div>
        <Router>
          <Routes>
            <Route path = '/' element={<Test />} />
            <Route path = '/:id' element={<Show />} />
            <Route path = '/edit/:id' element={<EditPg />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
