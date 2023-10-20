import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inventory from './Components/Inventory';
import SearchResults from './Components/SearchResults';
import Directorates from './Components/Directorates';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/Inventory" element={<Inventory />} />
          <Route path='/SearchResults' element={<SearchResults />} />
          <Route path='/Directorates' element={<Directorates />} />
        </Routes>
      </Router>
    
 
  );
}

export default App;
