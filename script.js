
let memoria = {
  nome: "João"
};

function falar(texto) {
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.pitch = 1;
  fala.rate = 0.9;
  fala.volume = 1;

  const vozes = speechSynthesis.getVoices();
  const vozJarvis = vozes.find(v => v.name.toLowerCase().includes("google") || v.name.toLowerCase().includes("male"));
  if (vozJarvis) fala.voice = vozJarvis;

  speechSynthesis.speak(fala);
}

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Seu navegador não suporta reconhecimento de voz");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  document.getElementById("status").textContent = "Ouvindo...";
  recognition.start();

  recognition.onresult = function(event) {
    const comando = event.results[0][0].transcript.toLowerCase();
    document.getElementById("status").textContent = `Você disse: "${comando}"`;

    if (comando.includes("que horas são")) {
      const hora = new Date().toLocaleTimeString("pt-BR");
      falar("Agora são " + hora);

    } else if (comando.includes("qual é a data")) {
      const data = new Date().toLocaleDateString("pt-BR");
      falar("Hoje é " + data);

    } else if (comando.includes("meu nome é")) {
      const nome = comando.replace("meu nome é", "").trim();
      memoria.nome = nome;
      falar(`Entendido, seu nome é ${nome}`);

    } else if (comando.includes("qual é o meu nome")) {
      falar(`Seu nome é ${memoria.nome}`);

    } else if (comando.includes("pesquisar por")) {
      const termo = comando.replace("pesquisar por", "").trim();
      falar(`Pesquisando por ${termo}`);
      window.open("https://www.google.com/search?q=" + encodeURIComponent(termo));

    } else if (comando.includes("tocar música de")) {
      const artista = comando.replace("tocar música de", "").trim();
      falar(`Tocando músicas de ${artista} no YouTube`);
      window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent("música " + artista));

    } else if (comando.includes("abrir whatsapp")) {
      falar("Abrindo WhatsApp");
      window.open("https://web.whatsapp.com");

    } else if (comando.includes("previsão do tempo")) {
      falar("Mostrando a previsão do tempo");
      window.open("https://www.google.com/search?q=previsão+do+tempo");

    } else {
      falar("Desculpe, comando não reconhecido.");
    }
  };

  recognition.onerror = function(event) {
    document.getElementById("status").textContent = "Erro: " + event.error;
    falar("Erro ao tentar escutar");
  };

  recognition.onend = function() {
    document.getElementById("status").textContent += " - pronto para outro comando.";
  };
}
