function PostTemplate(titulo, corpo, imagem, id) {
    return `<article class="blog-post-container" data-post-id="${id}">
          <div class="row">
            <div class="blog-post-image col-3">
              <img src="${imagem || "https://bit.ly/2So2zvB"}" alt="Erro"></img>
            </div>
            <div class="col-7">
              <div class="blog-post-title">${titulo}</div>
              <div class="blog-post-body">${corpo}</div>
            </div>
            <div class="col-2 d-flex align-items-center">
              <a style="color:white" class="btn btn-danger m-auto" onclick="DeletarPost(this)">X</a>
            </div>
          </div>
        </article>`;
  }
  