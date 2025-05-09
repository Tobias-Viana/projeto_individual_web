-- Script para criar as tabelas do banco de dados
CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tarefa (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  data_criacao INTEGER NOT NULL,
  data_entrega INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente',
  usuario_id INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS categoria (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT
);

CREATE TABLE IF NOT EXISTS tarefa_categorias(
  tarefa_id INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
  PRIMARY KEY (tarefa_id, categoria_id),
  FOREIGN KEY (tarefa_id) REFERENCES tarefa(id),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);