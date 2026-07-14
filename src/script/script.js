// Resultados oficiais
const resultados = {
    1: { casa: 4, fora: 0 }, // Brasil x Haiti
    2: { casa: 1, fora: 2 }  // Holanda x Japão
};

// Carrega histórico ao abrir
function carregarHistorico() {

    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    const container = document.getElementById("historico");

    container.innerHTML = "";

    historico.reverse().forEach(item => {

        container.innerHTML += `
            <div class="item-historico">
                <strong>${item.partida}</strong><br>

                Seu palpite:
                <b>${item.palpite}</b><br>

                Resultado:
                <b>${item.resultado}</b><br>

                ${item.status}<br>

                <div class="barra">
                    <div class="barra-preenchida" style="width:${item.precisao}%"></div>
                </div>

                <span>${item.precisao}% de precisão</span>

            </div>
        `;
    });

}

function enviarAposta(nomeJogo, numeroJogo){

    const golsCasa = document.getElementById(`gols1_jogo${numeroJogo}`).value;
    const golsFora = document.getElementById(`gols2_jogo${numeroJogo}`).value;

    if(golsCasa==="" || golsFora===""){
        alert("Escolha os gols dos dois times!");
        return;
    }

    const oficial = resultados[numeroJogo];

    const precisao = calcularPrecisao(
        Number(golsCasa),
        Number(golsFora),
        oficial.casa,
        oficial.fora
    );

    const status = gerarStatus(
        Number(golsCasa),
        Number(golsFora),
        oficial.casa,
        oficial.fora
    );

    const aposta = {

        partida: nomeJogo,

        palpite: `${golsCasa} x ${golsFora}`,

        resultado: `${oficial.casa} x ${oficial.fora}`,

        status: status,

        precisao: precisao

    };

    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    historico.push(aposta);

    localStorage.setItem("historico", JSON.stringify(historico));

    carregarHistorico();

    alert("Palpite enviado!");
}

function calcularPrecisao(pc,pf,rc,rf){

    let pontos = 0;

    if(pc===rc) pontos += 35;

    if(pf===rf) pontos += 35;

    const vencedorPalpite = Math.sign(pc-pf);
    const vencedorReal = Math.sign(rc-rf);

    if(vencedorPalpite===vencedorReal){
        pontos += 30;
    }

    return pontos;
}

function gerarStatus(pc,pf,rc,rf){

    if(pc===rc && pf===rf){
        return "🟢 Acertou o placar!";
    }

    const vencedorPalpite = Math.sign(pc-pf);
    const vencedorReal = Math.sign(rc-rf);

    if(vencedorPalpite===vencedorReal){
        return "🟡 Acertou o vencedor.";
    }

    return "🔴 Errou o vencedor.";
}