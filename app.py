from flask import Flask, render_template, request, redirect, url_for, flash, session
from pathlib import Path
import sqlite3
import secrets
import hmac
import os

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "master_key.db"

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "cambia-esta-clave-antes-de-publicar")


def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS solicitudes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                correo TEXT NOT NULL,
                tipo_proyecto TEXT NOT NULL,
                mensaje TEXT NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)


@app.before_request
def create_csrf_token():
    if "csrf_token" not in session:
        session["csrf_token"] = secrets.token_urlsafe(32)


@app.route("/")
def home():
    return render_template("index.html", csrf_token=session["csrf_token"])


@app.route("/contacto", methods=["POST"])
def contacto():
    token = request.form.get("csrf_token", "")
    if not hmac.compare_digest(token, session.get("csrf_token", "")):
        flash("No se pudo validar el formulario. Inténtalo de nuevo.", "error")
        return redirect(url_for("home") + "#contacto")

    nombre = request.form.get("nombre", "").strip()
    correo = request.form.get("correo", "").strip()
    tipo = request.form.get("tipo_proyecto", "").strip()
    mensaje = request.form.get("mensaje", "").strip()

    if not all([nombre, correo, tipo, mensaje]):
        flash("Completa todos los campos para enviar tu solicitud.", "error")
        return redirect(url_for("home") + "#contacto")

    if len(nombre) > 100 or len(correo) > 150 or len(mensaje) > 2000:
        flash("Revisa la longitud de los campos e inténtalo otra vez.", "error")
        return redirect(url_for("home") + "#contacto")

    if "@" not in correo or "." not in correo.split("@")[-1]:
        flash("Escribe un correo electrónico válido.", "error")
        return redirect(url_for("home") + "#contacto")

    with get_db() as db:
        db.execute(
            """INSERT INTO solicitudes (nombre, correo, tipo_proyecto, mensaje)
               VALUES (?, ?, ?, ?)""",
            (nombre, correo, tipo, mensaje)
        )

    session["csrf_token"] = secrets.token_urlsafe(32)
    flash("¡Gracias! Recibimos tu solicitud y podremos darle seguimiento.", "success")
    return redirect(url_for("home") + "#contacto")


@app.route("/salud")
def salud():
    return {"status": "ok", "empresa": "Master Key"}


init_db()

if __name__ == "__main__":
    app.run(debug=True)
