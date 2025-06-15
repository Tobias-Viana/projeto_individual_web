# WAD - What, Assumptions, Decisions

## 📋 What (O que foi construído)

### Visão Geral
O **Gerenciador de Tarefas** é uma aplicação web completa para gerenciamento de tarefas pessoais com sistema de categorias e autenticação de usuários. A aplicação permite que usuários criem, organizem e acompanhem suas tarefas de forma eficiente.

### Funcionalidades Implementadas

#### 🔐 Sistema de Autenticação
- **Cadastro de Usuários**: Registro com validação de email e hash de senhas
- **Login Seguro**: Autenticação com bcrypt para proteção de senhas
- **Interface Unificada**: Login e cadastro em uma única página com abas
- **Sessão Persistente**: Dados do usuário mantidos no localStorage

#### 📝 Gerenciamento de Tarefas
- **CRUD Completo**: Criar, visualizar, editar e excluir tarefas
- **Status Dinâmico**: Três estados (Pendente, Em Andamento, Concluída)
- **Datas de Entrega**: Controle de prazos com validação
- **Isolamento por Usuário**: Cada usuário vê apenas suas próprias tarefas
- **Validação Robusta**: Joi para validação de dados no backend

#### 🏷️ Sistema de Categorias
- **Categorias Personalizadas**: Usuários podem criar suas próprias categorias
- **Cores Customizáveis**: Seletor de cor para organização visual
- **Gerenciamento Completo**: CRUD para categorias
- **Categorias Padrão**: Trabalho, Pessoal e Estudos pré-configuradas
- **Associação com Tarefas**: Relacionamento many-to-one entre tarefas e categorias

#### 🎨 Interface Moderna
- **Design Glassmorphism**: Efeitos de vidro com blur e transparência
- **Degradê Azul**: Fundo com gradiente suave
- **Animações CSS**: Transições e efeitos hover elegantes
- **Responsividade**: Layout adaptável para diferentes dispositivos

## 🤔 Assumptions (Premissas e Suposições)

### Tecnológicas
- **Node.js**: Ambiente de execução JavaScript no servidor
- **PostgreSQL**: Banco de dados relacional para persistência
- **Supabase**: Plataforma de banco como serviço para facilitar deployment
- **Navegadores Modernos**: Suporte a ES6+ e CSS3

### Funcionais
- **Usuários Individuais**: Cada usuário tem seu próprio conjunto de tarefas e categorias
- **Autenticação Simples**: Sistema básico sem recuperação de senha ou 2FA
- **Categorias Opcionais**: Tarefas podem existir sem categoria associada
- **Interface Web**: Aplicação focada em desktop/web, responsiva para mobile

### Operacionais
- **Ambiente de Desenvolvimento**: Configuração local com Node.js
- **Banco Externo**: Uso do Supabase para evitar configuração local de PostgreSQL
- **Sessão Client-Side**: Dados de sessão mantidos no localStorage do navegador

## 🎯 Decisions (Decisões Técnicas)

### Arquitetura

#### **Padrão MVC com Camadas Adicionais**
```
Controllers → Services → Repositories → Database
```

**Justificativa**: Separação clara de responsabilidades, facilitando manutenção e testes.

- **Controllers**: Gerenciam requisições HTTP e respostas
- **Services**: Contêm lógica de negócio e validações
- **Repositories**: Abstraem acesso aos dados
- **Models**: Definem validações com Joi

#### **Repository Pattern**
**Decisão**: Implementar camada de repository para abstração do banco de dados.

**Justificativa**: 
- Facilita mudanças futuras de banco de dados
- Centraliza queries SQL
- Melhora testabilidade

### Banco de Dados

#### **PostgreSQL + Supabase**
**Decisão**: Usar PostgreSQL hospedado no Supabase.

**Justificativa**:
- **PostgreSQL**: Banco robusto e confiável para dados relacionais
- **Supabase**: Facilita configuração e deployment
- **Gratuito**: Tier gratuito suficiente para desenvolvimento e demonstração

#### **Estrutura de Tabelas**
```sql
users (id, name, email, password, created_at)
tasks (id, users_id, title, description, date_creation, date_delivery, status, category_id)
user_task_categories (id, name, description, color, users_id, created_at)
```

