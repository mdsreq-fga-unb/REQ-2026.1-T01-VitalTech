import datetime
from pydantic import BaseModel, field_validator, field_serializer, Field, ConfigDict
from typing import Optional, List, Dict, Any

def _to_utc_iso(value: Optional[datetime.datetime]) -> Optional[str]:
    if value is None:
        return None
    if value.tzinfo is None:
        value = value.replace(tzinfo=datetime.timezone.utc)
    return value.isoformat().replace("+00:00", "Z")

class UsuarioCreate(BaseModel):
    nome: str
    login: str
    senha: str
    perfil: str
    especialidade: Optional[str] = ""
    registro: Optional[str] = ""
    foto: Optional[str] = None
    createdAt: Optional[datetime.datetime] = None
    createdBy: Optional[str] = None

    @field_validator("nome", "login", "senha", "perfil")
    @classmethod
    def not_blank(cls, v):
        if not v or not v.strip():
            raise ValueError("campo obrigatorio nao pode ser vazio")
        return v

class UsuarioRead(BaseModel):
    id: int
    nome: str
    login: str
    perfil: str
    especialidade: str
    registro: str
    foto: Optional[str]
    ativo: bool
    createdAt: Optional[datetime.datetime] = Field(None, validation_alias="created_at")
    createdBy: Optional[str] = Field(None, validation_alias="created_by")
    updatedAt: Optional[datetime.datetime] = Field(None, validation_alias="updated_at")
    updatedBy: Optional[str] = Field(None, validation_alias="updated_by")

    @field_serializer("createdAt", "updatedAt")
    def serialize_utc(self, v, _info):
        return _to_utc_iso(v)

    class Config:
        from_attributes = True
        populate_by_name = True

class ResidenteCreate(BaseModel):
    nome: str
    dataNascimento: str
    cpf: str
    quarto: Optional[str] = ""
    setor: Optional[str] = ""
    grauDependencia: str
    responsavelLegal: str
    dadosClinicos: Optional[str] = ""
    medicamentos: Optional[List[Dict[str, Any]]] = []
    foto: Optional[str] = None
    createdAt: Optional[datetime.datetime] = None
    createdBy: Optional[str] = None

    @field_validator("nome", "dataNascimento", "cpf", "grauDependencia", "responsavelLegal")
    @classmethod
    def not_blank(cls, v):
        if not v or not str(v).strip():
            raise ValueError("campo obrigatorio nao pode ser vazio")
        return v

class ResidenteRead(BaseModel):
    id: int
    nome: str
    dataNascimento: str = Field(..., validation_alias="data_nascimento")
    cpf: str
    quarto: str
    setor: str
    grauDependencia: str = Field(..., validation_alias="grau_dependencia")
    responsavelLegal: str = Field(..., validation_alias="responsavel_legal")
    dadosClinicos: str = Field(..., validation_alias="dados_clinicos")
    medicamentos: List[Dict[str, Any]]
    foto: Optional[str]
    isAtivo: bool = Field(..., validation_alias="is_ativo")
    createdAt: Optional[datetime.datetime] = Field(None, validation_alias="created_at")
    createdBy: Optional[str] = Field(None, validation_alias="created_by")
    updatedAt: Optional[datetime.datetime] = Field(None, validation_alias="updated_at")
    updatedBy: Optional[str] = Field(None, validation_alias="updated_by")

    @field_serializer("createdAt", "updatedAt")
    def serialize_utc(self, v, _info):
        return _to_utc_iso(v)

    class Config:
        from_attributes = True
        populate_by_name = True

class SinaisVitaisCreate(BaseModel):
    residenteId: str
    pressaoArterial: str
    pressaoSistolica: Optional[int] = None
    pressaoDiastolica: Optional[int] = None
    frequenciaCardiaca: float
    temperatura: float
    glicemia: float
    foraDosParametros: Optional[bool] = False
    camposForaDoParametro: Optional[List[Dict[str, Any]]] = []
    observacoes: Optional[str] = ""
    confirmarForaDoParametro: Optional[bool] = False
    responsavelId: Optional[str] = None
    responsavelNome: Optional[str] = None
    registradoEm: Optional[datetime.datetime] = None
    data: Optional[str] = None
    horario: Optional[str] = None
    createdAt: Optional[datetime.datetime] = None
    createdBy: Optional[str] = None

    @field_validator("residenteId", "pressaoArterial")
    @classmethod
    def not_blank(cls, v):
        if not v or not str(v).strip():
            raise ValueError("campo obrigatorio nao pode ser vazio")
        return v

