import { useEffect, useState } from "react";
import api from "../services/api";
import "./Produtos.css";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        listarProdutos();
    }, []);

    async function listarProdutos() {
        const token = localStorage.getItem("token");
        const response = await api.get("/produto", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProdutos(response.data);
    }

    async function salvarProduto() {
        const token = localStorage.getItem("token");
        const payload = { nome, descricao, preco: parseFloat(preco) };
        
        if (idEditando) {
            await api.put(`/produto/${idEditando}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            await api.post("/produto", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        limparFormulario();
        listarProdutos();
    }

    async function excluirProduto(codigo) {
        const token = localStorage.getItem("token");
        await api.delete(`/produto/${codigo}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        listarProdutos();
    }

    function prepararEdicao(produto) {
        setIdEditando(produto.codigo);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
    }

    function limparFormulario() {
        setIdEditando(null);
        setNome("");
        setDescricao("");
        setPreco("");
    }

    return (
        <div className="container">
            <h1>Gerenciamento de Produtos</h1>
            <div className="formulario">
                <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <input placeholder="Preço" type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
                <button onClick={salvarProduto}>{idEditando ? "Atualizar" : "Salvar"}</button>
                {idEditando && <button onClick={limparFormulario}>Cancelar</button>}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p) => (
                        <tr key={p.codigo}>
                            <td>{p.nome}</td>
                            <td>{p.descricao}</td>
                            <td>R$ {p.preco}</td>
                            <td>
                                <button onClick={() => prepararEdicao(p)}>Editar</button>
                                <button className="btn-excluir" onClick={() => excluirProduto(p.codigo)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Produtos;