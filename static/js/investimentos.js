const requisicao = fetch("http://127.0.0.1:5000/investimentos/ativos");

requisicao.then(resposta => resposta.json())
    .then(dados => {
        if (Object.keys(dados).length === 0) {
            document.getElementById("cadastrar-inv").style.padding = "20px";
            document.getElementById("centralInvestimentos").style.display = "none";

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

            fetch("/investimentos/ativos/entry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(investimentos)
            })
                .then(response => response.json())
                .then(data => { console.log(data); });

        });

        Object.entries(dados).forEach(([nome, investimento]) => {
            alvo = document.createElement("div")
            alvo.classList.add("investimento")
            document.getElementById("central-investimentos").appendChild(alvo);
        });
    })
    .catch(erro => { console.error("Erro na requisição:", erro); });

