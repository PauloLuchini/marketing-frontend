import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Empresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [formData, setFormData] = useState({ nome: "", setor: "", tamanho: "" });
    const [selectedId, setSelectedId] = useState(null);

  
    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/empresas");
            setEmpresas(response.data);
        } catch (error) {
            console.error("Erro ao buscar empresas:", error);
        }
    };


    const createEmpresa = async () => {
        try {
            await axios.post("http://localhost:3000/api/empresas", formData);
            setFormData({ nome: "", setor: "", tamanho: "" });
            fetchEmpresas();
        } catch (error) {
            console.error("Erro ao criar empresa:", error);
        }
    };


    const updateEmpresa = async () => {
        try {
            await axios.put(`http://localhost:3000/api/empresas/${selectedId}`, formData);
            setSelectedId(null);
            setFormData({ nome: "", setor: "", tamanho: "" });
            fetchEmpresas();
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
        }
    };

  
    const deleteEmpresa = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/empresas/${id}`);
            fetchEmpresas();
        } catch (error) {
            console.error("Erro ao deletar empresa:", error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedId) {
            updateEmpresa();
        } else {
            createEmpresa();
        }
    };

 
    const handleEdit = (empresa) => {
        setSelectedId(empresa._id);
        setFormData({ nome: empresa.nome, setor: empresa.setor, tamanho: empresa.tamanho });
    };

    return (
        <div className="container">
            <h2 className="my-4">Empresas</h2>
            
          
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Setor:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.setor}
                        onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Tamanho:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.tamanho}
                        onChange={(e) => setFormData({ ...formData, tamanho: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    {selectedId ? "Atualizar Empresa" : "Adicionar Empresa"}
                </button>
                <button type="button" className="btn btn-secondary my-2 ml-2" onClick={() => setFormData({ nome: "", setor: "", tamanho: "" })}>
                    Limpar
                </button>
            </form>

            <table className="table my-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Setor</th>
                        <th>Tamanho</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((empresa) => (
                        <tr key={empresa._id}>
                            <td>{empresa.nome}</td>
                            <td>{empresa.setor}</td>
                            <td>{empresa.tamanho}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(empresa)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => deleteEmpresa(empresa._id)}>
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

export default Empresas;
