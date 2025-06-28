# Backend do Simulado FATEC Interativo

Este diretório contém o código do servidor backend para a aplicação "Simulado FATEC Interativo". Ele é construído com Node.js e Express.js.

## Funcionalidades

*   Serve os dados das provas (questões, alternativas, respostas, explicações) em formato JSON.
*   Fornece uma API para o frontend buscar as provas disponíveis e os detalhes de cada prova.

## Estrutura de Arquivos

*   `server.js`: Arquivo principal do servidor Express.
*   `package.json`: Define as dependências e scripts do projeto.
*   `data/`: Contém os arquivos JSON com os dados das provas.
    *   `prova_1sem2024.json`
    *   `prova_2sem2024.json`

## Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: 18.x ou superior)
*   [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

## Configuração e Instalação

1.  **Clone o repositório** (se aplicável) ou certifique-se de que todos os arquivos deste backend estão em um diretório `backend/`.

2.  **Navegue até o diretório do backend:**
    ```bash
    cd backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

## Rodando o Servidor

### Modo de Desenvolvimento

Para rodar o servidor em modo de desenvolvimento com reinício automático usando `nodemon`:
```bash
npm run dev
```
O servidor estará, por padrão, rodando em `http://localhost:3001`.

### Modo de Produção (Simples)

Para rodar o servidor normalmente:
```bash
npm start
```
O servidor estará, por padrão, rodando em `http://localhost:3001`.

## Endpoints da API

*   **`GET /api/provas`**
    *   Retorna uma lista das provas disponíveis com seus IDs e nomes.
    *   Exemplo de resposta:
        ```json
        [
          { "id": "prova_1sem2024", "nome": "Simulado FATEC - 1º SEM/2024" },
          { "id": "prova_2sem2024", "nome": "Simulado FATEC - 2º SEM/2024" }
        ]
        ```

*   **`GET /api/provas/:idProva`**
    *   Retorna os dados completos de uma prova específica.
    *   Substitua `:idProva` pelo ID da prova (ex: `prova_1sem2024`).
    *   Exemplo de resposta: Conteúdo do arquivo JSON correspondente.

## Variáveis de Ambiente

*   `PORT`: Define a porta em que o servidor vai rodar. O padrão é `3001`. (Não é estritamente necessário configurar para este projeto simples, mas é uma boa prática).
