from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from typing import List, Optional
from database import get_db
from models import Usuario
from schemas import UsuarioCreate, UsuarioRead
import datetime

router = APIRouter()

@router.post("/usuarios", response_model=UsuarioRead, status_code=201)
def criar_usuario(payload: UsuarioCreate, db: Session = Depends(get_db)):
    duplicado = db.query(Usuario).filter(Usuario.login == payload.login).first()
    if duplicado:
        raise HTTPException(status_code=409, detail="Login ja cadastrado.")

    senha_hash = bcrypt.hash(payload.senha)
    usuario = Usuario(
        nome=payload.nome,
        login=payload.login,
        senha_hash=senha_hash,
        perfil=payload.perfil,
        especialidade=payload.especialidade or "",
        registro=payload.registro or "",
        foto=payload.foto,
        ativo=True,
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

@router.get("/usuarios", response_model=List[UsuarioRead])
def listar_usuarios(login: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Usuario)
    if login:
        query = query.filter(Usuario.login == login)
    return query.all()

@router.put("/usuarios/{id}", response_model=UsuarioRead)
def atualizar_usuario(id: int, payload: UsuarioCreate, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario nao encontrado")
    
    duplicado = db.query(Usuario).filter(Usuario.login == payload.login, Usuario.id != id).first()
    if duplicado:
        raise HTTPException(status_code=409, detail="Login ja cadastrado.")

    if payload.senha:
        usuario.senha_hash = bcrypt.hash(payload.senha)

    usuario.nome = payload.nome
    usuario.login = payload.login
    usuario.perfil = payload.perfil
    usuario.especialidade = payload.especialidade or ""
    usuario.registro = payload.registro or ""
    usuario.foto = payload.foto
    usuario.updated_at = datetime.datetime.now(datetime.timezone.utc)
    
    db.commit()
    db.refresh(usuario)
    return usuario
