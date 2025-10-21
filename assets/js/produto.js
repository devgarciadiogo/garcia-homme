// assets/js/produto.js

const PRODUTOS_API = "assets/data/produtos.json";
const detalhesProdutoElement = document.getElementById("detalhes-produto");

// Função 1: Obtém o ID do produto da URL (Query String)
function obterIdProdutoDaUrl() {
  // URLSearchParams é uma API nativa do JS para manipular parâmetros de URL
  const params = new URLSearchParams(window.location.search);
  // 'id' é o nome do parâmetro que definimos no link do index.html
  const id = params.get("id");

  // Converte o ID para número (O ID no JSON é numérico, no URL é String)
  return parseInt(id);
}

// Função 2: Busca e Renderiza o Produto
async function carregarDetalhesProduto() {
  const produtoId = obterIdProdutoDaUrl();

  if (isNaN(produtoId)) {
    // Se não houver ID válido na URL, exibe erro e para
    detalhesProdutoElement.innerHTML = `<p class="alert alert-danger text-center">Produto não encontrado. ID inválido.</p>`;
    return;
  }

  try {
    // 1. Buscar todos os produtos
    const response = await fetch(PRODUTOS_API);
    const produtos = await response.json();

    // 2. Encontrar o produto correspondente ao ID
    // .find() é um método moderno de Array que busca o primeiro elemento que satisfaz a condição
    const produto = produtos.find((p) => p.id === produtoId);

    if (produto) {
      // 3. Renderizar o produto encontrado
      renderizarProduto(produto);
    } else {
      // Produto com aquele ID não existe no JSON
      detalhesProdutoElement.innerHTML = `<p class="alert alert-warning text-center">Nenhum produto encontrado com o ID ${produtoId}.</p>`;
    }
  } catch (error) {
    console.error("Erro ao carregar detalhes do produto:", error);
    detalhesProdutoElement.innerHTML = `<p class="alert alert-danger text-center">Ocorreu um erro ao processar os dados.</p>`;
  }
}

// Função 3: Renderiza o HTML do Produto (Design Minimalista com Grid)
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
                    <label for="quantidade" class="me-3 fw-bold">Qtd:</label>
                    <input type="number" id="quantidade" value="1" min="1" class="form-control me-4" style="width: 80px;">
                    
                    <button class="btn btn-dark btn-lg w-100">
                        <i class="fas fa-shopping-cart me-2"></i> Adicionar ao Carrinho
                    </button>
                </div>

                <div class="mt-4 pt-3 border-top">
                    <p class="text-sm text-muted">Entrega rápida e segura para todo o Brasil.</p>
                </div>
            </div>
        </div>
    `;
}

// Inicia o carregamento quando o script é executado
carregarDetalhesProduto();
