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

| Pasta/Arquivo            | Conteúdo                                |
|--------------------------|-----------------------------------------|
| **assets/**              | Arquivo estáticos                       |
| └── diagrama_de_dados.png| Diagrama do banco de dados              |
| **documentos/**          | Documentação adicional                  |
| └── wad.md               | Documentação do projeto                 |
| **src/**                 | Source code                             |
| **config/**              | Arquivos de configuração                |
| └── db.js                | Conexão com o banco                     |
| **controllers/**         | Lógica de controle das requisições      |
| └── categoryController.js| Lógica de controle de categorias        |
| └── taskController.js    | Lógica de controle de tarefas           |
| └── userController.js    | Lógica de controle de usuários          |
| **models/**              | Modelos de dados                        |
| └── categoryModels.js    | Modelo de dados de categorias           |
| └── taskModels.js        | Modelo de dados de tarefas              |
| └── userModels.js        | Modelo de dados de usuários             |
| **repositories/**        | Repositório de dados                    |
| └── categoryRepository.js| Repositório de dados de categorias      |
| └── taskRepository.js    | Repositório de dados de tarefas         |
| └── userRepository.js    | Repositório de dados de usuários        |
| **routes/**              | Definição das rotas do sistema          |
| └── categoryRoutes.js    | Rotas de categorias                     |
| └── index.js             | Index de todas as rotas                 |
| └── taskRoutes.js        | Rotas de tarefas                        |
| └── userRoutes.js        | Rotas de usuários                       |
| **scripts/**             | Arquivos de JavaScript públicos         |
| └── init.sql             | Modelo físico                           |
| └── runSQLScript.js      | Executa comandos SQL                    |
| **services/**            | Serviços auxiliares do sistema          |
| └── categoryService.js   | Serviços relacionados as categorias     |
| └── taskService.js       | Serviços relacionados as tarefas        |
| └── userService.js       | Serviços relacionados aos usuários      |
| **views/**               | Renderização de páginas HTML            |
| └── docs.html            | Documentação HTML dos API               |
| **server.js**            | Arquivo principal do servidor           |
| .env.example             | Arquivo de exemplo das variáveis        |
| .gitignore               | Arquivo para ignorar arquivos no Git    |
| jest.config.js           | Arquivo de configuração do Jest         |
| package-lock.json        | Gerenciador de dependências do Node.js  |
| package.json             | Gerenciador de dependências do Node.js  |
| readme.md                | Documentação do projeto (Markdown)      |
| rest.http                | Teste de endpoints (opcional)           |

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
8- **Use uma ferramenta como o Postman ou Insomnia para testar os endpoints da API. Você também pode testar diretamente com o arquivo rest.http incluso no projeto. Basta abrir esse arquivo com o VS Code (e a extensão REST Client instalada), e clicar em “Send Request” nos blocos.**
``` bash
POST /api/users — Criar usuário
POST /api/login — Fazer login
POST /api/tasks — Criar nova tarefa
GET /api/tasks — Listar tarefas
PUT /api/tasks/:id — Atualizar tarefa
DELETE /api/tasks/:id — Deletar tarefa
```