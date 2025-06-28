const API_BASE_URL = 'http://localhost:3001/api'; // URL do nosso backend

export const fetchProvasDisponiveis = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/provas`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar provas disponíveis:", error);
    throw error; // Re-throw para que o componente possa lidar com isso
  }
};

export const fetchProvaDetalhes = async (idProva) => {
  try {
    const response = await fetch(`${API_BASE_URL}/provas/${idProva}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar detalhes da prova ${idProva}:`, error);
    throw error;
  }
};