**Decisão**: Relacionamentos simples com foreign keys.

**Justificativa**:
- **Normalização**: Evita duplicação de dados
- **Integridade**: Foreign keys garantem consistência
- **Performance**: Índices automáticos em primary keys

### Frontend

#### **EJS Template Engine**
**Decisão**: Usar EJS para renderização server-side.

**Justificativa**:
- **Simplicidade**: Sintaxe familiar (HTML + JavaScript)
- **SEO**: Renderização server-side melhora indexação
- **Performance**: Menos JavaScript no cliente

#### **JavaScript Vanilla + Fetch API**
**Decisão**: Não usar frameworks frontend (React, Vue, etc.).

**Justificativa**:
- **Simplicidade**: Projeto focado no backend
- **Performance**: Menos overhead de frameworks
- **Aprendizado**: Demonstra conhecimento de JavaScript puro

#### **CSS Moderno com Glassmorphism**
**Decisão**: Implementar design moderno sem frameworks CSS.

**Justificativa**:
- **Customização**: Controle total sobre o design
- **Performance**: CSS otimizado e específico
- **Tendências**: Glassmorphism é uma tendência atual

### Backend

#### **Express.js**
**Decisão**: Framework web minimalista para Node.js.

**Justificativa**:
- **Simplicidade**: Fácil de configurar e usar
- **Flexibilidade**: Não impõe estrutura rígida
- **Comunidade**: Grande ecossistema de middlewares

#### **Joi para Validação**
**Decisão**: Usar Joi para validação de dados.

**Justificativa**:
- **Robustez**: Validações complexas e detalhadas
- **Mensagens**: Erros claros e customizáveis
- **TypeScript-like**: Definição de schemas estruturados

#### **bcrypt para Senhas**
**Decisão**: Hash de senhas com bcrypt.

**Justificativa**:
- **Segurança**: Algoritmo comprovadamente seguro
- **Salt**: Proteção contra rainbow tables
- **Padrão**: Amplamente usado na indústria

### Autenticação

#### **localStorage para Sessão**
**Decisão**: Armazenar dados de sessão no localStorage.

**Justificativa**:
- **Simplicidade**: Evita complexidade de JWT ou sessions
- **Persistência**: Dados mantidos entre sessões do navegador
- **Client-Side**: Reduz carga no servidor

**Trade-offs**:
- ❌ Menos seguro que JWT com refresh tokens
- ❌ Dados expostos no cliente
- ✅ Implementação simples
- ✅ Adequado para demonstração

### Categorias

#### **Tabela Separada para Categorias**
**Decisão**: Criar tabela `user_task_categories` em vez de enum.

**Justificativa**:
- **Flexibilidade**: Usuários podem criar categorias personalizadas
- **Cores**: Cada categoria pode ter cor específica
- **Escalabilidade**: Fácil adicionar novos campos

#### **Relacionamento Opcional**
**Decisão**: Tarefas podem existir sem categoria (category_id nullable).

**Justificativa**:
- **Flexibilidade**: Usuários não são obrigados a categorizar
- **Migração**: Tarefas existentes não quebram ao adicionar categorias
- **UX**: Processo de criação mais simples

## 🚀 Principais Aprendizados

### Técnicos

#### **Arquitetura em Camadas**
- **Aprendizado**: Importância da separação de responsabilidades
- **Benefício**: Código mais organizado e testável
- **Aplicação**: Padrão aplicável em projetos maiores

#### **Validação de Dados**
- **Aprendizado**: Joi oferece validações robustas e flexíveis
- **Benefício**: Menos bugs e melhor UX com mensagens claras
- **Aplicação**: Validação tanto no frontend quanto backend

#### **Design Moderno**
- **Aprendizado**: CSS moderno permite efeitos sofisticados
- **Benefício**: Interface atrativa sem frameworks pesados
- **Aplicação**: Glassmorphism e animações CSS

### Funcionais

#### **UX de Autenticação**
- **Aprendizado**: Interface unificada melhora conversão
- **Benefício**: Usuários não precisam navegar entre páginas
- **Aplicação**: Abas para login/cadastro em uma página

