FAIXAS_CLINICAS = {
    "pressao_sistolica": {"min": 60, "max": 250},
    "pressao_diastolica": {"min": 30, "max": 160},
    "frequencia_cardiaca": {"min": 30, "max": 220},
    "temperatura": {"min": 34, "max": 42},
    "glicemia": {"min": 20, "max": 600},
}

import unicodedata

def normalize_search_text(value: str) -> str:
    text = (value or "").strip().lower()
    nfkd = unicodedata.normalize("NFD", text)
    return "".join(c for c in nfkd if not unicodedata.combining(c))

def ocorrencia_exige_notificacao(tipo_ocorrencia, gravidade, descricao) -> bool:
    texto = normalize_search_text(f"{tipo_ocorrencia} {gravidade} {descricao}")
    return (
        ("queda" in texto and ("lesao" in texto or "grave" in texto))
        or "tentativa de suicidio" in texto
        or "tentativa suicidio" in texto
        or "autoexterminio" in texto
    )
