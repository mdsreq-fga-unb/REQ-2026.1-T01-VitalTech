from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import SinaisVitais, RotinaAssistencial, Ocorrencia
from schemas import (
    SinaisVitaisCreate, SinaisVitaisRead,
    RotinaAssistencialCreate, RotinaAssistencialRead,
    OcorrenciaCreate, OcorrenciaRead
)
from business_rules import ocorrencia_exige_notificacao
import datetime

router = APIRouter()

@router.post("/sinaisVitais", response_model=SinaisVitaisRead, status_code=201)
def criar_sinais_vitais(payload: SinaisVitaisCreate, db: Session = Depends(get_db)):
    registro = SinaisVitais(
        residente_id=payload.residenteId,
        pressao_arterial=payload.pressaoArterial,
        pressao_sistolica=payload.pressaoSistolica,
        pressao_diastolica=payload.pressaoDiastolica,
        frequencia_cardiaca=payload.frequenciaCardiaca,
        temperatura=payload.temperatura,
        glicemia=payload.glicemia,
        fora_dos_parametros=bool(payload.foraDosParametros),
        campos_fora_do_parametro=payload.camposForaDoParametro or [],
        observacoes=payload.observacoes or "",
        responsavel_id=payload.responsavelId,
        responsavel_nome=payload.responsavelNome,
        registrado_em=payload.registradoEm or datetime.datetime.now(datetime.timezone.utc),
        tipo_registro="sinais_vitais",
    )
    db.add(registro)
    db.commit()
    db.refresh(registro)
    return registro

@router.get("/sinaisVitais", response_model=List[SinaisVitaisRead])
def listar_sinais_vitais(residenteId: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(SinaisVitais)
    if residenteId:
        query = query.filter(SinaisVitais.residente_id == residenteId)
    return query.all()

@router.post("/rotinasAssistenciais", response_model=RotinaAssistencialRead, status_code=201)
def criar_rotina(payload: RotinaAssistencialCreate, db: Session = Depends(get_db)):
    registro = RotinaAssistencial(
        residente_id=payload.residenteId,
        tipo_registro=payload.tipoRegistro,
        dados=payload.model_extra or {},
        responsavel_id=payload.responsavelId,
        responsavel_nome=payload.responsavelNome,
        registrado_em=payload.registradoEm or datetime.datetime.now(datetime.timezone.utc),
    )
    db.add(registro)
    db.commit()
    db.refresh(registro)
    return registro

@router.get("/rotinasAssistenciais", response_model=List[RotinaAssistencialRead])
def listar_rotinas(residenteId: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(RotinaAssistencial)
    if residenteId:
        query = query.filter(RotinaAssistencial.residente_id == residenteId)
    return query.all()

@router.post("/ocorrencias", response_model=OcorrenciaRead, status_code=201)
def criar_ocorrencia(payload: OcorrenciaCreate, db: Session = Depends(get_db)):
    exige = ocorrencia_exige_notificacao(payload.tipoOcorrencia, payload.gravidade, payload.descricao)
    registro = Ocorrencia(
        residente_id=payload.residenteId,
        tipo_ocorrencia=payload.tipoOcorrencia,
        gravidade=payload.gravidade,
        data_hora=payload.dataHora,
        descricao=payload.descricao,
        medidas_adotadas=payload.medidasAdotadas,
        comunicado_familia=payload.comunicadoFamilia or "",
        exige_notificacao=exige,
        responsavel_id=payload.responsavelId,
        responsavel_nome=payload.responsavelNome,
        registrado_em=payload.registradoEm or datetime.datetime.now(datetime.timezone.utc),
    )
    db.add(registro)
    db.commit()
    db.refresh(registro)
    return registro

@router.put("/ocorrencias/{id}", response_model=OcorrenciaRead)
def atualizar_ocorrencia(id: int, payload: OcorrenciaCreate, db: Session = Depends(get_db)):
    registro = db.query(Ocorrencia).filter(Ocorrencia.id == id).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Ocorrencia nao encontrada")
    
    exige = ocorrencia_exige_notificacao(payload.tipoOcorrencia, payload.gravidade, payload.descricao)
    
    registro.tipo_ocorrencia = payload.tipoOcorrencia
    registro.gravidade = payload.gravidade
    registro.data_hora = payload.dataHora
    registro.descricao = payload.descricao
    registro.medidas_adotadas = payload.medidasAdotadas
    registro.comunicado_familia = payload.comunicadoFamilia or ""
    registro.exige_notificacao = exige
    registro.updated_at = datetime.datetime.now(datetime.timezone.utc)
    # assumindo que payload.responsavelNome pode atualizar updatedBy, ou deixamos para o service
    db.commit()
    db.refresh(registro)
    return registro

@router.get("/ocorrencias", response_model=List[OcorrenciaRead])
def listar_ocorrencias(residenteId: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Ocorrencia)
    if residenteId:
        query = query.filter(Ocorrencia.residente_id == residenteId)
    return query.all()
