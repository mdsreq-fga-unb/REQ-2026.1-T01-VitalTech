const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'mock', 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const findUser = (login, senha) => {
  const users = router.db.get('usuarios').value()
  return users.find((user) => (
    user.login === login
    && user.senha === senha
    && user.ativo !== false
  ))
}

server.post('/usuarios', (req, res, next) => {
  const login = String(req.body?.login || '').trim().toLowerCase()
  const users = router.db.get('usuarios').value()
  const duplicate = users.some(
    (user) => String(user.login || '').trim().toLowerCase() === login
  )

  if (duplicate) {
    return res.status(409).json({ message: 'Login ja esta em uso.' })
  }

  return next()
})

server.post('/residentes', (req, res, next) => {
  const cpf = String(req.body?.cpf || '').trim()
  const residents = router.db.get('residentes').value()
  const duplicate = residents.some(
    (resident) => String(resident.cpf || '').trim() === cpf
  )

  if (duplicate) {
    return res.status(409).json({ message: 'CPF ja cadastrado.' })
  }

  return next()
})

server.post('/auth/login', (req, res) => {
  const { login, senha } = req.body || {}

  if (!login || !senha) {
    return res.status(400).json({ message: 'Login e senha sao obrigatorios.' })
  }

  const user = findUser(login, senha)

  if (!user) {
    return res.status(401).json({ message: 'Credenciais invalidas.' })
  }

  return res.json({
    token: `mock-token-${user.id}`,
    perfil: user.perfil,
    user: {
      id: user.id,
      nome: user.nome,
      login: user.login,
      perfil: user.perfil,
      ativo: user.ativo !== false
    }
  })
})

server.post('/auth/logout', (req, res) => {
  return res.status(204).end()
})

server.use(router)

const port = process.env.MOCK_API_PORT || 3001
server.listen(port, () => {
  console.log(`Mock API on http://localhost:${port}`)
})
