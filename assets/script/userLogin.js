// Seleciona o elemento do formulário de login pelo ID "div-login"
const loginform = document.getElementById("div-login");

// Seleciona o campo de entrada para o login pelo ID "login"
const Ilogin = document.getElementById("login");

// Seleciona o campo de entrada para a senha pelo ID "password"
const Ipassword = document.getElementById("password");

// Seleciona o elemento onde será exibida a mensagem de erro pelo ID "mensagem-erro"
const mensagemErro = document.getElementById("mensagem-erro");

// Define uma função para enviar os dados de login ao servidor
function loginRequest(login, password) {
    // Faz uma requisição HTTP POST ao servidor na rota "/projeto/login"
    fetch("http://localhost:8080/projeto/login", {
        method: "POST", // Método HTTP POST para enviar dados
        headers: {
            "Content-Type": "application/json", // Informa ao servidor que os dados estão no formato JSON
        },
        body: JSON.stringify({ // Converte o objeto com login e senha para JSON
            login: login,        // Envia o login fornecido pelo usuário
            password: password   // Envia a senha fornecida pelo usuário
        })
    })
    .then(response => { 
        // Verifica se a resposta do servidor foi bem-sucedida (código HTTP 200-299)
        if (response.ok) {
            return response.json(); // Converte a resposta para JSON se for bem-sucedida
        } else {
            // Lança um erro caso o login ou a senha estejam incorretos
            throw new Error("Login ou senha inválidos");
        }
    })
    .then(data => { 
        // Se o login foi bem-sucedido, exibe os dados recebidos no console
        console.log("Login bem-sucedido:", data);
        // Armazena o token de autenticação no armazenamento local do navegador
        localStorage.setItem("token", data.token);
        // Redireciona o usuário para a página de cadastro
        window.location.href = "cadastro.html";
    })
    .catch(error => {
        // Captura e exibe qualquer erro que ocorra durante o processo
        mensagemErro.textContent = error.message; // Mostra a mensagem de erro no elemento da página
    });
}

// Adiciona um evento ao formulário para capturar quando ele é enviado (submit)
loginform.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário

    // Obtém os valores dos campos de login e senha
    const userLogin = Ilogin.value;
    const password = Ipassword.value;

    // Validação básica: verifica se os campos não estão vazios
    if (!userLogin || !password) {
        mensagemErro.textContent = "Por favor, preencha todos os campos."; // Exibe mensagem de erro se algum campo estiver vazio
        return; // Interrompe o fluxo da função se a validação falhar
    }

    // Chama a função loginRequest para enviar os dados ao servidor
    loginRequest(userLogin, password);

    // Limpa os campos do formulário após a tentativa de login
    Ilogin.value = "";
    Ipassword.value = "";
});
