//Desenvolva uma API utilizando Node.js que deve conter as seguintes rotas:

//register - [POST] - esta rota deve cadastrar um usuário;
//login - [POST] - esta rota deve autenticar um usuário;
//posts - [POST] - esta rota deve cadastrar uma postagem mantendo a referência do autor. (requer autenticação);
//posts/{id} - [PUT] - esta rota deve editar a postagem do ID especificado mantendo a referência do autor. (requer autenticação);

//Aqui está uma possível implementação em Node.js utilizando o framework Express:

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

// Simula um banco de dados de usuários e postagens
let users = [];
let posts = [];

// Rota para cadastrar um usuário
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  
  // Verifica se o usuário já existe
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: "Usuário já cadastrado" });
  }
  
  // Cadastra o novo usuário
  const user = { id: users.length + 1, username, password };
  users.push(user);
  
  res.status(201).json(user);
});

// Rota para autenticar um usuário
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Verifica se o usuário existe e a senha está correta
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }
  
  // Gera um token de autenticação
  const token = jwt.sign({ id: user.id }, "segredo");
  
  res.json({ token });
});

// Middleware para autenticar o usuário antes de acessar as rotas protegidas
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  
  const [, token] = authHeader.split(" ");
  
  try {
    const decoded = jwt.verify(token, "segredo");
    req.userId = decoded.id;
    
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// Rota para cadastrar uma postagem
app.post("/posts", authenticate, (req, res) => {
  const { title, content } = req.body;
  const author = req.userId;
  
  const post = { id: posts.length + 1, title, content, author };
  posts.push(post);
  
  res.status(201).json(post);
});

// Rota para editar uma postagem
app.put("/posts/:id", authenticate, (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const author = req.userId;
  
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Postagem não encontrada" });
  }
  
  // Verifica se o usuário é o autor da postagem
  if (post.author !== author) {
    return res.status(403).json({ error: "Não autorizado" });
  }
  
  post.title = title;
  post.content = content;
  
  res.json(post);
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
