function pesquisar() {
    // Função principal que é executada quando o botão "Pesquisar" é clicado

    let section = document.getElementById("resultados-pesquisa");
    // Seleciona a seção onde os resultados da pesquisa serão exibidos

    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    // Pega o valor digitado pelo usuário no campo de pesquisa

    if(!campoPesquisa){
        // Verifica se o campo de pesquisa está vazio
        section.innerHTML = "<p>Para buscar, digite algo</p>";
        // Se estiver vazio, exibe uma mensagem pedindo para o usuário digitar algo
        return;
        // Encerra a função para não continuar o processamento
    }

    campoPesquisa = campoPesquisa.toLowerCase();
    // Converte o valor digitado para letras minúsculas, facilitando a busca case-insensitive (que ignora maiúsculas/minúsculas)

    const token = localStorage.getItem("token");
    if (!token) {
        // Verifica se o token existe
        section.innerHTML = "<p>Você precisa estar autenticado para realizar essa ação.</p>";
        return;
    }

    const url = `http://localhost:8080/filme/listar?query=${encodeURIComponent(campoPesquisa)}`;

    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Adiciona o token no cabeçalho
            "Content-Type": "application/json" // Indica que espera uma resposta em JSON
        }
    })
        .then(response => {
            if(!response.ok){
                throw new Error("Erro ao buscar dados. Verifique a autenticação ou os parâmetros.");
            }
            return response.json();
        })
        .then(dados => {
            let resultados = "";

            for(let dado of dados){
                resultados += `
                <div class="item-resultado">
                    <h2>
                        <a href="#" target="_blank">${dado.nome}</a>
                        <!-- Exibe o nome do filme como um link -->
                    </h2>
                    <p class="descricao-meta">${dado.sinopse}</p>
                    <!-- Exibe a sinopse do filme -->
                    <p>
                    <p class="descricao-meta">Onde assistir: ${dado.streaming}</p>
                    <!-- Exibe um link para o trailer do filme -->
                </div>
                `;
            }
            if(!resultados){
                resultados = "<p>Nada foi encontrado</p>";
            }

            section.innerHTML = resultados;
        })
        .catch(error => {
            errorSync(error);
        });
}

function errorSync(){
    let section = document.getElementById("resultados-pesquisa");
    // Seleciona a seção onde os resultados da pesquisa serão exibidos

    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    // Pega o valor digitado pelo usuário no campo de pesquisa

    if(!campoPesquisa){
        // Verifica se o campo de pesquisa está vazio
        section.innerHTML = "<p>Para buscar, digite algo</p>";
        // Se estiver vazio, exibe uma mensagem pedindo para o usuário digitar algo
        return;
        // Encerra a função para não continuar o processamento
    }

    campoPesquisa = campoPesquisa.toLowerCase();
    // Converte o valor digitado para letras minúsculas, facilitando a busca case-insensitive (que ignora maiúsculas/minúsculas)

    let resultados = "";
    // Variável que armazenará os resultados da pesquisa formatados em HTML

    let nome = "";
    let sinopse = "";
    let tags = "";
    // Variáveis que serão usadas para armazenar o nome, sinopse e tags de cada filme

    for(let dado of dados){
        // Itera sobre cada elemento no array "dados" (presumivelmente um array com os detalhes dos filmes)

        nome = dado.nome.toLowerCase();
        sinopse = dado.sinopse.toLowerCase();
        tags = dado.tags.toLowerCase();
        // Converte os campos nome, sinopse e tags do filme para letras minúsculas para a comparação

        if (nome.includes(campoPesquisa) || sinopse.includes(campoPesquisa) || tags.includes(campoPesquisa)){
            // Verifica se o termo de pesquisa está presente no nome, sinopse ou tags do filme

            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.nome}</a>
                    <!-- Exibe o nome do filme como um link (no momento, com href "#", mas pode ser substituído por uma URL válida) -->
                </h2>
                <p class="descricao-meta">${dado.sinopse}</p>
                <!-- Exibe a sinopse do filme -->
                <a href=${dado.trailer} target="_blank">Veja o Trailer clicando aqui</a>
                <!-- Exibe um link para o trailer do filme -->
            </div>
            `;
            // Concatena os resultados encontrados à variável "resultados", incluindo a formatação HTML
        }
    }

    if(!resultados){
        // Se nenhum resultado foi encontrado, ou seja, "resultados" está vazio
        resultados = "<p>Nada foi encontrado</p>";
        // Exibe uma mensagem informando que nada foi encontrado
    }

    section.innerHTML = resultados;
    // Insere os resultados (ou a mensagem "Nada foi encontrado") na seção de resultados de pesquisa
}
