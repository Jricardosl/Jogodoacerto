
let numeroSecreto;
let tentativasRestantes;
let maximo;

// Função para configurar o jogo conforme o nível escolhido
function configurarJogo() {
  const nivel = document.getElementById('nivel').value;

  if (nivel === "facil") {
    maximo = 10;
    tentativasRestantes = 3;
  } else if (nivel === "medio") {
    maximo = 50;
    tentativasRestantes = 5;
  } else {
    maximo = 100;
    tentativasRestantes = 7;
  }

  numeroSecreto = Math.floor(Math.random() * maximo) + 1;
  document.getElementById('palpite').disabled = false;
  document.getElementById('botaoTentar').disabled = false;
  document.getElementById('resultado').textContent = '';
  document.getElementById('tentativas').textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

// Função para verificar o palpite do jogador
function verificarPalpite() {
  const palpite = parseInt(document.getElementById('palpite').value);
  const resultado = document.getElementById('resultado');
  const tentativasTexto = document.getElementById('tentativas');

  if (isNaN(palpite) || palpite < 1 || palpite > maximo) {
    resultado.textContent = `⛔ Digite um número válido entre 1 e ${maximo}.`;
    resultado.style.color = "red";
    return;
  }

  if (palpite === numeroSecreto) {
    resultado.textContent = "🎉 Parabéns! Você acertou!";
    resultado.style.color = "green";
    document.getElementById('audioVitoria').play();
    encerrarJogo();
  } else {
    tentativasRestantes--;
    if (tentativasRestantes > 0) {
      resultado.textContent = palpite < numeroSecreto
        ? "🔼 O número secreto é maior."
        : "🔽 O número secreto é menor.";
      resultado.style.color = "orange";
      tentativasTexto.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    } else {
      resultado.textContent = `💥 Você perdeu! O número era ${numeroSecreto}.`;
      resultado.style.color = "red";
      document.getElementById('audioDerrota').play();
      encerrarJogo();
    }
  }
}

// Função para encerrar o jogo desabilitando inputs
function encerrarJogo() {
  document.getElementById('palpite').disabled = true;
  document.getElementById('botaoTentar').disabled = true;
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  document.getElementById('palpite').value = '';
  configurarJogo();
}

// Inicia automaticamente com nível fácil
window.onload = configurarJogo;
