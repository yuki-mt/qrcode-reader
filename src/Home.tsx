import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/bar">Both Barcode and QR Code</Link></li>
          <li><Link to="/bar2">Both Barcode and QR Code (use @zxing/library)</Link></li>
          <li><Link to="/qr">QR Code</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default App
