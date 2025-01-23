var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1Sr3trV9chxP_CzanDcKOX-H4cvhLpsGM_c0QNO2GtyJIyjBzjCZmDZ6Ew1wbsmaWqRfsqF9mQu-e/pub?gid=640552383&single=true&output=csv'

let dataArray = null; // Variável global

function fetchData() {
    return fetch(url)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n'); // Divide as linhas
      const headers = rows[0].split(','); // Pega a primeira linha como cabeçalhos
      return rows.slice(1).map(row => { // Para cada linha depois da primeira
        const values = row.split(',');
        // Cria um objeto removendo espaços extras das chaves
        return headers.reduce((obj, header, index) => {
          const cleanHeader = header.trim(); // Remove espaços extras da chave
          obj[cleanHeader] = values[index]; // Cria o objeto com a chave limpa
          return obj;
        }, {});
      });
    });
}
  

fetchData().then(dataArray => {
    const container_integ = document.querySelector('.eixo');

    container_integ.innerHTML = dataArray
    .filter(obj => obj.CURSO === '')
        .map(doc => {
            const innerContent = dataArray
                .filter(integ => integ.CURSO !== '' && integ.EIXO.includes(doc.EIXO))
                .map(int => `
                  <div class="integ-single">
                      <img src="${int.FOTO}" alt="${int.NOME}" />

                      <h3>${int.NOME}</h3>

                      <p>${int.CURSO}</p>
                  </div>  
              `).join('');

            return `
                <div class="header-eixo">
                     <div class="container-header-eixo">
                        <img src="../img/SVG/Logo${doc.EIXO}.svg" alt="${doc.EIXO}" />

                        <p>${doc.NOME}</p>
                     </div>
                </div>
                <div class="box container-integ">
                    ${innerContent}
                </div>
            `;
        })
        .join('');

});