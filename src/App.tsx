import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { TodoPage } from './Pages/TodoPage';
import { IndivTask } from './Pages/IndivTask';


  function App() {

  return (
      <div>
        <Router>
          <Routes>
            <Route path = '/' element={<TodoPage />} />
            <Route path = '/:id' element={<IndivTask />} />

          </Routes>
        </Router>
      </div>
  );
}

export default App;
