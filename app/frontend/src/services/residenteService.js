const residentes = [
  {
    id: 1,
    nomeCompleto: 'Maria das Graças',
    dataNascimento: '1940-05-12',
    idade: 84,
    cpf: '111.222.333-44',
    quarto: '102',
    grauDependencia: 'Independente',
    responsavelLegal: 'João das Graças',
    foto: null
  },
  {
    id: 2,
    nomeCompleto: 'Antônio Ferreira',
    dataNascimento: '1935-08-30',
    idade: 89,
    cpf: '555.666.777-88',
    quarto: '105',
    grauDependencia: 'Auxílio Parcial',
    responsavelLegal: 'Paula Ferreira',
    foto: null
  },
  {
    id: 3,
    nomeCompleto: 'Rosa Oliveira',
    dataNascimento: '1942-01-20',
    idade: 83,
    cpf: '999.000.111-22',
    quarto: '110',
    grauDependencia: 'Acamado',
    responsavelLegal: 'Carlos Oliveira',
    foto: null
  },
]

let proximoId = 4

export const residenteService = {
  async listar() {
    // Futuramente: return await fetch('/api/residentes').then(r => r.json())
    return [...residentes]
  },

  async criar(dados) {
    // Futuramente: return await fetch('/api/residentes', { method: 'POST', body: JSON.stringify(dados) }).then(r => r.json())
    const idade = calcularIdade(dados.dataNascimento)
    const novo = { ...dados, id: proximoId++, idade }
    residentes.push(novo)
    return novo
  },

  async excluir(id) {
    // Futuramente: return await fetch(`/api/residentes/${id}`, { method: 'DELETE' })
    const index = residentes.findIndex(r => r.id === id)
    if (index !== -1) residentes.splice(index, 1)
    return true
  }
}

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null
  const hoje = new Date()
  const nasc = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nasc.getFullYear()
  const m = hoje.getMonth() - nasc.getMonth()
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--
  return idade
}