const requisicao = fetch("http://127.0.0.1:5000/investimentos/ativos");

requisicao.then(resposta => resposta.json())
.then(dados => {
    console.log(dados);

})
.catch(erro => {console.error("Erro na requisição:", erro);});

