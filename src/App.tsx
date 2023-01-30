import { Routes, Route } from 'react-router-dom';
import Forecast from './components/Forecast';
import City from './components/City';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Forecast />} />
        <Route path='/:city' element={<City />} />
      </Routes>
    </div>
  )
}

export default App
