const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRVXsGpzyj9C10t1PwFSIOpVp0zOv9ho7HXcPOlaFQI43FapPmQrlbhGDZPr1oKGpdgTVIkqHqNZI4/pub?gid=1871615310&single=true&output=csv"

function fetchData(url) {
    return fetch(url)
    .then(response => response.text())
    .then(data => {
        return data
            .trim()
            .split("\n") 
            .map(row => {
                const regex = /"(.*?)"|([^,]+)/g;
                let match, values = [];

                while ((match = regex.exec(row)) !== null) {
                    values.push(match[1] !== undefined ? match[1] : match[2]);
                }

                return values.map(value => value.trim());
            })
            .filter(row => row.some(cell => cell !== "")); 
    })
    .catch(error => console.error("Erro ao buscar os dados:", error));
}




fetchData(url).then(dataArray => {
  console.log(dataArray);
  const eixosMap = {
    "IB": "Informática Básica",
    "PC": "Pré-Cálculo",
    "FI": "Física",
    "QI": "Química",
    "BIO": "Biologia",
    "PG": "Programação",
  };
  const qtd_eixos = 6;
  var aux = 0;
  var html_pag = '';
  for(let i=0; i<qtd_eixos; i++){
    var eixo = dataArray[aux][0];
    var elementos_lista = '';
    console.log(dataArray[aux][1])
    for(let j=0; j<dataArray[aux][1]; j++){
        elementos_lista += `
        <li>Dia ${dataArray[aux+j+4][1]} ${eixo} ${j+1} - ${dataArray[aux+j+4][0]}: ${dataArray[aux+j+4][2]}</li>
        <ul>
            <li><a href="${dataArray[aux+j+4][4]}">Slide</a></li>
            <li><a href="${dataArray[aux+j+4][3]}">Apostila</a></li>
        </ul>
        `
    }
    html_pag += `
    <div>
        <div class="topico">
            <h1>Eixo de ${eixosMap[eixo]}: ${dataArray[aux+1][0]} - ${dataArray[aux+1][1]}</h1>
        </div>
        <div class="conteudo">
            <ul>
                ${elementos_lista}
            </ul>
        </div>
    </div>
    `
    elementos_lista = '';
    aux += Number(dataArray[aux][1]) + 4;
  }
  document.getElementById('programacao').innerHTML = html_pag
})
