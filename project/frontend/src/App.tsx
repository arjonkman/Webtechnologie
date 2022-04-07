import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Register from "./Components/Register";

// Important: https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react

// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Import custom css
import "./scss/App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <section className="content">
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/chart" element={<></>} />
          <Route path="/portfolio" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
}

export default App;
