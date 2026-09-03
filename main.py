from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

@app.route("/")
def inicio():
    return render_template("html/index.html")

@app.route("/investimentos")
def investimento():
    return render_template("html/investimentos.html")

@app.route("/sobre")
def sobre():
    return render_template("html/sobre.html")

@app.route("/infos")
def infos():
    return render_template("html/infos.html")

@app.route("/investimentos/ativos/entry", methods=["POST"])
def entrada_ativos():
    investimento = request.get_json()
    print(investimento)

    caminho_arquivo = "investimentos.json"
    dados = []

    if os.path.exists(caminho_arquivo):
        try:
            with open(caminho_arquivo, "r", encoding="utf-8") as f:
                conteudo = f.read()
                if conteudo.strip():
                    dados = json.loads(conteudo)

                    if not isinstance(dados, list):
                        dados = [dados]
        except json.JSONDecodeError:
            dados = []

    dados.append(investimento)

    # 3. Salva a lista atualizada no arquivo
    with open(caminho_arquivo, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)

    return jsonify({
        "status": "sucesso",
        "investimento": investimento
    })

@app.route("/investimentos/ativos")
def ativos():

    with open("investimentos.json", "r", encoding="utf-8") as f:
        infos = json.load(f)

    return jsonify(infos)


app.run(debug=True)