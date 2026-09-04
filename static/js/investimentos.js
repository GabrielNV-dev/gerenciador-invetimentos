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

            Object.entries(dados).forEach(([nome, investimento]) => {
                let alvo = document.createElement("div")
                alvo.classList.add("investimento")

                if (investimento.nome) { // troque para investimento.nome se for o caso
                    const titulo = document.createElement("h3");
                    titulo.textContent = investimento.nome;
                    titulo.classList.add("inv-titulo");
                    alvo.appendChild(titulo);
                }
                if (investimento.tipo) {
                    const badge = document.createElement("span");
                    badge.textContent = investimento.tipo;
                    badge.classList.add("inv-badge", "tipo");
                    alvo.appendChild(badge);
                }

                // 2. Container para agrupar as informações e deixar alinhado
                const infosContainer = document.createElement("div");
                infosContainer.classList.add("inv-detalhes");

                // Array de configuração para criar os campos de forma limpa
                const campos = [
                    { cond: investimento.vencimento, label: "Vencimento", valor: `${investimento.vencimento}`, classe: "data" },
                    { cond: investimento.valor, label: "Valor", valor: investimento.tipo === "cripto" ? `BTC ${investimento.valor}` : `R$ ${investimento.valor}`, classe: "valor" },
                    { cond: investimento.juros, label: "Juros", valor: investimento.juros, classe: "juros" },
                    { cond: investimento.data, label: "Data", valor: investimento.data, classe: "data" },
                    { cond: investimento.periodicidade, label: "Periodic.", valor: investimento.periodicidade, classe: "periodicidade" },
                    { cond: investimento.amortizacao, label: "Amortização", valor: investimento.amortizacao, classe: "amortizacao" }
                ];

                // Gera as linhas separando Label de Dado
                campos.forEach(campo => {
                    if (campo.cond) {
                        const linha = document.createElement("div");
                        linha.classList.add("inv-linha", campo.classe);
                        // O segredo do CSS está aqui: separar rótulo e valor em spans
                        linha.innerHTML = `<span class="inv-label">${campo.label}</span> <span class="inv-dado">${campo.valor}</span>`;
                        infosContainer.appendChild(linha);
                    }
                });
                alvo.appendChild(infosContainer);

                // 3. O Famoso Gráfico (Placeholder estético para os futuros cálculos)
                const graficoContainer = document.createElement("div");
                graficoContainer.classList.add("inv-grafico-area");
                graficoContainer.innerHTML = `
                    <div class="grafico-header">
                        <span class="inv-label">Progresso / Rentabilidade</span>
                        <span class="inv-dado destaque">+0.00%</span>
                    </div>
                    <div class="grafico-barra-fundo">
                        <div class="grafico-barra-preenchimento"></div>
                    </div>
                `;
                alvo.appendChild(graficoContainer);

                document.getElementById("centralInvestimentos").appendChild(alvo);
            });
        }



    }).catch(erro => { console.error("Erro na requisição:", erro); });

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

    const nome = document.getElementById("nome").value || null;
    const data = document.getElementById("data").value || null;
    const tipo = document.getElementById("tipo").value || null;
    const valor = document.getElementById("valor").value || null;
    const juros = document.getElementById("juros").value || null;
    const periodicidade = document.getElementById("periodicidade").value || null;
    const amortizacao = document.getElementById("amortizacao").value || null;

    const novoInvestimento = {
        nome: nome,
        data: data,
        tipo: tipo,
        valor: valor,
        juros: juros,
        periodicidade: periodicidade,
        amortizacao: amortizacao
    };

    fetch("http://127.0.0.1:5000/investimentos/ativos/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoInvestimento)
    })
        .then(response => response.json())
        .then(data => { location.reload(); })
        .catch(erro => console.error("Erro ao salvar:", erro));
    overlay.classList.remove("aberto");
});