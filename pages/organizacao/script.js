// var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1Sr3trV9chxP_CzanDcKOX-H4cvhLpsGM_c0QNO2GtyJIyjBzjCZmDZ6Ew1wbsmaWqRfsqF9mQu-e/pub?gid=640552383&single=true&output=csv'

// var url ="https://docs.google.com/spreadsheets/d/e/2PACX-1vSDkihaCFgP7tRCLNIg5P4L68nEWxwHXje_syKzsbAhdqvnFxgrRhbgRrRPgT4n8RdYWGMTwOK6simR/pub?gid=640552383&single=true&output=csv"

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDkihaCFgP7tRCLNIg5P4L68nEWxwHXje_syKzsbAhdqvnFxgrRhbgRrRPgT4n8RdYWGMTwOK6simR/pub?gid=640552383&single=true&output=csv'


var dataArray = null; 

function fetchData() {
    return fetch(url)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n'); 
      const headers = rows[9].split(','); 

      return rows.slice(1).map(row => { 
        const values = row.split(',');
        
        return headers.reduce((obj, header, index) => {
          const cleanHeader = header.trim(); 
          obj[cleanHeader] = values[index];

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