const usuarios = [
  { id: 1, nomeCompleto: 'Dra. Ana Beatrix', login: 'ana.beatrix', perfil: 'Gestor', especialidade: 'Medicina', registro: 'CRM-123', foto: null },
  { id: 2, nomeCompleto: 'Ricardo Santos', login: 'ricardo.santos', perfil: 'Equipe', especialidade: '', registro: '', foto: null },
  { id: 3, nomeCompleto: 'Mariana Oliveira', login: 'mariana.oliveira', perfil: 'Cuidador', especialidade: '', registro: '', foto: null },
  { id: 4, nomeCompleto: 'Roberto Silva', login: 'roberto.silva', perfil: 'Equipe', especialidade: 'Fisioterapia', registro: 'CREFITO-456', foto: null },
  { id: 5, nomeCompleto: 'Juliana Costa', login: 'juliana.costa', perfil: 'Cuidador', especialidade: '', registro: '', foto: null },
  { id: 6, nomeCompleto: 'Dr. Carlos Mendes', login: 'carlos.mendes', perfil: 'Gestor', especialidade: 'Enfermagem', registro: 'COREN-789', foto: null },
  { id: 7, nomeCompleto: 'Fernanda Lima', login: 'fernanda.lima', perfil: 'Equipe', especialidade: '', registro: '', foto: null },
  { id: 8, nomeCompleto: 'Paulo Henrique', login: 'paulo.henrique', perfil: 'Cuidador', especialidade: '', registro: '', foto: null },
]

let proximoId = 9

export const usuarioService = {
  async listar() {
    // Futuramente: return await fetch('/api/usuarios').then(r => r.json())
    return [...usuarios]
  },

  async criar(dados) {
    // Futuramente: return await fetch('/api/usuarios', { method: 'POST', body: JSON.stringify(dados) }).then(r => r.json())
    const novo = { ...dados, id: proximoId++ }
    usuarios.push(novo)
    return novo
  },

  async excluir(id) {
    // Futuramente: return await fetch(`/api/usuarios/${id}`, { method: 'DELETE' })
    const index = usuarios.findIndex(u => u.id === id)
    if (index !== -1) usuarios.splice(index, 1)
    return true
  }
}