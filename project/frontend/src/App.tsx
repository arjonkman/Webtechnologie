import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Chart from "./Components/Chart";
import Portfolio from "./Components/Portfolio";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Stocks from "./Components/Portfolio/stocks";

// Important: https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react

// Import custom css
import "./scss/App.scss";

function App() {
  return (
    <>
      <Header />
      <section className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio/stocks" element={<Stocks />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
}

export default App;
