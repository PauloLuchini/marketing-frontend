import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DesempenhoFinanceiro = () => {
    const [desempenho, setDesempenho] = useState([]);
    const [formData, setFormData] = useState({ empresa_id: "", ano: "", receita_anual: "" });
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchDesempenho();
    }, []);

    const fetchDesempenho = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/desempenho");
            setDesempenho(response.data);
        } catch (error) {
            console.error("Erro ao buscar desempenho financeiro:", error);
        }
    };

    const createDesempenho = async () => {
        try {
            await axios.post("http://localhost:3000/api/desempenho", formData);
            setFormData({ empresa_id: "", ano: "", receita_anual: "" });
            fetchDesempenho();
        } catch (error) {
            console.error("Erro ao criar desempenho financeiro:", error);
        }
    };

    const updateDesempenho = async () => {
        try {
            await axios.put(`http://localhost:3000/api/desempenho/${selectedId}`, formData);
            setSelectedId(null);
            setFormData({ empresa_id: "", ano: "", receita_anual: "" });
            fetchDesempenho();
        } catch (error) {
            console.error("Erro ao atualizar desempenho financeiro:", error);
        }
    };

    const deleteDesempenho = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/desempenho/${id}`);
            fetchDesempenho();
        } catch (error) {
            console.error("Erro ao deletar desempenho financeiro:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedId) {
            updateDesempenho();
        } else {
            createDesempenho();
        }
    };

    const handleEdit = (item) => {
        setSelectedId(item._id);
        setFormData({ empresa_id: item.empresa_id, ano: item.ano, receita_anual: item.receita_anual });
    };

    return (
        <div className="container">
            <h2 className="my-4">Desempenho Financeiro</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Empresa ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.empresa_id}
                        onChange={(e) => setFormData({ ...formData, empresa_id: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Ano:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={formData.ano}
                        onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Receita Anual:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={formData.receita_anual}
                        onChange={(e) => setFormData({ ...formData, receita_anual: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {selectedId ? "Atualizar Desempenho" : "Adicionar Desempenho"}
                </button>
                <button type="button" className="btn btn-secondary my-2 ml-2" onClick={() => setFormData({ empresa_id: "", ano: "", receita_anual: "" })}>
                    Limpar
                </button>
            </form>

            <table className="table my-4">
                <thead>
                    <tr>
                        <th>Empresa ID</th>
                        <th>Ano</th>
                        <th>Receita Anual</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {desempenho.map((item) => (
                        <tr key={item._id}>
                            <td>{item.empresa_id}</td>
                            <td>{item.ano}</td>
                            <td>{item.receita_anual}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteDesempenho(item._id)}>
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

export default DesempenhoFinanceiro;
