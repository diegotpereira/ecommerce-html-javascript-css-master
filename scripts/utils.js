

// Função para falar com o servidor e devolver um monte de produtos
async function buscarTodosProdutos() {
    var produtos =[];
    var cards = [];
    const errorMessage = "<p>No momento não temos nenhum item em estoque, mas fique à vontade para adicionar seu (s) próprio (s) produto (s)</p>";

    await fetch('', {
        method: 'GET',
        mode: 'cors'
    })

    .then(response => response.json())
    .then(data => produtos = data)
    .catch(_ => cards.push(errorMessage));

    if (produtos.length > 0 && cards.length < 1) {
        for(const index in produtos) {
            var produto = produtos[index];

            var produtoID = produto.id;
            var produtoNome = produto.nome;
            var produtoImageURL = produto.imageURL;
            var produtoPreco = produto.preco;
            var produtoDescricao = produto.descricao;

            var card = `
            <div class="col-sm" id=${produtoID}>
               <div class="card bg-dark" style="width: 18rem;">
                   <img class="card-img-top" src=${produtoImageURL} alt="Produto Imagem">
                   <div class="card-body text-white">
                      <h5 class="card-title">${produtoNome}</h5>
                      <p class="card-text>${produtoDescricao}</p>
                      <br/>
                      <p><strong>Preço: R$</strong> ${produtoPreco}</p>
                    </div>
                    <div class=card-footer bg-transparent text-center row"
                        <button type="button" class="btn btn-outline-warning btn-sm col" id="comprar-btn">Comprar Produto
                        <button type="button" class="btn btn-outline-warning btn-sm col offset-md-1" id="editar-btn">Editar Produto</button>
                    </div>
               </div>     
         </div>
        `;

        cards.push(card);
        }
    }else if (produtos.length < 1 && cards.length < 1) {
        cards.push(errorMessage);
    }

    return cards;
}

// Função que cria um novo produto
async function criarNovoProduto(produto) {
    var result = false;

    await fetch('', {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(_ => result = true)
    .catch(_ => result = false);

    return result;
}


// função Atualizar produto
async function atualizarProduto(id, produto) {
    var result = false;

    await fetch(``, {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(_ => result = true)
    .catch(_ => result = false);

    return result;
}

// Função para obter um único produto
async function buscarProduto(id) {
    var produtos = [];

    await fetch('', {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => produtos = data)
    .catch(_ => {});

    if (produtos.length > 0) {
        for(const index in produtos) {
            var produto = produtos[index];

            if (produto.id == id) {
                console.log("Produto encontrado!");
                return {
                    "nome": produto.nome,
                    "imageURL": produto.imageURL,
                    "preco": produto.preco,
                    "descricao": produto.descricao
                };
            }
        }
    }
    return {};
}
