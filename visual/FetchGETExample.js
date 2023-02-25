fetch("https://jsonplaceholder.typicode.com/posts")
  .then(resposta => resposta.json())
  .then(json => FuncaoQueSeraExecutada(json));