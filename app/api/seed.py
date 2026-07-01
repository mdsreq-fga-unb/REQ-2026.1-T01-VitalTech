import json
import os
import datetime
from passlib.hash import bcrypt
from database import SessionLocal, Base, engine
from models import Usuario, Residente

def run_seed():
    db = SessionLocal()
    
    mock_file = os.path.join(os.path.dirname(__file__), "..", "backend", "mock", "db.json")
    with open(mock_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Usuarios
    for user_data in data.get("usuarios", []):
        existing = db.query(Usuario).filter(Usuario.login == user_data["login"]).first()
        if not existing:
            senha_hash = bcrypt.hash(user_data.get("senha", "123456"))
            created_at_str = user_data.get("createdAt")
            created_at = datetime.datetime.fromisoformat(created_at_str.replace("Z", "+00:00")) if created_at_str else datetime.datetime.now(datetime.timezone.utc)
            
            user = Usuario(
                nome=user_data["nome"],
                login=user_data["login"],
                senha_hash=senha_hash,
                perfil=user_data["perfil"],
                ativo=user_data.get("ativo", True),
                created_at=created_at,
                created_by=user_data.get("createdBy"),
            )
            db.add(user)
    
    # Residentes
    for res_data in data.get("residentes", []):
        # We use a dummy CPF for seed if not provided to bypass nullable=False constraint
        dummy_cpf = f"0000000000{res_data['id']}"[-11:]
        existing = db.query(Residente).filter(Residente.cpf == dummy_cpf).first()
        if not existing:
            created_at_str = res_data.get("createdAt")
            created_at = datetime.datetime.fromisoformat(created_at_str.replace("Z", "+00:00")) if created_at_str else datetime.datetime.now(datetime.timezone.utc)
            
            res = Residente(
                nome=res_data["nome"],
                data_nascimento="1950-01-01",  # dummy data for seed since db.json lacks it
                cpf=dummy_cpf,                 # dummy data for seed
                quarto=res_data.get("quarto", ""),
                setor=res_data.get("setor", ""),
                grau_dependencia="Independente", # dummy data for seed
                responsavel_legal="Responsavel Default", # dummy data for seed
                dados_clinicos=res_data.get("diagnostico", ""),
                is_ativo=res_data.get("isAtivo", True),
                created_at=created_at,
            )
            db.add(res)
    
    db.commit()
    db.close()
    print("Seed finalizado.")

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    run_seed()
