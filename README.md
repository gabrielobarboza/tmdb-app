# TMDB App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Aplicação React para explorar filmes usando a API do TMDB. Busque filmes, veja detalhes e gerencie seus favoritos.

## Features

- 🔍 Busca de filmes
- ⭐ Lista de favoritos
- 🌓 Tema dark/light
- 📱 Design responsivo

---

## ⚙️ Tecnologias Utilizadas

#### Stack Principal

| Categoria | Tecnologia | Justificativa Arquitetural |
| :--- | :--- | :--- |
| **Builder** | Vite | Build tool mais rápida e moderna |
| **Framework/Linguagem** | React + TypeScript | Type-safety proporcionando melhor Developer Experience. |
| **Estilização** | **TailwindCSS** | Estilização rápida e consistente. |
| **Roteamento** | React Router | Gerenciamento de navegação e rotas com URLs limpas. |
| **Qualidade** | Jest + Testing Library | Aplicação de testes unitários na lógica de negócio e serviços. |

#### Gerenciamento de Estado
- Context API ao invés de Redux
  - Pros: Mais simples, suficiente para a escala do projeto
  - Contras: Pode precisar de refatoração se a aplicação crescer muito

#### Favoritos
- Armazenamento: LocalStorage
  - Pros: Persistência simples, sem backend
  - Contras: Limitado ao navegador, sem sync entre dispositivos

#### API Client
- Axios como cliente HTTP + React Query (TanStack Query)
  - Pros: Interceptors, tipos melhores, tratamento de erros consistente
  - Contras: Bundle size maior que fetch

#### Requisitos
- Node.js >= 18.x

## Quick Start

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Adicione sua API key do TMDB no .env

# Rodar em desenvolvimento
npm run dev
```

## Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm run test` - Roda testes
- `npm run lint` - Verifica lint
- `npm run preview` - Preview do build

## Estrutura

```
src/
├── api/        # Cliente API
├── components/ # Componentes React
├── context/    # Contextos globais
├── hooks/      # Custom hooks
├── pages/      # Páginas/rotas
├── types/      # Tipos TypeScript
└── utils/      # Utilitários
```

## Páginas

- `/` - Lista de filmes populares
- `/movie/:id` - Detalhes do filme
- `/favorites` - Lista de favoritos
- `/search` - Busca de filmes

---

## Pontos Principais

### Performance
> - Lazy loading de rotas
> - Memoização de componentes
> - Otimização de re-renders

### UX/UI
> - Design responsivo
> - Tema dark/light
> - Feedback visual claro
> - Loading states

### Código
> - Alta cobertura de testes
> - TypeScript strict mode
> - ESLint + Prettier
> - Commits semânticos

### DevEx
> - Setup rápido
> - Scripts úteis no package.json
> - CI/CD configurado


