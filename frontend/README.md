# Frontend do Simulado FATEC Interativo

Este diretório contém o código do cliente frontend para a aplicação "Simulado FATEC Interativo". Ele é construído com React (usando Vite) e estilizado com Tailwind CSS.

## Funcionalidades

*   Permite ao usuário selecionar uma prova da FATEC para realizar como simulado.
*   Apresenta as questões da prova de forma interativa.
*   Coleta as respostas do usuário.
*   Fornece navegação entre as questões.
*   Ao finalizar, exibe a pontuação, as respostas do usuário, as respostas corretas e as explicações para cada questão.
*   Design responsivo com foco em "mobile-first".

## Estrutura de Pastas Principais (`src/`)

*   `App.jsx`: Componente raiz da aplicação, configura o roteamento.
*   `main.jsx`: Ponto de entrada da aplicação React.
*   `index.css`: Arquivo CSS global, inclui as diretivas do Tailwind.
*   `components/`: Contém componentes reutilizáveis da UI (ex: `CartaoQuestao.jsx`, `Navegacao.jsx`).
*   `pages/`: Contém componentes de nível de página (ex: `SeletorDeProva.jsx`, `PaginaSimulado.jsx`, `TelaDeResultados.jsx`).
*   `services/`: Contém a lógica para chamadas à API do backend (ex: `api.js`).

## Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: 18.x ou superior)
*   [npm](https://www.npmjs.com/) (ou `yarn`/`pnpm`)

## Configuração e Instalação

1.  **Clone o repositório** (se aplicável) ou certifique-se de que todos os arquivos deste frontend estão em um diretório `frontend/`.

2.  **Navegue até o diretório do frontend:**
    ```bash
    cd frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    (Se você ainda não tiver o Tailwind configurado, siga os passos abaixo após a instalação inicial das dependências do Vite):
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
    Certifique-se de que os arquivos `tailwind.config.js`, `postcss.config.js` e `src/index.css` estão configurados conforme fornecido no projeto.

## Rodando a Aplicação Frontend

Para iniciar o servidor de desenvolvimento do Vite:
```bash
npm run dev
```
A aplicação estará, por padrão, acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

**Importante:** O backend (localizado na pasta `../backend`) precisa estar rodando para que o frontend consiga buscar os dados das provas. Certifique-se de iniciar o servidor backend primeiro.

## Conexão com o Backend

O frontend espera que o backend esteja rodando em `http://localhost:3001`. Essa URL base da API está configurada em `src/services/api.js`. Se o seu backend estiver rodando em uma porta diferente, você precisará ajustar esta constante.

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

*   `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
*   `npm run build`: Compila a aplicação para produção na pasta `dist/`.
*   `npm run lint`: Executa o linter (ESLint, se configurado).
*   `npm run preview`: Serve localmente a build de produção da pasta `dist/`.
