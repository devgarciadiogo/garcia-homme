// assets/js/produto.js

// 1. IMPORTAÇÃO NECESSÁRIA!
import { adicionarAoCarrinho } from "./carrinho.js";

const PRODUTOS_API = "assets/data/produtos.json";
// O elemento precisa ser definido no escopo global para que a função o encontre
const detalhesProdutoElement = document.getElementById("detalhes-produto");
let produtoAtual = null;

// Função 1: Obtém o ID do produto da URL (Query String)
function obterIdProdutoDaUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  return parseInt(id);
}

// Função 2: Busca e Renderiza o Produto
async function carregarDetalhesProduto() {
  const produtoId = obterIdProdutoDaUrl();

  if (isNaN(produtoId)) {
    detalhesProdutoElement.innerHTML = `<p class="alert alert-danger text-center">Produto não encontrado. ID inválido.</p>`;
    return;
  }

  try {
    const response = await fetch(PRODUTOS_API);
    const produtos = await response.json();

    const produto = produtos.find((p) => p.id === produtoId);

    if (produto) {
      produtoAtual = produto; // Guarda o produto no escopo global do módulo
      renderizarProduto(produto);
      configurarBotaoCarrinho(); // Chama a nova função após renderizar
    } else {
      detalhesProdutoElement.innerHTML = `<p class="alert alert-warning text-center">Nenhum produto encontrado com o ID ${produtoId}.</p>`;
    }
  } catch (error) {
    console.error("Erro ao carregar detalhes do produto:", error);
    detalhesProdutoElement.innerHTML = `<p class="alert alert-danger text-center">Ocorreu um erro ao processar os dados.</p>`;
  }
}

// Função 3: Renderiza o HTML do Produto
function renderizarProduto(produto) {
  const { nome, preco, descricao, imagemUrl } = produto;
  const precoFormatado = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  detalhesProdutoElement.innerHTML = `
        <div class="row">
                        <div class="col-lg-6 mb-4">
                <img src="${imagemUrl}" class="img-fluid rounded shadow-sm" alt="${nome}">
            </div>

                        <div class="col-lg-6">
                
                <h1 class="display-4 fw-bold">${nome}</h1>
                <p class="text-muted fs-3 mb-4">${precoFormatado}</p>

                <h2 class="h5 mt-4 mb-2">Descrição</h2>
                <p class="text-secondary">${descricao}</p>

                                <div class="d-flex align-items-center mb-4">
                    <label for="input-quantidade" class="me-3 fw-bold">Qtd:</label>
                    
                                        <div class="me-4" style="width: 80px;"> 
                        <input type="number" id="input-quantidade" value="1" min="1" class="form-control" >
                    </div>
                    
                                        <div class="flex-grow-1">
                        <button class="btn btn-dark btn-lg w-100" id="btn-adicionar-carrinho">
                            <i class="fas fa-shopping-cart me-2"></i> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>

                <div class="mt-4 pt-3 border-top">
                    <p class="text-sm text-muted">Entrega rápida e segura para todo o Brasil.</p>
                </div>
            </div>
        </div>
    `;
}

// 4. NOVA FUNÇÃO: Configurar o Event Listener para o botão
function configurarBotaoCarrinho() {
  const btnAdicionar = document.getElementById("btn-adicionar-carrinho");
  const inputQuantidade = document.getElementById("input-quantidade");

  if (btnAdicionar && produtoAtual) {
    // Adiciona um 'ouvinte de evento' ao clique do botão
    btnAdicionar.addEventListener("click", () => {
      // Garante que a quantidade seja um número inteiro e positivo
      const quantidade = parseInt(inputQuantidade.value);

      if (quantidade > 0) {
        // Chama a função IMPORTADA do módulo carrinho.js
        adicionarAoCarrinho(produtoAtual, quantidade);
      } else {
        alert("A quantidade deve ser de pelo menos 1.");
      }
    });
  }
}

// Inicia o carregamento quando o script é executado
carregarDetalhesProduto();
