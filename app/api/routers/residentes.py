from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import Residente
from schemas import ResidenteCreate, ResidenteRead
import datetime

router = APIRouter()

@router.post("/residentes", response_model=ResidenteRead, status_code=201)
def criar_residente(payload: ResidenteCreate, db: Session = Depends(get_db)):
    duplicado = db.query(Residente).filter(Residente.cpf == payload.cpf).first()
    if duplicado:
        raise HTTPException(status_code=409, detail="CPF ja cadastrado.")

    residente = Residente(
        nome=payload.nome,
        data_nascimento=payload.dataNascimento,
        cpf=payload.cpf,
        quarto=payload.quarto or "",
        setor=payload.setor or "",
        grau_dependencia=payload.grauDependencia,
        responsavel_legal=payload.responsavelLegal,
        dados_clinicos=payload.dadosClinicos or "",
        medicamentos=payload.medicamentos or [],
        foto=payload.foto,
        is_ativo=True,
    )
    db.add(residente)
    db.commit()
    db.refresh(residente)
    return residente

@router.get("/residentes", response_model=List[ResidenteRead])
def listar_residentes(cpf: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Residente)
    if cpf:
        query = query.filter(Residente.cpf == cpf)
    return query.all()

@router.put("/residentes/{id}", response_model=ResidenteRead)
def atualizar_residente(id: int, payload: ResidenteCreate, db: Session = Depends(get_db)):
    residente = db.query(Residente).filter(Residente.id == id).first()
    if not residente:
        raise HTTPException(status_code=404, detail="Residente nao encontrado")
    
    duplicado = db.query(Residente).filter(Residente.cpf == payload.cpf, Residente.id != id).first()
    if duplicado:
        raise HTTPException(status_code=409, detail="CPF ja cadastrado.")

    residente.nome = payload.nome
    residente.data_nascimento = payload.dataNascimento
    residente.cpf = payload.cpf
    residente.quarto = payload.quarto or ""
    residente.setor = payload.setor or ""
    residente.grau_dependencia = payload.grauDependencia
    residente.responsavel_legal = payload.responsavelLegal
    residente.dados_clinicos = payload.dadosClinicos or ""
    residente.medicamentos = payload.medicamentos or []
    residente.foto = payload.foto
    residente.updated_at = datetime.datetime.now(datetime.timezone.utc)
    
    db.commit()
    db.refresh(residente)
    return residente
