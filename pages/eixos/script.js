const linkDoCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRVXsGpzyj9C10t1PwFSIOpVp0zOv9ho7HXcPOlaFQI43FapPmQrlbhGDZPr1oKGpdgTVIkqHqNZI4/pub?gid=1963203521&single=true&output=csv";

async function obterPrimeiraColuna(link) {
    try {
        const response = await fetch(link);
        const csvData = await response.text();

        const linhas = csvData.split("\n");

        const coluna1 = linhas.slice(1) 
            .map(linha => linha.split(",")[0]) 
            .filter(valor => valor.trim() !== ""); 

        return coluna1;
    } catch (erro) {
        console.error("Erro ao processar o CSV:", erro);
        return [];
    }
}

async function obterColunasDoisEmDiante(link) {
    try {
        const response = await fetch(link);
        const csvData = await response.text();

        const linhas = csvData.split("\n");

        const dados = linhas.slice(1)
            .map(linha => linha.split(",").slice(1))
            .filter(colunas => colunas.length > 0);

        const colunas = dados[0]?.map((_, i) => dados.map(linha => linha[i])) || [];
        return colunas;
    } catch (erro) {
        console.error("Erro ao processar o CSV:", erro);
        return [];
    }
}

async function return_html() {
    const eixosMap = {
        "PC": "Pré-Cálculo",
        "FI": "Física",
        "QI": "Química",
        "BIO": "Biologia",
        "PG": "Programação",
    };

    try {
        const eixos = await obterColunasDoisEmDiante(linkDoCSV);
        const cursos = await obterPrimeiraColuna(linkDoCSV);
        for (let i = 0; i < eixos.length-1; i++) {
            document.getElementById(eixos[i][1]+'_eixo').innerHTML =
                `<div class="nome">
                    <img src="../../img/SVG/Logo${eixos[i][1]}.svg">
                    <h1>${eixosMap[eixos[i][1]]}</h1>
                </div>`;
            const cursos_eixo = [];
            for (let j = 1; j < cursos.length; j++) {
                if (eixos[i][j] === 'Sim') {
                    cursos_eixo.push(cursos[j]);
                }
            }

            const listaCursos = cursos_eixo
                .map(curso => `<li class="list-element">${curso}</li>`)
                .join("");

            document.getElementById(eixos[i][1]+'_cursos').innerHTML =
                `<div>
                    <h2>Cursos Recomendados:</h2>
                    <ul class="list">
                        ${listaCursos}
                    </ul>
                </div>`;
            document.getElementById(eixos[i][1]+'_static-content').classList.remove('hidden');
        }
    } catch (erro) {
        console.error("Erro ao gerar o HTML:", erro);
    }
    document.getElementById('IB_eixo').classList.remove('hidden');
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
        history.replaceState(null, null, " ");
    }
}

return_html();
