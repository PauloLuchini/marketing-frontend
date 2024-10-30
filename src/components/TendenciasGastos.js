import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TendenciasGastos = () => {
    const [tendencias, setTendencias] = useState([]);
    const [formData, setFormData] = useState({ categoria_gasto: "", valor_gasto: "", periodo: "" });
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchTendencias();
    }, []);

    const fetchTendencias = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/tendencias");
            setTendencias(response.data);
        } catch (error) {
            console.error("Erro ao buscar tendências:", error);
        }
    };

    const createTendencia = async () => {
        try {
            await axios.post("http://localhost:3000/api/tendencias", formData);
            setFormData({ categoria_gasto: "", valor_gasto: "", periodo: "" });
            fetchTendencias();
        } catch (error) {
            console.error("Erro ao criar tendência:", error);
        }
    };

    const updateTendencia = async () => {
        try {
            await axios.put(`http://localhost:3000/api/tendencias/${selectedId}`, formData);
            setSelectedId(null);
            setFormData({ categoria_gasto: "", valor_gasto: "", periodo: "" });
            fetchTendencias();
        } catch (error) {
            console.error("Erro ao atualizar tendência:", error);
        }
    };

    const deleteTendencia = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/tendencias/${id}`);
            fetchTendencias();
        } catch (error) {
            console.error("Erro ao deletar tendência:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedId) {
            updateTendencia();
        } else {
            createTendencia();
        }
    };

    const handleEdit = (tendencia) => {
        setSelectedId(tendencia._id);
        setFormData({ categoria_gasto: tendencia.categoria_gasto, valor_gasto: tendencia.valor_gasto, periodo: tendencia.periodo });
    };

    return (
        <div className="container">
            <h2 className="my-4">Tendências de Gastos</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Categoria de Gasto:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.categoria_gasto}
                        onChange={(e) => setFormData({ ...formData, categoria_gasto: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Valor Gasto:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={formData.valor_gasto}
                        onChange={(e) => setFormData({ ...formData, valor_gasto: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Período:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.periodo}
                        onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {selectedId ? "Atualizar Tendência" : "Adicionar Tendência"}
                </button>
                <button type="button" className="btn btn-secondary my-2 ml-2" onClick={() => setFormData({ categoria_gasto: "", valor_gasto: "", periodo: "" })}>
                    Limpar
                </button>
            </form>

            <table className="table my-4">
                <thead>
                    <tr>
                        <th>Categoria de Gasto</th>
                        <th>Valor Gasto</th>
                        <th>Período</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tendencias.map((tendencia) => (
                        <tr key={tendencia._id}>
                            <td>{tendencia.categoria_gasto}</td>
                            <td>{tendencia.valor_gasto}</td>
                            <td>{tendencia.periodo}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(tendencia)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteTendencia(tendencia._id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TendenciasGastos;
