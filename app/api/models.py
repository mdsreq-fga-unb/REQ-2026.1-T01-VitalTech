from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, JSON, Float
from database import Base
import datetime

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    login = Column(String(100), nullable=False, unique=True, index=True)
    senha_hash = Column(String(255), nullable=False)
    perfil = Column(String(50), nullable=False)
    especialidade = Column(String(255), nullable=True, default="")
    registro = Column(String(100), nullable=True, default="")
    foto = Column(Text, nullable=True)
    ativo = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    created_by = Column(String(100), nullable=True)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(100), nullable=True)
    password_reset_at = Column(DateTime, nullable=True)
    password_reset_by = Column(String(100), nullable=True)
    revoked_at = Column(DateTime, nullable=True)
    revoked_by = Column(String(100), nullable=True)

class Residente(Base):
    __tablename__ = "residentes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    data_nascimento = Column(String(20), nullable=False)  # mantenha como string "YYYY-MM-DD", igual ao frontend envia
    cpf = Column(String(20), nullable=False, unique=True, index=True)
    quarto = Column(String(50), nullable=True, default="")
    setor = Column(String(50), nullable=True, default="")
    grau_dependencia = Column(String(50), nullable=False)
    responsavel_legal = Column(String(255), nullable=False)
    dados_clinicos = Column(Text, nullable=True, default="")
    medicamentos = Column(JSON, nullable=True, default=list)  # lista de {nome, dose, via, frequencia}
    foto = Column(Text, nullable=True)
    is_ativo = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    created_by = Column(String(100), nullable=True)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(100), nullable=True)
    deactivated_at = Column(DateTime, nullable=True)
    deactivated_by = Column(String(100), nullable=True)

class SinaisVitais(Base):
    __tablename__ = "sinais_vitais"
    id = Column(Integer, primary_key=True, autoincrement=True)
    residente_id = Column(String(64), nullable=False, index=True)
    pressao_arterial = Column(String(20), nullable=True)
    pressao_sistolica = Column(Integer, nullable=True)
    pressao_diastolica = Column(Integer, nullable=True)
    frequencia_cardiaca = Column(Float, nullable=True)
    temperatura = Column(Float, nullable=True)
    glicemia = Column(Float, nullable=True)
    fora_dos_parametros = Column(Boolean, nullable=False, default=False)
    campos_fora_do_parametro = Column(JSON, nullable=True)
    observacoes = Column(Text, nullable=True, default="")
    responsavel_id = Column(String(64), nullable=True)
    responsavel_nome = Column(String(255), nullable=True)
    registrado_em = Column(DateTime, nullable=False)
    tipo_registro = Column(String(50), nullable=False, default="sinais_vitais")

class RotinaAssistencial(Base):
    __tablename__ = "rotinas_assistenciais"
    id = Column(Integer, primary_key=True, autoincrement=True)
    residente_id = Column(String(64), nullable=False, index=True)
    tipo_registro = Column(String(50), nullable=False)  # 'rotina_assistencial' | 'Hidratacao' | 'Higiene'
    dados = Column(JSON, nullable=True)  # payload especifico do tipo (tipoRefeicao, percentualAceitacao, banho, troca, cuidadosBucais, observacoes, etc.)
    responsavel_id = Column(String(64), nullable=True)
    responsavel_nome = Column(String(255), nullable=True)
    registrado_em = Column(DateTime, nullable=False)

class Ocorrencia(Base):
    __tablename__ = "ocorrencias"
    id = Column(Integer, primary_key=True, autoincrement=True)
    residente_id = Column(String(64), nullable=False, index=True)
    tipo_ocorrencia = Column(String(100), nullable=False)
    gravidade = Column(String(50), nullable=False)
    data_hora = Column(String(30), nullable=False)  # string ISO parcial, ex "2026-06-14T15:10"
    descricao = Column(Text, nullable=False)
    medidas_adotadas = Column(Text, nullable=False)
    comunicado_familia = Column(String(20), nullable=True, default="")
    exige_notificacao = Column(Boolean, nullable=False, default=False)
    responsavel_id = Column(String(64), nullable=True)
    responsavel_nome = Column(String(255), nullable=True)
    registrado_em = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=True)
    updated_by = Column(String(100), nullable=True)
