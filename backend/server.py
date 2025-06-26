# server.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz           # PyMuPDF
import re

app = FastAPI()

# ————————————————————————————————————————
# CORS (libera o front-end em http://localhost:5173)
# ————————————————————————————————————————
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mapas de nomes → ticker
FUNDOS = {
    "FII MAXI REN":      "MXRF11",
    "MAXI RENDA FII":    "MXRF11",
    "KINEA RENDA IMOB":  "KNRI11",
    "FII KINEA RENDA":   "KNRI11",
    # adicione outros conforme precisar
}

# ————————————————————————————————————————
# função que extrai os dados do PDF
# ————————————————————————————————————————
def parse_pdf(content: bytes) -> dict:
    doc   = fitz.open("pdf", content)
    texto = "\n".join(page.get_text() for page in doc)
    texto = re.sub(r"[ \t]+", " ", texto)             # normaliza espaços

    # 1. Data da nota
    data_match = re.search(
        r"Data\s+preg[aã]o\s+(\d{2}/\d{2}/\d{4})",
        texto, re.IGNORECASE
    )
    data = data_match.group(1) if data_match else ""

    # 2. Tipo de operação (compra/venda)
    tipo = "venda" if re.search(r"\sV\s", texto) else "compra"

    # 3. Ativo (via dicionário FUNDOS)
    ativo = ""
    for nome, ticker in FUNDOS.items():
        if nome in texto:
            ativo = ticker
            break

    # 4. Quantidade & Preço  (linha “Bovespa VIS V 1 9,29 …”)
    negocio = re.search(
        r"Bovespa\s+\S+\s+V\s+(\d+)\s+([\d,]+)",
        texto
    )
    quantidade = int(negocio.group(1)) if negocio else 0
    preco      = float(negocio.group(2).replace(",", ".")) if negocio else 0.0

    # 5. Taxas  (“Corretagem / Despesas… Total 0,00 D”)
    taxas_match = re.search(
        r"Corretagem / Despesas.*?Total\s+([\d,]+)\s+D",
        texto, re.DOTALL
    )
    taxas = float(taxas_match.group(1).replace(",", ".")) if taxas_match else 0.0

    return {
        "data":        data,
        "tipo":        tipo,
        "ativo":       ativo,
        "quantidade":  quantidade,
        "preco":       preco,
        "taxas":       taxas
    }

# ————————————————————————————————————————
# endpoint /importar-nota
# ————————————————————————————————————————
@app.post("/importar-nota")
async def importar_nota(file: UploadFile = File(...)):
    try:
        content = await file.read()
        dados = parse_pdf(content)
        return dados
    except Exception as e:
        return {"erro": f"Falha ao processar PDF: {e}"}
