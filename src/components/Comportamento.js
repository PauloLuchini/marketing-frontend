import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ComportamentoNegocios = () => {
    const [comportamentos, setComportamentos] = useState([]);
    const [formData, setFormData] = useState({ proposta_negocio: "", tempo_como_cliente: "", motivo_interesse: "" });
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchComportamentos();
    }, []);

    const fetchComportamentos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/comportamento");
            setComportamentos(response.data);
        } catch (error) {
            console.error("Erro ao buscar comportamentos de negócios:", error);
        }
    };

    const createComportamento = async () => {
        try {
            await axios.post("http://localhost:3000/api/comportamento", formData);
            setFormData({ proposta_negocio: "", tempo_como_cliente: "", motivo_interesse: "" });
            fetchComportamentos();
        } catch (error) {
            console.error("Erro ao criar comportamento de negócios:", error);
        }
    };

    const updateComportamento = async () => {
        try {
            await axios.put(`http://localhost:3000/api/comportamento/${selectedId}`, formData);
            setSelectedId(null);
            setFormData({ proposta_negocio: "", tempo_como_cliente: "", motivo_interesse: "" });
            fetchComportamentos();
        } catch (error) {
            console.error("Erro ao atualizar comportamento de negócios:", error);
        }
    };

    const deleteComportamento = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/comportamento/${id}`);
            fetchComportamentos();
        } catch (error) {
            console.error("Erro ao deletar comportamento de negócios:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedId) {
            updateComportamento();
        } else {
            createComportamento();
        }
    };

    const handleEdit = (comportamento) => {
        setSelectedId(comportamento._id);
        setFormData({ proposta_negocio: comportamento.proposta_negocio, tempo_como_cliente: comportamento.tempo_como_cliente, motivo_interesse: comportamento.motivo_interesse });
    };

    return (
        <div className="container">
            <h2 className="my-4">Comportamentos de Negócios</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Proposta Negocio:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.proposta_negocio}
                        onChange={(e) => setFormData({ ...formData, proposta_negocio: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Tempo Como Cliente:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.tempo_como_cliente}
                        onChange={(e) => setFormData({ ...formData, tempo_como_cliente: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Motivo Interesse:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.motivo_interesse}
                        onChange={(e) => setFormData({ ...formData, motivo_interesse: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {selectedId ? "Atualizar Comportamento" : "Adicionar Comportamento"}
                </button>
                <button type="button" className="btn btn-secondary my-2 ml-2" onClick={() => setFormData({ proposta_negocio: "", tempo_como_cliente: "", motivo_interesse: "" })}>
                    Limpar
                </button>
            </form>

            <table className="table my-4">
                <thead>
                    <tr>
                        <th>Proposta Negocio</th>
                        <th>Tempo Como Cliente</th>
                        <th>Motivo Interesse</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {comportamentos.map((comportamento) => (
                        <tr key={comportamento._id}>
                            <td>{comportamento.proposta_negocio}</td>
                            <td>{comportamento.tempo_como_cliente}</td>
                            <td>{comportamento.motivo_interesse}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(comportamento)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteComportamento(comportamento._id)}>
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

export default ComportamentoNegocios;
