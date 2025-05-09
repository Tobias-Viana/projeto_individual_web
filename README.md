<h1>Gerenciador de Tarefas</h1>
  <p>Um sistema simples de gerenciamento de tarefas (To-do list) desenvolvido com JavaScript no frontend, Node.js no backend e banco de dados PostgreSQL via Supabase.</p>
  <h2>Funcionalidades</h2>
  <ul>
    <li>Criar, ler, atualizar e deletar tarefas</li>
    <li>Marcar tarefas como concluídas ou pendentes</li>
    <li>Filtrar tarefas por status</li>
    <li>Autenticação de usuários com Supabase</li>
  </ul>
  <h2>Tecnologias Utilizadas</h2>
  <ul>
    <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
    <li><strong>Backend:</strong> Node.js (Express)</li>
    <li><strong>Banco de Dados:</strong> PostgreSQL (via <a href="https://supabase.io" target="_blank">Supabase</a>)</li>
    <li><strong>Hospedagem/Serviços:</strong> Supabase Auth e Supabase DB</li>
  </ul>

## Estrutura de Pastas
```text
gerenciador-de-tarefas/
├── assets/                # Arquivos públicos como imagens e fontes
├── config/                # Arquivos de configuração
├── controllers/           # Lógica de controle das requisições
├── documentos/            # Documentação adicional
├── models/                # Definição de modelos de dados
├── routes/                # Definição das rotas do sistema
├── services/              # Serviços auxiliares do sistema
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo das variáveis ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal do servidor
└── rest.http              # Teste de endpoints (opcional)
```
<h2>Como Rodar o Projeto Localmente</h2>

1- **Clone o repositório**:
```bash
git clone https://github.com/Tobias-Viana/gerenciador-de-tarefas.git
cd gerenciador-de-tarefas
```
2- **Instale as dependências: Certifique-se de que você tem o Node.js instalado. Em seguida, execute:**
```bash
npm install
```
3- **Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto com base no .env.example e preencha com os dados do Supabase, como o exemplo abaixo:**
```bash
DB_USER= "seu_usuario"
DB_HOST= "seu_host"
DB_DATABASE= "seu_banco"
DB_PASSWORD= "sua_senha"
DB_PORT= "sua_porta"
DB_SSL= "true"
PORT= 3000
```
4- **Execute o script de inicialização do banco de dados: Verifique se o banco está configurado e rodando. Depois, execute:**
```bash
node scripts/runSQLScript.js
```
5- **Inicie o servidor: Execute o comando abaixo para iniciar o servidor:**
```bash
npm start
```
6- **Acesse a aplicação: Abra o navegador e acesse:**
```bash
http://localhost:3000
```
7- **Testes (opcional): Para rodar os testes, execute:**
```bash
npm test
```