class SinaisVitaisRead(BaseModel):
    id: int
    residenteId: str = Field(..., validation_alias="residente_id")
    pressaoArterial: str = Field(..., validation_alias="pressao_arterial")
    pressaoSistolica: Optional[int] = Field(None, validation_alias="pressao_sistolica")
    pressaoDiastolica: Optional[int] = Field(None, validation_alias="pressao_diastolica")
    frequenciaCardiaca: float = Field(..., validation_alias="frequencia_cardiaca")
    temperatura: float
    glicemia: float
    foraDosParametros: bool = Field(..., validation_alias="fora_dos_parametros")
    camposForaDoParametro: Optional[List[Dict[str, Any]]] = Field(None, validation_alias="campos_fora_do_parametro")
    observacoes: Optional[str] = ""
    responsavelId: Optional[str] = Field(None, validation_alias="responsavel_id")
    responsavelNome: Optional[str] = Field(None, validation_alias="responsavel_nome")
    registradoEm: datetime.datetime = Field(..., validation_alias="registrado_em")
    tipoRegistro: str = Field(..., validation_alias="tipo_registro")

    @field_serializer("registradoEm")
    def serialize_utc(self, v, _info):
        return _to_utc_iso(v)

    class Config:
        from_attributes = True
        populate_by_name = True

class RotinaAssistencialCreate(BaseModel):
    model_config = ConfigDict(extra="allow")

    residenteId: str
    tipoRegistro: str
    observacoes: Optional[str] = ""
    responsavelId: Optional[str] = None
    responsavelNome: Optional[str] = None
    registradoEm: Optional[datetime.datetime] = None
    data: Optional[str] = None
    horario: Optional[str] = None
    createdAt: Optional[datetime.datetime] = None
    createdBy: Optional[str] = None

    @field_validator("residenteId", "tipoRegistro")
    @classmethod
    def not_blank(cls, v):
        if not v or not str(v).strip():
            raise ValueError("campo obrigatorio nao pode ser vazio")
        return v

class RotinaAssistencialRead(BaseModel):
    id: int
    residenteId: str = Field(..., validation_alias="residente_id")
    tipoRegistro: str = Field(..., validation_alias="tipo_registro")
    dados: Dict[str, Any]
    responsavelId: Optional[str] = Field(None, validation_alias="responsavel_id")
    responsavelNome: Optional[str] = Field(None, validation_alias="responsavel_nome")
    registradoEm: datetime.datetime = Field(..., validation_alias="registrado_em")

    @field_serializer("registradoEm")
    def serialize_utc(self, v, _info):
        return _to_utc_iso(v)

    class Config:
        from_attributes = True
        populate_by_name = True

class OcorrenciaCreate(BaseModel):
    residenteId: str
    tipoOcorrencia: str
    gravidade: str
    dataHora: str
    descricao: str
    medidasAdotadas: str
    comunicadoFamilia: Optional[str] = ""
    responsavelId: Optional[str] = None
    responsavelNome: Optional[str] = None
    registradoEm: Optional[datetime.datetime] = None

    @field_validator("residenteId", "tipoOcorrencia", "gravidade", "dataHora", "descricao", "medidasAdotadas")
    @classmethod
    def not_blank(cls, v):
        if not v or not str(v).strip():
            raise ValueError("campo obrigatorio nao pode ser vazio")
        return v

class OcorrenciaRead(BaseModel):
    id: int
    residenteId: str = Field(..., validation_alias="residente_id")
    tipoOcorrencia: str = Field(..., validation_alias="tipo_ocorrencia")
    gravidade: str
    dataHora: str = Field(..., validation_alias="data_hora")
    descricao: str
    medidasAdotadas: str = Field(..., validation_alias="medidas_adotadas")
    comunicadoFamilia: str = Field(..., validation_alias="comunicado_familia")
    exigeNotificacao: bool = Field(..., validation_alias="exige_notificacao")
    responsavelId: Optional[str] = Field(None, validation_alias="responsavel_id")
    responsavelNome: Optional[str] = Field(None, validation_alias="responsavel_nome")
    registradoEm: datetime.datetime = Field(..., validation_alias="registrado_em")
    updatedAt: Optional[datetime.datetime] = Field(None, validation_alias="updated_at")
    updatedBy: Optional[str] = Field(None, validation_alias="updated_by")

    @field_serializer("registradoEm", "updatedAt")
    def serialize_utc(self, v, _info):
        return _to_utc_iso(v)

    class Config:
        from_attributes = True
        populate_by_name = True
