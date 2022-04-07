import { useState } from 'react'

import Header from './Components/Header'
import Footer from './Components/Footer'
import Login from './Components/Login'


// Important: https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react

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
        <Login />
      </section>
      <Footer />
    </>
  )
}

export default App
