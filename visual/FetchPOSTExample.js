fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    /* Transforma objeto em JSON */
    title: "titulo",
    body: "corpo do texto",
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8" // Especifica que será enviado um JSON
  }
})
  .then(resposta => resposta.json()) //Transforma em objeto javascript
  .then(json => FuncaoQueSeraExecutada(json));