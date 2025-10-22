// assets/js/carrinho.js

// CHAVE única que usaremos no localStorage para guardar o carrinho
const CARRINHO_STORAGE_KEY = "garcia_homme_carrinho";

// --------------------------------------------------------
// 1. Funções de Leitura e Escrita (Privadas)
// --------------------------------------------------------

/**
 * Retorna o array de itens do carrinho do localStorage.
 * (Função interna, não exportada)
 */
function obterCarrinho() {
  const carrinhoJson = localStorage.getItem(CARRINHO_STORAGE_KEY);
  if (!carrinhoJson) {
    return [];
  }
  try {
    return JSON.parse(carrinhoJson);
  } catch (e) {
    console.error("Erro ao analisar JSON do carrinho:", e);
    return [];
  }
}

/**
 * Salva o array de itens no carrinho de volta para o localStorage.
 * (Função interna, não exportada)
 */
function salvarCarrinho(carrinho) {
  const carrinhoJson = JSON.stringify(carrinho);
  localStorage.setItem(CARRINHO_STORAGE_KEY, carrinhoJson);
}

// --------------------------------------------------------
// 2. Função de Adicionar Item (A ÚNICA EXPORTADA)
// --------------------------------------------------------

/**
 * Adiciona um item ao carrinho ou aumenta sua quantidade se já existir.
 * @param {Object} item - O objeto do produto a ser adicionado.
 * @param {number} quantidade - A quantidade do produto.
 */
export function adicionarAoCarrinho(item, quantidade) {
  const carrinho = obterCarrinho(); // Garante que a quantidade seja um número válido

  quantidade = parseInt(quantidade) || 1; // Procura se o item já existe no carrinho (pelo ID)

  const itemExistente = carrinho.find((c) => c.id === item.id);

  if (itemExistente) {
    // Se existe, apenas aumenta a quantidade
    itemExistente.quantidade += quantidade;
  } else {
    // Se não existe, adiciona o novo item com a quantidade
    carrinho.push({
      ...item,
      quantidade: quantidade,
    });
  } // Salva a versão atualizada do carrinho

  salvarCarrinho(carrinho); // Notificar o usuário e atualizar o console

  console.log(
    `${item.nome} (${quantidade}x) adicionado(s) ao carrinho. Carrinho atual:`,
    carrinho
  );
  alert(`${item.nome} (${quantidade}x) adicionado(s) ao carrinho!`); // TODO: No futuro, atualizar o contador de itens no header
}
