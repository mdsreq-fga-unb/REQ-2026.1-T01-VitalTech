const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'mock', 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const findUser = (login, senha) => {
  const users = router.db.get('usuarios').value()
  return users.find((user) => user.login === login && user.senha === senha)
}

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
      perfil: user.perfil
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
