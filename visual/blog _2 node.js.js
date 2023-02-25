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
