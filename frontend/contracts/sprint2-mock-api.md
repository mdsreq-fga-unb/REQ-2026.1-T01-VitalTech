# Sprint 2 - Mock API Contract

This contract supports Sprint 2 integration before the real backend is available.

## Authentication

### POST /auth/login

Request:

```json
{
  "login": "gestor",
  "senha": "123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login realizado com sucesso.",
  "data": {
    "token": "session_mock_token",
    "user": {
      "id": "usr_gestor",
      "nomeCompleto": "Gestor VitalTech",
      "login": "gestor",
      "perfil": "gestor",
      "permissoes": ["usuarios:create", "usuarios:list", "residentes:create", "residentes:list"]
    }
  }
}
```

Error response:

```json
{
  "success": false,
  "message": "Login ou senha invalidos.",
  "error": {
    "code": "INVALID_CREDENTIALS"
  }
}
```

## Users

### GET /usuarios

Returns users visible to a Gestor profile.

### POST /usuarios

Required fields:

- `nomeCompleto`
- `login`
- `perfil`
- `senhaProvisoria`

Business constraints:

- `login` must be unique.
- created users must include `createdAt` and `createdBy`.

## Residents

### GET /residentes

Returns active residents by default.

### POST /residentes

Required fields:

- `nomeCompleto`
- `dataNascimento`
- `cpf`
- `grauDependencia`
- `responsavelLegal`

Business constraints:

- residents start with `isAtivo: true`.
- resident data must include `createdAt` and `createdBy`.
- schema must remain compatible with future backend consolidation.