#### **Organização por Categorias**
- **Aprendizado**: Categorias visuais melhoram organização
- **Benefício**: Usuários conseguem organizar tarefas intuitivamente
- **Aplicação**: Cores e ícones para identificação rápida

## 🎯 Desafios Superados

### 1. **Isolamento de Dados por Usuário**
**Desafio**: Garantir que usuários vejam apenas suas próprias tarefas.

**Solução**: 
- Filtros por `users_id` em todas as queries
- Validação no backend para verificar propriedade
- JavaScript no frontend para carregar dados específicos

### 2. **Sistema de Categorias Flexível**
**Desafio**: Permitir categorias personalizadas sem complicar a estrutura.

**Solução**:
- Tabela separada para categorias
- Relacionamento opcional (nullable foreign key)
- Interface intuitiva para gerenciamento

### 3. **Design Responsivo com Glassmorphism**
**Desafio**: Implementar efeitos modernos mantendo responsividade.

**Solução**:
- CSS Grid e Flexbox para layout
- Media queries para diferentes telas
- backdrop-filter para efeitos de vidro

### 4. **Validação Consistente**
**Desafio**: Manter validações sincronizadas entre frontend e backend.

**Solução**:
- Joi para validação robusta no backend
- JavaScript no frontend para feedback imediato
- Mensagens de erro consistentes

## ✅ Pontos que Funcionaram Bem

### **Arquitetura Limpa**
- Separação clara de responsabilidades
- Código organizado e fácil de manter
- Padrões consistentes em todo o projeto

### **Interface Intuitiva**
- Design moderno e atrativo
- Navegação simples e clara
- Feedback visual adequado

### **Sistema de Categorias**
- Flexibilidade para usuários
- Organização visual eficiente
- Fácil gerenciamento

### **Autenticação Simples**
- Processo de cadastro/login fluido
- Interface unificada
- Sessão persistente

## 🔄 Pontos para Melhorar

### **Segurança**
- **Atual**: localStorage para sessão
- **Melhoria**: Implementar JWT com refresh tokens
- **Benefício**: Maior segurança e controle de sessão

### **Testes**
- **Atual**: Sem testes automatizados
- **Melhoria**: Implementar testes unitários e de integração
- **Benefício**: Maior confiabilidade e facilita refatoração

### **Performance**
- **Atual**: Queries simples sem otimização
- **Melhoria**: Implementar paginação e cache
- **Benefício**: Melhor performance com muitos dados

### **Funcionalidades**
- **Atual**: Funcionalidades básicas
- **Melhorias Possíveis**:
  - Notificações de prazo
  - Compartilhamento de tarefas
  - Relatórios e estatísticas
  - Anexos em tarefas
  - Subtarefas

### **Deploy e DevOps**
- **Atual**: Configuração manual
- **Melhoria**: Docker, CI/CD, monitoramento
- **Benefício**: Deploy automatizado e confiável

### **Mobile**
- **Atual**: Responsivo básico
- **Melhoria**: PWA ou app nativo
- **Benefício**: Melhor experiência mobile

## 📊 Métricas e Resultados

### **Linhas de Código**
- **Backend**: ~2000 linhas
- **Frontend**: ~1500 linhas
- **SQL**: ~200 linhas
- **Total**: ~3700 linhas

### **Arquivos**
- **Controllers**: 4 arquivos
- **Services**: 4 arquivos
- **Repositories**: 4 arquivos
- **Models**: 4 arquivos
- **Views**: 7 arquivos

### **Funcionalidades**
- ✅ Autenticação completa
- ✅ CRUD de tarefas
- ✅ CRUD de categorias
- ✅ Interface responsiva
- ✅ Validações robustas

## 🎯 Conclusão

O projeto **Gerenciador de Tarefas** demonstra uma implementação sólida de uma aplicação web completa, seguindo boas práticas de desenvolvimento e arquitetura. As decisões técnicas foram tomadas priorizando simplicidade, manutenibilidade e experiência do usuário.

Os principais sucessos incluem a arquitetura limpa, interface intuitiva e sistema de categorias flexível. As áreas de melhoria identificadas (segurança, testes, performance) são típicas de projetos que evoluem de MVP para produção.

O projeto serve como uma excelente base para futuras expansões e demonstra competência em desenvolvimento full-stack com tecnologias modernas.
