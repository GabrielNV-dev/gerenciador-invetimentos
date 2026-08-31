const requisicao = fetch("http://127.0.0.1:5000/investimentos/ativos");

requisicao.then(resposta => resposta.json())
.then(dados => {
    if (dados.length == 0){} 
    else {}
position: fixed;
    right: 20px;
    bottom: 20px;
})
.catch(erro => {console.error("Erro na requisição:", erro);});

