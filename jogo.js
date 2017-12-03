var timerId = null; // variavel que armazena a chamada da função timeout

function iniciarJogo(){

    var url = window.location.search;
    var nivel_jogo = url.replace("?","");

    var tempo_segundos = 0;

    //se nivel igual a 1 -> 120 segundos
    if (nivel_jogo == 1){
        tempo_segundos = 120;
    }
    //se nivel igual a 2 -> 60 segundos
    if (nivel_jogo == 2) {
        tempo_segundos = 60;
    }
    //se nivel igual a 3 -> 30 segundos
    if (nivel_jogo == 3) {
        tempo_segundos = 30;
    }

    //inserindo segundos no cronometro no span
    var cronometro = document.getElementById('cronometro').innerHTML = tempo_segundos;

    //inserindo balões
    var qtde_baloes = 70;

    criaBaloes(qtde_baloes);

    //imprimir qtde balões inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    //contando o tempo
    contagemTempo(tempo_segundos + 1);    
}

function criaBaloes(qtde_baloes){
    for (i = 0; i < qtde_baloes; i++) {
        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function(){ estourar(this) };
        
        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute('onclick', '');
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

    pontuacao(-1);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacaoJogo(baloes_inteiros);
}

function situacaoJogo(baloes_inteiros) {
    if (baloes_inteiros == 0) {
        alert('Parabéns você conseguiu estourar todos os balões a tempo!');
        pararJogo();
    }
}
function pararJogo(){
    clearTimeout(timerId);
}

function contagemTempo(segundos) {

    segundos = segundos-1;

    if(segundos == -1){
        clearTimeout(timerId); // para a execução da função do settimeout
        gameOver();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagemTempo("+segundos+")" , 1000);
}

function gameOver() {
    remove_eventos_baloes();
    alert('Fim de jogo! Você não estourou todos os balões a tempo');
}
