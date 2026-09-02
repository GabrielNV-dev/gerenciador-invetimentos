const requisicao = fetch("http://127.0.0.1:5000/investimentos/ativos");

requisicao.then(resposta => resposta.json())
    .then(dados => {

        if (dados.length == 0) {
            document.getElementById("cadastrar-inv").style.padding = "20px";

        }
        else {
            document.getElementById("cadastrar-inv").style.position = "fixed";
            document.getElementById("cadastrar-inv").style.right = "20px";
            document.getElementById("cadastrar-inv").style.bottom = "20px";


        }

        const abrirFormulario = document.getElementById("cadastrar-inv");
        const fecharFormulario = document.getElementById("fechar-form");
        const overlay = document.getElementById("form-overlay");

        abrirFormulario.addEventListener("click", function () {
            overlay.classList.add("aberto");
        });

        fecharFormulario.addEventListener("click", function () {
            overlay.classList.remove("aberto");
        });

        const investimentos = {};
        const formulario = document.getElementById("form-investimento");

        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const data = document.getElementById("data").value;
            const tipo = document.getElementById("tipo").value;
            const valor = document.getElementById("valor").value;
            const juros = document.getElementById("juros").value;
            const periodicidade = document.getElementById("periodicidade").value;
            const amortizacao = document.getElementById("amortizacao").value;

            investimentos[nome] = {
                tipo: tipo,
                valor: valor,
                juros: juros,
                periodicidade: periodicidade,
                amortizacao: amortizacao
            };

            console.log(investimentos);
            fetch("/investimentos/ativos/entry", {method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(investimentos)
            })
                .then(response => response.json())
                .then(data => {console.log(data);});
        });

    })
    .catch(erro => { console.error("Erro na requisição:", erro); });

