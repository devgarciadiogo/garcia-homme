// assets/js/app.js

// 1. URL do nosso arquivo JSON
const PRODUTOS_API = "assets/data/produtos.json";

// 2. Elemento HTML onde os produtos serão inseridos
const listaProdutosElement = document.getElementById("lista-produtos");

// Função para buscar e renderizar os produtos
async function carregarProdutos() {
  try {
    // 1. Buscar (Fetch) os dados do JSON. 'await' espera a resposta.
    const response = await fetch(PRODUTOS_API);

    // 2. Converter a resposta para formato JSON.
    const produtos = await response.json();

    // 3. Chamar a função de renderização
    renderizarProdutos(produtos);
  } catch (error) {
    // Tratar erros (ex: arquivo JSON não encontrado)
    console.error("Erro ao carregar os produtos:", error);
    // Exibir uma mensagem amigável no lugar dos produtos
    listaProdutosElement.innerHTML = `<p class="text-danger text-center">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>`;
  }
}

// Função que cria o HTML (Card) para cada produto
function renderizarProdutos(produtos) {
  // Garantimos que a lista de produtos é um array
  if (!Array.isArray(produtos)) return;

  let htmlContent = ""; // Variável para acumular todo o HTML

  // Itera sobre cada produto e constrói o card
  produtos.forEach((produto) => {
    // Uso de Template Literals (` `) e Destructuring para facilitar a leitura e o acesso aos dados
    const { nome, preco, imagemUrl, id } = produto;

    // Formata o preço para o padrão BRL
    const precoFormatado = preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // HTML do Card usando classes Bootstrap e os dados do produto
    htmlContent += `
            <div class="col">
                <div class="card h-100 border-0 shadow-sm text-center">
                    <img src="${imagemUrl}" class="card-img-top" alt="${nome}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-medium">${nome}</h5>
                        <p class="card-text text-muted mb-3">${precoFormatado}</p>
                        
                        <a href="produto.html?id=${id}" class="btn btn-outline-dark mt-auto">Ver Detalhes</a>
                    </div>
                </div>
            </div>
        `;
  });

  // Insere o HTML completo no elemento #lista-produtos
  listaProdutosElement.innerHTML = htmlContent;
}

// Inicia o carregamento dos produtos assim que a página é carregada
carregarProdutos();
