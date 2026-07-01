from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from database import get_db
from models import Usuario

router = APIRouter()

@router.post("/auth/login")
def login(payload: dict, db: Session = Depends(get_db)):
    login_value = (payload.get("login") or "").strip()
    senha = payload.get("senha") or ""

    if not login_value or not senha:
        raise HTTPException(status_code=400, detail="Login e senha sao obrigatorios.")

    usuario = db.query(Usuario).filter(Usuario.login == login_value, Usuario.ativo == True).first()

    if not usuario or not bcrypt.verify(senha, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="Credenciais invalidas.")

    return {
        "token": f"mock-token-{usuario.id}",
        "perfil": usuario.perfil,
        "user": {
            "id": usuario.id,
            "nome": usuario.nome,
            "login": usuario.login,
            "perfil": usuario.perfil,
            "ativo": usuario.ativo,
        },
    }

@router.post("/auth/logout")
def logout():
    return Response(status_code=204)
