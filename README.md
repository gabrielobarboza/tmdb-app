## 🎬 TMDB Movie Explorer Challenge (NTT DATA)

### Sobre o Projeto

Este projeto é a solução para o desafio técnico da NTT DATA, focado na construção de uma aplicação Front-End robusta para explorar filmes, buscar novos conteúdos e gerenciar uma lista personalizada de favoritos utilizando a API do The Movie Database (TMDB).

A arquitetura foi planejada para demonstrar padrões de desenvolvimento, reusabilidade e manutenibilidade, atendendo a todos os objetivos de avaliação.

### ⚙️ Tecnologias Utilizadas (Requisitos Técnicos)

| Categoria | Tecnologia | Justificativa Arquitetural |
| :--- | :--- | :--- |
| **Framework/Builder** | React 18+ (Vite) | Desenvolvimento eficiente de UI/UX moderna. |
| **Linguagem** | TypeScript | Garantia de código seguro e tipado. |
| **Estado de Servidor** | **React Query (TanStack Query)** | Padrão de mercado para *caching*, *loading states*, *error handling* e otimização de requisições REST. |
| **Estado Global (Cliente)** | **Context API & useReducer** | Solução nativa e performática para estado global (Favoritos), garantindo rastreabilidade da lógica. |
| **Persistência** | **Custom Hook `useLocalStorage`** | Isolamento do efeito colateral de I/O, mantendo o Reducer e o Contexto puros. |
| **Estilização** | **Tailwind CSS** | Framework *utility-first* para desenvolvimento rápido, responsivo e consistente de UI. |
| **Roteamento** | React Router DOM | Gerenciamento de navegação e rotas com URLs limpas. |
| **Requisições** | Axios | Cliente HTTP robusto para consumo de APIs REST. |
| **Qualidade** | Jest / React Testing Library | Aplicação de testes unitários na lógica de negócio e serviços. |

### ✨ Características e Soluções Arquiteturais

* **Abstração:** Utilização de Custom Hooks (`useMovieDetails`, `usePopularMoviesInfinite`) para abstrair a lógica complexa do React Query.
* **Organização e Aliases:** Estrutura de pastas modularizada com *Path Mapping* (`@/`) para garantir manutenibilidade e imports limpos.
* **UX Avançada:** Implementação de **Infinite Scroll** e tratamento de estados de carregamento e erro (`Loading States`).
* **Reatividade:** Lógica de Favoritos com **`useReducer`** e persistência em Local Storage, garantindo que o `MovieCard` reaja globalmente.

### 📄 Páginas Implementadas (Requisitos Obrigatórios)

1.  **Home (`/`):** Grid responsivo de filmes populares com Infinite Scroll.
2.  **Detalhes do Filme (`/movie/:id`):** Layout de dois blocos, exibindo informações completas (sinopse, gêneros, data, nota) e botão reativo de Favoritar.
3.  **Favoritos (`/favorites`):** Lista de favoritos persistida, com botões de filtro simples (por título e nota) e `Empty State`.
4.  **Busca (`/search?q=termo`):** Ativada via Header. Utiliza Infinite Scroll e implementa destaque visual no título dos filmes que correspondem ao termo buscado.

### 🚀 Como Executar Localmente

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/gabrielobarboza/tmdb-app.git
    cd tmdb-app
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
3.  **Configure Variáveis de Ambiente:**
    * Crie um arquivo `.env` na raiz, usando o `.env.example` como modelo.
    * Obtenha sua chave de API do TMDB e configure a variável `VITE_TMDB_API_KEY`.
4.  **Execute o Projeto:**
    ```bash
    npm run dev
    ```

### 📦 Entregáveis (Requisito NTT DATA)

* Código-fonte completo disponível no **GitHub**.
* `README.md` com instruções detalhadas.
* `.env.example` para configuração de variáveis.
* Scripts de instalação e execução (`package.json`).
* Hospedagem em plataforma (Ex: Vercel) para demonstração.