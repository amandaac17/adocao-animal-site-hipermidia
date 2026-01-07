const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', 
    database: 'miaumigos'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('✅ Conectado ao banco de dados MySQL!');
});

// --- ROTA DE CADASTRO (POST) ---
app.post('/cadastro_pets', (req, res) => {
    console.log("Recebi um pedido de cadastro:", req.body);

    const { nome, especie, raca, idade, genero, cor, temperamento, foto, sobre, nome_tutor, telefone_tutor } = req.body;

    // (Obrigatoriedade)
    if (!nome_tutor || !telefone_tutor) {
        return res.status(400).json({ error: "Nome e Telefone do tutor são obrigatórios!" });
    }

    const sql = "INSERT INTO cadastro_pets (nome, especie, raca, idade, genero, cor, temperamento, foto, sobre, nome_tutor, telefone_tutor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nome, especie, raca, idade, genero, cor, temperamento, foto, sobre, nome_tutor, telefone_tutor], (err, result) => {
        if (err) {
            console.log("ERRO NO BANCO DE DADOS:", err.message);
            return res.status(500).json({ error: err.message });
        }
        
        console.log("SUCESSO! Pet e Tutor inseridos. ID do cadastro:", result.insertId);
        res.status(201).json({ message: "Cadastrado com sucesso!", id: result.insertId });
    });
});

// --- ROTA DE LISTAGEM (GET) ---
app.get('/cadastro_pets', (req, res) => {
    db.query("SELECT * FROM cadastro_pets", (err, results) => {
        if (err) {
            console.error("Erro no MySQL:", err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// --- ROTA DE DELEÇÃO (DELETE) ---
app.delete('/cadastro_pets/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM cadastro_pets WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send("Erro ao deletar pet");
        } else {
            res.send("Pet removido com sucesso");
        }
    });
});

app.listen(3000, () => {
    console.log('🚀 Servidor rodando na porta 3000');
});

// ROTA PARA ATUALIZAR UM PET (PUT)
app.put('/cadastro_pets/:id', (req, res) => {
    const id = req.params.id;
    const { nome, especie, raca, idade, foto, sobre, genero, cor, temperamento, nome_tutor, telefone_tutor } = req.body;

    const sql = `
        UPDATE cadastro_pets 
        SET nome = ?, especie = ?, raca = ?, idade = ?, foto = ?, 
            sobre = ?, genero = ?, cor = ?, temperamento = ?, 
            nome_tutor = ?, telefone_tutor = ? 
        WHERE id = ?`;

    const valores = [nome, especie, raca, idade, foto, sobre, genero, cor, temperamento, nome_tutor, telefone_tutor, id];

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar no banco:", err);
            return res.status(500).send("Erro ao atualizar pet");
        }
        res.send({ mensagem: "Pet atualizado com sucesso!", id: id });
    });
});