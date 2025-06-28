import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'; // Usando fs/promises para async/await
import path from 'path';
import { fileURLToPath } from 'url';

// Equivalente a __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Porta para o backend

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Para parsear JSON no corpo das requisições (se necessário no futuro)

// Caminho para a pasta de dados
const dataPath = path.join(__dirname, 'data');

// Cache para os dados das provas para evitar leituras repetidas do disco
let provasCache = {};

// Função para carregar os dados de uma prova
async function carregarProva(idProva) {
  if (provasCache[idProva]) {
    return provasCache[idProva];
  }
  try {
    const filePath = path.join(dataPath, `${idProva}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const provaData = JSON.parse(fileContent);
    provasCache[idProva] = provaData; // Armazena em cache
    return provaData;
  } catch (error) {
    console.error(`Erro ao carregar a prova ${idProva}:`, error);
    return null; // Retorna null se o arquivo não for encontrado ou houver erro
  }
}

// Rota para listar as provas disponíveis (opcional, mas útil)
app.get('/api/provas', async (req, res) => {
  try {
    // Simplesmente lista os IDs baseados nos nomes dos arquivos JSON que esperamos
    // Para uma solução mais robusta, poderíamos ler os nomes dos arquivos na pasta /data
    const provasDisponiveis = [
      { id: 'prova_1sem2024', nome: 'Simulado FATEC - 1º SEM/2024' },
      { id: 'prova_2sem2024', nome: 'Simulado FATEC - 2º SEM/2024' }
    ];
    res.json(provasDisponiveis);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar provas disponíveis.', error: error.message });
  }
});

// Rota para obter os dados de uma prova específica
app.get('/api/provas/:idProva', async (req, res) => {
  const { idProva } = req.params;
  const provaData = await carregarProva(idProva);

  if (provaData) {
    res.json(provaData);
  } else {
    res.status(404).json({ message: `Prova com ID '${idProva}' não encontrada.` });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
  // Pré-carrega as provas ao iniciar o servidor (opcional)
  carregarProva('prova_1sem2024').then(() => console.log('Prova 1SEM2024 pré-carregada.'));
  carregarProva('prova_2sem2024').then(() => console.log('Prova 2SEM2024 pré-carregada.'));
});
