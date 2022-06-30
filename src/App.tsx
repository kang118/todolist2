import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { TodoPage } from './Pages/TodoPage';
import { IndivTask } from './Pages/IndivTask';
import TestTabs from "./Pages/TestTabs";
import BasicCard from "./Pages/CardDisplay";


  function App() {

  return (
      <div>
        <Router>
          <Routes>
            <Route path = '/' element={<TodoPage />} />
            <Route path = '/:id' element={<IndivTask />} />
            <Route path = '/tab' element={<TestTabs />} />
            <Route path = '/card' element={<BasicCard />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
