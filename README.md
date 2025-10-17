# 🎬 TMDB Movie Explorer Challenge (NTT DATA)

## Sobre o Projeto

Este projeto é a solução para o desafio técnico da NTT DATA, focado na construção de uma aplicação Front-End robusta para explorar filmes, buscar novos conteúdos e gerenciar uma lista personalizada de favoritos utilizando a API do The Movie Database (TMDB).

A arquitetura foi planejada para demonstrar padrões de desenvolvimento, reusabilidade e manutenibilidade.

## ⚙️ Tecnologias Utilizadas

| Categoria | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Framework/Builder** | React 18+ (Vite) | Desenvolvimento eficiente de UI/UX moderna. |
| **Linguagem** | TypeScript | Garantia de código seguro e tipado. |
| **Gerenciamento de Estado** | Context API & useReducer | Solução nativa para estado global (Favoritos), garantindo simplicidade e rastreabilidade da lógica. |
| **Estilização** | Tailwind | Framework utility-first para desenvolvimento rápido e consistente de UI, mantendo a responsividade. |
| **Requisições** | Axios | Cliente HTTP robusto para consumo e manipulação de APIs REST. |
| **Roteamento** | React Router DOM | Gerenciamento de navegação e rotas. |
| **Qualidade** | Jest / React Testing Library | Aplicação de testes unitários na lógica de negócio e serviços. |
| **Hospedagem** | Vercel | Demonstração de *deployment* e fluxo de CI/CD. |

## ✨ Características Principais

* **Arquitetura Sênior:** Utilização de Custom Hooks (`useTmdb`, `useFavorites`) para abstrair lógica complexa (APIs, Loading States, Erros).
* **Gerenciamento de Favoritos:** Lógica completa de adicionar/remover, persistida em **Local Storage** e controlada via Context API.
<!-- * **UX Avançada:** Implementação de Infinite Scroll e Paginação na Home e Busca. -->
* **Organização:** Estrutura de pastas modularizada para alta manutenibilidade e escalabilidade.

## 🚀 Como Executar Localmente

### Pré-requisitos

1.  Node.js e npm instalados.
2.  Uma chave da API do TMDB (`API Key`).

### Passo a Passo

1.  Clone o repositório:
    ```bash
    git clone [LINK_DO_SEU_REPOSITORIO]
    cd [NOME_DO_PROJETO]
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as Variáveis de Ambiente:
    Crie um arquivo `.env` na raiz do projeto e preencha com sua chave da API, usando o `.env.example` como modelo:
    ```bash
    # .env
    VITE_TMDB_API_KEY=SUA_CHAVE_AQUI
    ```
4.  Execute a Aplicação:
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou porta similar).

---