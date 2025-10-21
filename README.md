# 🎬 Movie DB

Uma aplicação React moderna que permite aos usuários explorar filmes, criar listas personalizadas de favoritos e descobrir novos conteúdos através da API do The Movie Database (TMDB).

## 🌐 Demo

**Acesse a aplicação:** [http://lucas-murta-react-movie-db.s3-website.us-east-2.amazonaws.com/](http://lucas-murta-react-movie-db.s3-website.us-east-2.amazonaws.com/)

## 🏗️ Arquitetura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
├── contexts/            # Context API para gerenciamento de estado
│   ├── FavoritesContext/   # Gerenciamento de favoritos
│   └── ToastContext/       # Sistema de notificações
├── hooks/               # Custom hooks
│   ├── useBreakpoints.ts   # Hook para responsividade
│   ├── useFavorites.ts     # Hook para favoritos
│   ├── useTheme.ts         # Hook para tema automático
│   └── useToast.ts         # Hook para notificações
├── lib/                 # Bibliotecas e utilitários
│   ├── base-component/     # Componentes base
│   └── component/          # Componentes específicos
├── pages/               # Páginas da aplicação
│   ├── favorites/          # Página de favoritos
│   ├── home/              # Página inicial
│   ├── movie-details/     # Detalhes do filme
│   └── search/            # Página de busca
├── router/              # Configuração de rotas
├── services/            # Serviços e APIs
│   ├── api.ts             # Configuração da API
│   ├── moviesService.ts   # Serviços de filmes
│   └── types.ts           # Tipos TypeScript
└── test/                # Configuração de testes
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passo a passo

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**

   ```bash
   cp .env
   ```

   Edite o arquivo `.env` com suas credenciais do TMDB:

   ```env
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_API_KEY=sua_api_key_aqui
   VITE_TMDB_READ_ACCESS_TOKEN=seu_token_aqui
   ```

3. **Execute em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Execute os testes:**

   ```bash
   npm run test
   ```

5. **Build para produção:**

   ```bash
   npm run build
   ```

6. **Preview da build:**
   ```bash
   npm run preview
   ```

## 🎯 Critérios de Desenvolvimento

### 🌐 **Acessibilidade**

- Navegação por teclado completa
- Suporte a leitores de tela
- Contraste adequado de cores
- Labels e descrições semânticas
- Focus indicators visíveis

### 📱 **Responsividade**

- Design mobile-first
- Breakpoints customizados
- Layout adaptativo para diferentes dispositivos
- Imagens otimizadas para diferentes resoluções

### 🎨 **Tema Automático**

- Detecção automática do tema do sistema
- Alternância manual entre claro/escuro
- Persistência da preferência do usuário
- Transições suaves entre temas

### 🎭 **Design Tokens**

- Sistema de cores consistente
- Tipografia padronizada
- Espaçamentos harmônicos
- Componentes reutilizáveis
- Documentação em `DESIGN_TOKENS.md`

### 🧹 **Organização de Código**

- Arquitetura modular e escalável
- Separação clara de responsabilidades
- Custom hooks para lógica reutilizável
- Context API para estado global
- TypeScript para type safety
- Testes unitários abrangentes

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Design Tokens
- **State Management:** Context API, Custom Hooks
- **Testing:** Vitest, Testing Library
- **API:** The Movie Database (TMDB)
- **Deploy:** AWS S3 + GitHub Actions
- **Quality:** ESLint, Prettier, Husky

## 📊 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build
npm run test         # Executa testes
npm run test:ui      # Interface gráfica dos testes
npm run test:run     # Executa testes uma vez
npm run lint         # Verifica código com ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run typecheck    # Verifica tipos TypeScript
```

## 🔄 CI/CD

O projeto utiliza GitHub Actions com workflows separados:

- **Pull Requests:** Validações (lint, tests, build)
- **Deploy:** Automático na branch `main` para AWS S3

## 📝 Funcionalidades

- ✅ Explorar filmes populares e em cartaz
- ✅ Buscar filmes por título
- ✅ Ver detalhes completos dos filmes
- ✅ Adicionar/remover filmes dos favoritos
- ✅ Gerenciar lista de favoritos
- ✅ Tema claro/escuro automático
- ✅ Interface responsiva
- ✅ Notificações toast
- ✅ Navegação acessível

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Desenvolvido com ❤️ por [Lucas Murta](https://github.com/lucas-murta)
