import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/footer/Footer";
import Planning from "./pages/Planning";
import Tendance from "./pages/Tendance";
import Header from "./components/header/Header";

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/planning" element={<Planning />} />
                <Route path="/tendance" element={<Tendance />} />
            </Routes>
            <Footer />
        </Router>
    );
}
