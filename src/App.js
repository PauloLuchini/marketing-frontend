import React, { useState } from "react";
import Empresas from "./components/Empresas";
import Comportamentos from "./components/Comportamento";
import DesempenhoFinanceiro from "./components/DesempenhoFinanceiro";
import HistoricoInteracoes from "./components/HistoricoInteracoes"; 
import TendenciasGastos from "./components/TendenciasGastos";
function App() {
    const [pagina, setPagina] = useState("empresas");

    const renderPage = () => {
        switch (pagina) {
            case "empresas":
                return <Empresas />;
            case "comportamentos":
                return <Comportamentos />;
            case "historico":
                return <HistoricoInteracoes />;
            case "desempenho":
              return <DesempenhoFinanceiro />;
            case "tendencia":
              return <TendenciasGastos />;
            default:
                return <Empresas />;
        }
    };

    return (
        <div className="App">
            <h1>Interface de Gestão de Empresas</h1>
            <nav>
                <button onClick={() => setPagina("empresas")}>Empresas</button>
                <button onClick={() => setPagina("comportamentos")}>Comportamentos</button>
                <button onClick={() => setPagina("historico")}>Histórico de Interações</button>
                <button onClick={() => setPagina("desempenho")}>Desempenho Financeiro</button>
                <button onClick={() => setPagina("tendencia")}>TendenciasGastos</button>
            </nav>
            {renderPage()}
        </div>
    );
}

export default App;
