const eixo = document.querySelector('.eixo'); // Select the eixo container

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDkihaCFgP7tRCLNIg5P4L68nEWxwHXje_syKzsbAhdqvnFxgrRhbgRrRPgT4n8RdYWGMTwOK6simR/pub?gid=640552383&single=true&output=csv'


// var dataArray = null; 

/**
 * Fetch the data from the specified URL and parse it into a JSON object
 * using the first row as the headers.
 *
 * @return {Promise<Object[]>} A promise that resolves with an array of
 *     objects, where each object has the same properties as the headers.
 */
function fetchData() {
    return fetch(url)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n'); 
      const headers = rows[0].split(','); 
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
  console.log(dataArray)
  
  eixo.innerHTML = dataArray
  .filter(obj => obj.CURSO === '')
  .map(doc => {
    const innerContent = dataArray
    .filter(integ => integ.CURSO !== '' && integ.EIXO.includes(doc.EIXO))
    .map(int => integSingle(int)).join('');
    
    return headerEixo(doc, innerContent);
  })
  .join('');
});

/**
 * Generates an HTML string for displaying information about an eixo.
 * 
 * @param {Object} data - An object containing information about the eixo.
 * @param {string} data.EIXO - Eixo name of the eixo.
 * @param {string} data.NOME - Name of the eixo.
 * @param {string} innerContent - HTML string representing the eixo content.
 * @returns {string} HTML string representing the eixo information.
 */
function headerEixo(data, innerContent) {
  return `
    
    <div class="header-eixo">
    <div class="container-header-eixo">
    <img src="../img/SVG/Logo${data.EIXO}.svg" alt="${data.EIXO}" />
    
    <p>${data.NOME}</p>
    </div>
    </div>
    <div class="box container-integ">
    ${innerContent}
    </div>
    
    `;
}

  /**
 * Generates an HTML string for displaying information about an individual.
 * 
 * @param {Object} data - An object containing information about the individual.
 * @param {string} data.FOTO - URL to the individual's photo.
 * @param {string} data.NOME - Name of the individual.
 * @param {string} data.CURSO - Course of the individual.
 * @returns {string} HTML string representing the individual's information.
 */
  function integSingle(data) {
    // Return an HTML block with the individual's photo, name, and course
    return `
      <div class="integ-single">
          <img src="${data.FOTO}" alt="${data.NOME}" />
  
          <h3>${data.NOME}</h3>
  
          <p>${data.CURSO}</p>
      </div>  
    `;
}
