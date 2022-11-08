let jogos = [];

onload = () => {
  const t = JSON.parse(localStorage.getItem('jogos'));
  if (t) jogos = t;
  mostrajogos();
  document.querySelector('#inputNovoJogo').oninput = monitoraCampoAdic;
  document.querySelector('#inputalteraJogo').oninput = monitoraCampoAlt;
  document.querySelector('#inputNovoJogo').onkeypress = (e) => {
    if (e.key == 'Enter') adicionajogo();
  };
  document.querySelector('#inputalteraJogo').onkeypress = (e) => {
    if (e.key == 'Enter') alteraJogo();
  };

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = true;
    ativa('tela2');
    document.querySelector('#inputNovoJogo').focus();
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputNovoJogo').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campo = document.querySelector('#inputalteraJogo');
    campo.value = '';
    campo.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionajogo();
  };
  
  document.querySelector('#btnAlt').onclick = () => {
    alteraJogo();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagajogo();
  };
};
//Mostrar os jogos já existentes
const mostrajogos = () => {
  const listaDeJogos = document.querySelector('#listaDeJogos');
  listaDeJogos.innerHTML = '';
  jogos.forEach((t) => {
    let elemjogo = document.createElement('li');
    elemjogo.innerHTML = t.nome;
    elemjogo.setAttribute('data-id', t.id);
    elemjogo.onclick = () => {
      let campo = document.querySelector('#inputalteraJogo');
      ativa('tela3');
      campo.value = t.nome;
      campo.setAttribute('data-id', t.id);
      campo.focus();
    };
    listaDeJogos.appendChild(elemjogo);
  });
  document.querySelector('#estado').innerText = jogos.length;
  if (jogos.length > 0) {
    listaDeJogos.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaDeJogos.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};

const limpa = () => {
  document.querySelector('#inputalteraJogo').value = '';
  document.querySelector('#entradaplataforma').value = '';
  document.querySelector('#entradaedicao').value = '';
}

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

//Adicionar Jogos
const adicionajogo = () => {
  let campo = document.querySelector('#inputNovoJogo');
  let nome = campo.value;
  let campoAGen = document.querySelector('#entradagenero');
  let genero = campoAGen.value;
  let campoAPlat = document.querySelector('#entradaplataforma');
  let plataforma = campoAPlat.value;
  let campoAEd = document.querySelector('#entradaedicao');
  let edicao = campoAEd.value;
  if (nome != '') {
    jogos.push({
      id: Math.random().toString().replace('0.', ''),
      nome: nome,
      genero: genero,
      plataforma: plataforma,
      edicao: edicao,
    });
    campo.value = '';
    ativa('tela1');
    salvajogos();
    mostrajogos();
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};
//Alterar os dados do jogo
const alteraJogo = () => {
  let campo = document.querySelector('#inputalteraJogo');
  let nome = campo.value;
  let campoAGen = document.querySelector('#alteragenero')
  let campoAPlat = document.querySelector('#alteraplataforma');
  let campoAEd = document.querySelector('#alteraedicao');
  var idjogo = campo.getAttribute('data-id');
  let i = jogos.findIndex((t) => t.id == idjogo);
  jogos[i].nome = campo.value;
  campo.value = '';
  jogos[i].genero = campoAGen.value;
  campo.campoAGen = '';
  jogos[i].plataforma = campoAPlat.value;
  campoAPlat.value = '';
  jogos[i].edicao = campoAEd.value;
  campoAEd.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvajogos();
  mostrajogos();
};
//Deletar o jogo
const apagajogo = () => {
  let campo = document.querySelector('#inputalteraJogo');
  let idjogo = campo.getAttribute('data-id');
  jogos = jogos.filter((t) => t.id != idjogo);
  campo.value = '';
  campo.removeAttribute('data-id');
  ativa('tela1');
  salvajogos();
  mostrajogos();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvajogos = () => {
  localStorage.setItem('jogos', JSON.stringify(jogos));
};


