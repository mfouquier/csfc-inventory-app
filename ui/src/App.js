import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inventory from './Components/Inventory';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </div>
 
  );
}

export default App;
