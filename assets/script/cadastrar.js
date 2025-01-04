// Seleciona o elemento do formulário no HTML
const formulario = document.querySelector("form");

// Seleciona o campo de entrada para o nome do filme
const InomeFilme = document.querySelector(".nome");

// Seleciona o campo de entrada para a plataforma de streaming
const Istreaming = document.querySelector(".streaming");

// Seleciona o campo de entrada para a sinopse do filme
const Isinopse = document.querySelector(".sinopse");

// Seleciona o elemento que exibe o contador de caracteres da sinopse
const charCount = document.getElementById("char-count");

// Obtém o valor máximo de caracteres permitido para o campo de sinopse (definido no atributo `maxlength` no HTML)
const maxLength = Isinopse.getAttribute("maxlength");

// Função para cadastrar o filme
function cadastrar() {
    // Obtém o token de autenticação salvo no localStorage após o login
    const token = localStorage.getItem("token");

    // Verifica se o token existe; caso contrário, avisa o usuário e interrompe o processo
    if (!token) {
        alert("Você precisa estar autenticado para cadastrar um filme.");
        return;
    }

    // Faz uma requisição HTTP POST para a API do backend
    fetch("http://localhost:8080/filme/cadastrar", {
        headers: {
            "Accept": "application/json", // Informa ao servidor que espera uma resposta no formato JSON
            "Content-Type": "application/json", // Indica que os dados enviados estão no formato JSON
            "Authorization": `Bearer ${token}` // Adiciona o token de autenticação ao cabeçalho Authorization
        },
        method: "POST", // Define que a requisição é do tipo POST (envio de dados)
        body: JSON.stringify({ // Converte os dados do filme em um objeto JSON para enviar ao servidor
            nome: InomeFilme.value,       // Nome do filme fornecido pelo usuário
            streaming: Istreaming.value, // Plataforma de streaming fornecida
            sinopse: Isinopse.value      // Sinopse fornecida pelo usuário
        })
    })
    .then(function(res) {
        // Verifica se a resposta do servidor foi bem-sucedida
        if (res.ok) {
            console.log("Filme cadastrado com sucesso:", res); // Exibe no console o resultado da requisição
            alert("Filme cadastrado com sucesso!"); // Mostra uma mensagem de sucesso para o usuário
        } else {
            // Lança um erro se a resposta não for bem-sucedida
            throw new Error("Erro ao cadastrar o filme. Verifique os dados ou a autenticação.");
        }
    })
    .catch(function(error) {
        // Captura e exibe qualquer erro que ocorrer durante a requisição
        console.error("Erro: ", error); // Mostra o erro no console para depuração
        alert(error.message); // Exibe uma mensagem de erro para o usuário
    });
}

// Função para limpar os campos do formulário após o cadastro
function limpar() {
    InomeFilme.value = "";   // Limpa o campo de entrada do nome do filme
    Istreaming.value = "";   // Limpa o campo de entrada da plataforma de streaming
    Isinopse.value = "";     // Limpa o campo de entrada da sinopse
}

// Adiciona um evento ao campo de sinopse para atualizar o contador de caracteres conforme o usuário digita
Isinopse.addEventListener("input", function() {
    const currentLength = Isinopse.value.length; // Calcula o número de caracteres digitados
    charCount.textContent = `${currentLength}/${maxLength} caracteres usados`; // Atualiza o texto do contador
});

// Adiciona um evento ao formulário para capturar quando ele for enviado
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário

    cadastrar(); // Chama a função para cadastrar o filme
    limpar();    // Chama a função para limpar os campos do formulário
});

function inicio(){
    window.location.href = "../index.html";
}
