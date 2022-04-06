import { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'


// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Import custom css
import './scss/App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <section className='content'>

      </section>
      <Footer />
    </>
  )
}

export default App
