// funções usadas para fazer interface com o front-end

// Adicione os cards ao contêiner de card
$("#card-container").ready(async function() {
    var cards = await buscarTodosProdutos();

    for(const index in cards) {
        var card = cards[index];
        $("#card-container").append(card);
    }
});


// Alertar o usuário quando ele "comprar" um produto
$("#card-container").on("click", "#comprar-btn", function() {
    alert("Obrigado por apoiar diegoteixeirapereira@hotmail.com");
});

// Lidar com alterações de página para add-produto.html
$("#add-produto").on("click", function() {
    window.location.href = "add-produto.html";
});

// Lidar com o envio do formulário para add-produto.html
$("#produto-form").submit(async function(form) {
    form.preventDefault();

    const nome = $("#produtoNomeEntrada").val();
    const url = $("#produtoImageUrlEntrada").val();
    const preco = $("#produtoPrecoEntrada").val();
    const descricao = $("#produtoDescricaoEntrada").val();

    const produto = {
        "nome": nome,
        "imageURL": url,
        "preco": preco,
        "descricao": descricao
    };

    var result = await criarNovoProduto(produto);

    if (result) {
        alert("O produto foi adicionado!");
        window.location.href = "index.html";
    } else {
        alert("Falha ao adicionar produto, desculpe");
    }
});

// Preencha o formulário de atualização com os valores do produto original
$("#atualizar-form").ready(async function() {
    const id = window.location.href.split("?id=").pop();
    var produto = await buscarProduto(id);

    $("#produtoNomeEntrada").val(produto.nome);
    $("#produtoImageUrlEntrada").val(produto.imageURL);
    $("#produtoPrecoEntrada").val(produto.preco);
    $("#produtoDescricaoEntrada").val(produto.descricao);
});

// Lidar com o envio do formulário para atualizar-produto.html
$("#atualizar-form").submit(async function(form) {
    form.preventDefault();

    const id = window.location.href.split("?id=").pop();
    const nome = $("#produtoNomeEntrada").val();
    const url = $("#produtoImageUrlEntrada").val();
    const preco = $("#produtoPrecoEntrada").val();
    const descricao = $("#produtoDescricaoEntrada").val();

    const produto = {
        "nome": nome,
        "imageURL": url,
        "preco": preco,
        "descricao": descricao
    };

    var result = await atualizarProduto(id, produto);

    if (result) {
        alert("Produto foi atualizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Falha ao atualizar produto, desculpe");
    }
});


// Lidar com a criação do URL do produto de atualização
$("$card-container").on("click", "#editar-btn", function() {
    
    // Obtenha a id do produto
    var produtoID = $(this).parent().parent().parent().attr("id");
    var ulr = "atualizar-produto.html" + "?id=" + produtoID;
    window.location.href = url;
});