import './App.css'
import Home from './Home';
import BarCodeScanner from './BarCodeScanner';
import BarCodeScanner2 from './BarCodeScanner2';
import QRCodeScanner from './QRCodeScanner';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bar" element={<BarCodeScanner />} />
        <Route path="/bar2" element={<BarCodeScanner2 />} />
        <Route path="/qr" element={<QRCodeScanner />} />
      </Routes>
    </div>
  )
}

export default App
