import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inventory from './Components/Inventory';
import SearchResults from './Components/SearchResults';
import Directorates from './Components/Directorates';
import { UserProvider } from './Components/UserContext';
import Navbar from './Components/Navbar';

function App() {
  return (
    
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path='/SearchResults' element={<SearchResults />} />
          <Route path='/Directorates' element={<Directorates />} />
        </Routes>
      </Router>
    </UserProvider>
      
    
 
  );
}

export default App;
