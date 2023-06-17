import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Todos from './pages/Todos';
function App() {
  

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' Component={Home}/>
            <Route exact path='/todos' Component={Todos}/>
          </Routes>
        </Router>
      </div>
        
    </>
  )
}

export default App
