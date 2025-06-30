const synth = window.speechSynthesis;
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const ouvir = new recognition();
ouvir.lang = 'pt-BR';
ouvir.continuous = false;

let nomeUsuario = "Senhor João";

function falar(texto) {
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = 'pt-BR';
  utter.pitch = 1;
  utter.rate = 1;
  utter.voice = synth.getVoices().find(voice => voice.name.toLowerCase().includes('br') || voice.name.toLowerCase().includes('google'));
  synth.speak(utter);
}

function startListening() {
  document.getElementById("status").innerText = "🎧 Ouvindo...";
  ouvir.start();
}

ouvir.onresult = (event) => {
  const comando = event.results[0][0].transcript.toLowerCase();
  document.getElementById("status").innerText = "🧠 Comando: " + comando;
  executarComando(comando);
};

function executarComando(comando) {
  if (comando.includes("hora")) {
    const hora = new Date().toLocaleTimeString();
    falar("Agora são " + hora);
  } else if (comando.includes("data")) {
    const data = new Date().toLocaleDateString();
    falar("Hoje é " + data);
  } else if (comando.includes("seu nome")) {
    falar("Eu sou Jarvis, seu assistente pessoal.");
  } else if (comando.includes("meu nome")) {
    falar("Seu nome é " + nomeUsuario);
  } else if (comando.includes("clima")) {
    falar("Buscando previsão do tempo para Maceió");
    window.open("https://www.google.com/search?q=clima+Maceió", "_blank");
  } else if (comando.includes("tocar música")) {
    falar("Tocando música no YouTube");
    window.open("https://www.youtube.com/results?search_query=música", "_blank");
  } else if (comando.includes("abrir youtube")) {
    falar("Abrindo YouTube");
    window.open("https://youtube.com", "_blank");
  } else if (comando.includes("piada")) {
    falar("Por que o computador foi ao médico? Porque ele estava com um vírus.");
  } else if (comando.includes("traduzir")) {
    const palavras = comando.split("traduzir")[1];
    if (palavras) {
      window.open(`https://www.google.com/search?q=traduzir ${palavras.trim()}`, "_blank");
      falar("Aqui está a tradução de " + palavras.trim());
    }
  } else if (comando.includes("desligar")) {
    falar("Desligando... Até logo " + nomeUsuario);
    window.close();
  } else {
    falar("Desculpe, não entendi o comando.");
  }
}
