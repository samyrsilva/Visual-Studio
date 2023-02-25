//API utilizando Node.js que deve conter as seguintes rotas: 
//posts - [GET] - esta rota deve retornar a lista de todas as postagens ordenadas das mais recentes para as mais antigas com a possibilidade de inverter esta ordenação e de retornar apenas as postagens do usuário que fez a requisição (requer autenticação);
//posts/{id} - [GET] - esta rota deve retornar a postagem do ID especificado com todos os seus dados (requer autenticação);
//posts/{id} - [DELETE] - esta rota deve deletar a postagem do ID especificado.

//Para desenvolver esta API em Node.js, 
//será necessário utilizar um servidor web para receber e responder às requisições HTTP. 
//Um dos servidores web mais populares para Node.js é o Express, 
//que facilita bastante a criação de rotas e o tratamento de requisições.

//Para começar, é necessário instalar o Express e outras dependências usando o npm (Node Package Manager).
// Para isso, crie um novo diretório para o projeto e execute o seguinte comando no terminal:

//codigo e comando para o terminal
//>>>>>>   npm init -y
//>>>>>>   npm install express body-parser cors jsonwebtoken bcrypt

//Isso criará um arquivo " package.json " e instalará o Express, 
//o " body-parser "    >>> para lidar com os corpos das requisições,
//o " cors "           >>> para permitir o acesso a partir de outros domínios, 
//o " jsonwebtoken "   >>> para autenticação de usuários 
//o " bcrypt  "        >>> para criptografar senhas.

// Em seguida, crie um arquivo index.js na raiz do projeto e adicione o seguinte código:
// Este código cria um servidor Express, define

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = [];

app.get('/posts', (req, res) => {
  const userPosts = posts.filter(post => post.authorId === req.user.id);
  const sortedPosts = userPosts.sort((a, b) => b.createdAt - a.createdAt);
  const reversed = req.query.reverse === 'true';
  const result = reversed ? sortedPosts.reverse() : sortedPosts;
  res.json(result);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(post => post.id === req.params.id);
  if (!post) {
    res.status(404).send('Post not found');
    return;
  }
  if (post.authorId !== req.user.id) {
    res.status(403).send('You are not authorized to view this post');
    return;
  }
  res.json(post);
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const post = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    content,
    authorId: req.user.id,
    createdAt: new Date(),
  };
  posts.push(post);
  res.json(post);
});

app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(post => post.id === req.params.id);
  if (!post) {
    res.status(404).send('Post not found');
    return;
  }
  if (post.authorId !== req.user.id) {
    res.status(403).send('You are not authorized to edit this post');
    return;
  }
  post.title = title;
  post.content = content;
  res.json(post);
});

app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex(post => post.id === req.params.id);
  if (index === -1) {
    res.status(404).send('Post not found');
    return;
  }
  if (posts[index].authorId !== req.user.id) {
    res.status(403).send('You are not authorized to delete this post');
    return;
  }
  const post = posts.splice(index, 1)[0];
  res.json(post);
});

app.listen(3000, () => {
  console.log('Server started');
});

