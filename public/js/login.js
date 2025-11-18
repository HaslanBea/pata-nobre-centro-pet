console.log("login.js carregado!");

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginPassword").value;

  try {
    const resposta = await fetch("http://localhost:3000/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.error || "Erro ao fazer login");
      return;
    }

    alert("Login efetuado com sucesso!");
    window.location.href = "/";
  } catch (erro) {
    alert("Erro ao conectar ao servidor");
  }
});

// CADASTRO
document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    nome: document.getElementById("cadNome").value,
    idade: document.getElementById("cadIdade").value,
    telefone: document.getElementById("cadTelefone").value,
    cpf: document.getElementById("cadCpf").value,
    endereco: document.getElementById("cadEndereco").value,
    email: document.getElementById("cadEmail").value,
    senha: document.getElementById("cadSenha").value
  };

  try {
    const resposta = await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.error || "Erro ao cadastrar");
      return;
    }

    alert("Cadastro realizado!");
    toggleForms();
  } catch (erro) {
    alert("Erro ao conectar ao servidor");
  }
});
