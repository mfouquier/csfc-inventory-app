import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inventory from './Components/Inventory';
import SearchResults from './Components/SearchResults';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/Inventory" element={<Inventory />} />
          <Route path='/SearchResults' element={<SearchResults />} />
        </Routes>
      </Router>
    
 
  );
}

export default App;
