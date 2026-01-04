const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json()); // Ler dados em formato JSON
app.use(express.urlencoded({ extended: true })); // Ler dados de formulários padrão
app.use(cors());

// --- CONFIGURAÇÃO DA CONEXÃO ---
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

app.listen(3000, () => {
    console.log('🚀 Servidor rodando na porta 3000');
});

// Rota para salvar um novo pet
app.post('/pets', (req, res) => {
    console.log("Recebi um pedido de cadastro:", req.body); // Log 1

    const { nome, especie, idade, genero, cor, temperamento, foto, sobre } = req.body;
    const sql = "INSERT INTO pets (nome, especie, idade, genero, cor, temperamento, foto, sobre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nome, especie, idade, genero, cor, temperamento, foto, sobre], (err, result) => {
        if (err) {
            console.log("ERRO NO BANCO DE DADOS:", err.message); // Log 2
            return res.status(500).json({ error: err.message });
        }
        
        console.log("SUCESSO! Pet inserido com ID:", result.insertId); // Log 3
        res.status(201).json({ message: "Cadastrado com sucesso!", id: result.insertId });
    });
});
app.get('/pets', (req, res) => {
    console.log("Alguém tentou acessar a lista de pets!"); // Isso vai aparecer no terminal
    db.query("SELECT * FROM pets", (err, results) => {
        if (err) {
            console.error("Erro no MySQL:", err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM pets WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send("Erro ao deletar pet");
        } else {
            res.send("Pet removido com sucesso");
        }
    });
});