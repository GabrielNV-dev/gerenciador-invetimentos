from flask import Flask, render_template

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


@app.route("/investimentos/ativos")
def ativos():

    with open("investimentos.txt", "r", encoding="utf-8") as f:
        infos = f.read()

    return infos


app.run(debug=True)