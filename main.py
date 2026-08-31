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
def investimento():
    return render_template("html/infos.html")


app.run(debug=True)