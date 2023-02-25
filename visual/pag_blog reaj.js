// descreva o codigo de uma pagina web de blog em js para web utilizando o React.js que atenda

// cadastra usuário de criar postagem e outro perfil de visualização  ;
// usuário desejo realizar login;
// usuário autenticado visualizar todas as postagens;
// usuário autenticado desejo visualizar os detalhes de uma postagem;
// outro usuário autenticado pode  visualizar todas as minhas postagens;
// usuário autenticado desejo criar uma postagem;
// usuário autenticado desejo editar uma postagem ;
// usuário autenticado desejo deletar uma postagem 
 
//Para implementar essas funcionalidades em uma página web de blog utilizando o React.js, podemos criar componentes para cada uma das telas e rotas da aplicação.

// 1 Componente de cadastro de usuário e criação de postagem:

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UserForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const history = useHistory();

  const handleUserSubmit = () => {
    // Enviar dados do usuário para o servidor
    history.push('/login'); // Redirecionar para a página de login após o cadastro
  }

  const handlePostSubmit = () => {
    // Enviar dados da postagem para o servidor
    history.push('/posts'); // Redirecionar para a página de visualização de postagens
  }

  return (
    <>
      <h1>Cadastro</h1>
      <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleUserSubmit}>Cadastrar</button>

      <h1>Criar postagem</h1>
      <input type="text" placeholder="Título" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
      <textarea placeholder="Conteúdo" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
      <button onClick={handlePostSubmit}>Criar postagem</button>
    </>
  );
}


// 2 componente de login

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Autenticar usuário com dados enviados para o servidor
    history.push('/posts'); // Redirecionar para a página de visualização de postagens após login
  }

  return (
    <>
      <h1>Login</h1>
      <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </>
  );
}


// 3 Componente de visualização de postagens:

import React, { useEffect, useState } from 'react';

function PostList({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Buscar postagens do servidor
    setPosts([
      { id: 1, title: 'Primeiro post', content: 'Conteúdo do primeiro post', author: 'Autor 1' },
      { id: 2, title: 'Segundo post', content: 'Conteúdo do segundo post', author: 'Autor 2' },
      { id: 3, title: 'Terceiro post', content: 'Conteúdo do terceiro post', author: 'Autor 3' }
    ]); // Definir lista de postagens
  }, []);

  return (
    <>
      <h1>Postagens</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Autor: {post.author}</p>
          {currentUser === post.author && (
            <div>
              <button>Editar</button>
              <button>Deletar</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default PostList;
