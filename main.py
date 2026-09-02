from flask import Flask, render_template, jsonify, request

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

    with open("investimentos.json", "w", encoding="utf-8") as f:
        import json
        json.dump(investimento, f, ensure_ascii=False, indent=4)

    return jsonify({
        "status": "sucesso",
        "investimento": investimento
    })

@app.route("/investimentos/ativos")
def ativos():

    with open("investimentos.json", "r", encoding="utf-8") as f:
        infos = f.read()

    return infos


app.run(debug=True)