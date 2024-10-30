// src/components/HistoricoInteracoes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HistoricoInteracoes = () => {
    const [interacoes, setInteracoes] = useState([]);
    const [formData, setFormData] = useState({
        data_interacao: "",
        tipo_interacao: "",
        descricao: "",
        canal_utilizado: "",
        resposta: "",
        tempo_resposta: "",
        detalhes_interacao: "",
        proximo_passo: "",
        responsavel_interacao: "",
    });
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchInteracoes();
    }, []);

    const fetchInteracoes = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/historico");
            setInteracoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar interações:", error);
        }
    };

    const createInteracao = async () => {
        try {
            await axios.post("http://localhost:3000/api/historico", formData);
            setFormData({
                data_interacao: "",
                tipo_interacao: "",
                descricao: "",
                canal_utilizado: "",
                resposta: "",
                tempo_resposta: "",
                detalhes_interacao: "",
                proximo_passo: "",
                responsavel_interacao: "",
            });
            fetchInteracoes();
        } catch (error) {
            console.error("Erro ao criar interação:", error);
        }
    };

    const updateInteracao = async () => {
        try {
            await axios.put(`http://localhost:3000/api/historico/${selectedId}`, formData);
            setSelectedId(null);
            setFormData({
                data_interacao: "",
                tipo_interacao: "",
                descricao: "",
                canal_utilizado: "",
                resposta: "",
                tempo_resposta: "",
                detalhes_interacao: "",
                proximo_passo: "",
                responsavel_interacao: "",
            });
            fetchInteracoes();
        } catch (error) {
            console.error("Erro ao atualizar interação:", error);
        }
    };

    const deleteInteracao = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/historico/${id}`);
            fetchInteracoes();
        } catch (error) {
            console.error("Erro ao deletar interação:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedId) {
            updateInteracao();
        } else {
            createInteracao();
        }
    };

    const handleEdit = (interacao) => {
        setSelectedId(interacao._id);
        setFormData({
            data_interacao: interacao.data_interacao,
            tipo_interacao: interacao.tipo_interacao,
            descricao: interacao.descricao,
            canal_utilizado: interacao.canal_utilizado,
            resposta: interacao.resposta,
            tempo_resposta: interacao.tempo_resposta,
            detalhes_interacao: interacao.detalhes_interacao,
            proximo_passo: interacao.proximo_passo,
            responsavel_interacao: interacao.responsavel_interacao,
        });
    };

    return (
        <div className="container">
            <h2 className="my-4">Histórico de Interações</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Data da Interação:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formData.data_interacao}
                        onChange={(e) => setFormData({ ...formData, data_interacao: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Interação:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.tipo_interacao}
                        onChange={(e) => setFormData({ ...formData, tipo_interacao: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {selectedId ? "Atualizar Interação" : "Adicionar Interação"}
                </button>
                <button type="button" className="btn btn-secondary my-2 ml-2" onClick={() => setFormData({
                    data_interacao: "",
                    tipo_interacao: "",
                    descricao: "",
                    canal_utilizado: "",
                    resposta: "",
                    tempo_resposta: "",
                    detalhes_interacao: "",
                    proximo_passo: "",
                    responsavel_interacao: "",
                })}>
                    Limpar
                </button>
            </form>

            <table className="table my-4">
                <thead>
                    <tr>
                        <th>Data da Interação</th>
                        <th>Tipo de Interação</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {interacoes.map((interacao) => (
                        <tr key={interacao._id}>
                            <td>{interacao.data_interacao}</td>
                            <td>{interacao.tipo_interacao}</td>
                            <td>{interacao.descricao}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(interacao)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteInteracao(interacao._id)}>
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

export default HistoricoInteracoes;
