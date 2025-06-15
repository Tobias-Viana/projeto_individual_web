# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-12-15

### Adicionado
- Sistema completo de autenticação de usuários
- CRUD completo para tarefas
- Sistema de categorias de tarefas com cores personalizáveis
- Interface moderna com design glassmorphism
- Degradê azul no fundo da aplicação
- Validação robusta com Joi
- Arquitetura MVC com Repository Pattern
- Documentação completa (README.md e WAD.md)
- Scripts de configuração do banco de dados
- API REST completa
- Interface responsiva
- Filtro de tarefas por usuário
- Categorias padrão (Trabalho, Pessoal, Estudos)

### Funcionalidades
- **Autenticação**: Login/cadastro unificado com hash de senhas
- **Tarefas**: Criar, editar, excluir e visualizar tarefas
- **Categorias**: Gerenciamento completo de categorias personalizadas
- **Status**: Pendente, Em Andamento, Concluída
- **Datas**: Controle de prazos de entrega
- **Cores**: Seletor de cor para categorias
- **Isolamento**: Cada usuário vê apenas suas próprias tarefas

### Tecnologias
- **Backend**: Node.js, Express.js, Joi, bcrypt
- **Frontend**: HTML5, CSS3, JavaScript ES6+, EJS
- **Banco**: PostgreSQL via Supabase
- **Arquitetura**: MVC + Repository Pattern + Service Layer

### Correções
- Corrigido erro de referência em taskRoutes.js
- Corrigido erro de validação em userController.js
- Corrigido problema de tarefas aparecendo para todos os usuários
- Corrigido estrutura do package.json
- Corrigido referências de tabelas no banco de dados

## [Unreleased]

### Planejado para próximas versões
- [ ] Sistema de notificações
- [ ] Compartilhamento de tarefas
- [ ] Relatórios e estatísticas
- [ ] Anexos em tarefas
- [ ] Subtarefas
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] CI/CD
- [ ] Docker
- [ ] Recuperação de senha
- [ ] Autenticação de dois fatores (2FA)

---

### Tipos de mudanças
- `Adicionado` para novas funcionalidades
- `Alterado` para mudanças em funcionalidades existentes
- `Depreciado` para funcionalidades que serão removidas em breve
- `Removido` para funcionalidades removidas
- `Corrigido` para correções de bugs
- `Segurança` para vulnerabilidades
