import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Clientes from "./Pages/Clientes";
import Produtos from "./Pages/Produtos";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/produtos" element={<Produtos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;