==================================================
UNIVERSIDADE FEDERAL DO MARANHÃO
Trabalho 2 de Hipermídia – Janeiro 2026

Alunas:
- Amanda Almeida Cardoso
- Sarah Regina Souza
==================================================


==================================================
MIAUMIGOS – SISTEMA DE ADOÇÃO
==================================================

Sistema para gerenciamento de pets, permitindo cadastro, edição, exclusão e listagem de animais com integração a banco de dados MySQL.


==================================================
COMO RODAR O PROJETO
==================================================

--------------------------------------------------
BANCO DE DADOS (MySQL)
--------------------------------------------------

Execute o script abaixo no MySQL:

CREATE DATABASE IF NOT EXISTS miaumigos;
USE miaumigos;

DROP TABLE IF EXISTS cadastro_pets;

CREATE TABLE cadastro_pets (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  especie ENUM('cachorro','gato') NOT NULL,
  raca VARCHAR(100) DEFAULT NULL,
  idade INT DEFAULT NULL,
  genero VARCHAR(20) DEFAULT NULL,
  cor VARCHAR(50) DEFAULT NULL,
  temperamento VARCHAR(100) DEFAULT NULL,
  foto TEXT,
  sobre TEXT,
  data_cadastro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('disponível','adotado','em análise') DEFAULT 'disponível',
  nome_tutor VARCHAR(100) NOT NULL,
  telefone_tutor VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--------------------------------------------------
SERVIDOR (Node.js)
--------------------------------------------------

No terminal, dentro da pasta do projeto, execute:

npm install
node server.js


--------------------------------------------------
ACESSO
--------------------------------------------------

Abra o navegador e acesse:

http://localhost:3000


==================================================
TECNOLOGIAS
==================================================

Front-end: HTML, CSS e JavaScript (Vanilla)
Back-end: Node.js e Express
Banco de dados: MySQL


