const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDkihaCFgP7tRCLNIg5P4L68nEWxwHXje_syKzsbAhdqvnFxgrRhbgRrRPgT4n8RdYWGMTwOK6simR/pub?gid=1243074535&single=true&output=csv";

var dataArray = null; 

function parseCSV(data) {
    const rows = data.split('\n'); 
    const headers = rows[0].split(','); 

    return rows.slice(1).map(row => {
        const values = [];
        let current = '';
        let insideQuotes = false;

        for (let char of row) {
            if (char === '"' && !insideQuotes) {
                insideQuotes = true;

            } else if (char === '"' && insideQuotes) {
                insideQuotes = false;

            } else if (char === ',' && !insideQuotes) {
                values.push(current.trim());
                current = '';

            } else {
                current += char;
            }
        }

        if (current) values.push(current.trim());

        return headers.reduce((obj, header, index) => {
            const cleanHeader = header.trim();
            obj[cleanHeader] = values[index] || ''; 
            return obj;
        }, {});
    });
}

function fetchData() {
    return fetch(url)
    .then(response => response.text())
    .then(data => parseCSV(data));
}
  

fetchData().then(dataArray => {
    const locais = document.querySelector('.locais');

    locais.innerHTML = dataArray
    .filter(obj => obj.LOCAL === '')
    .map(doc => {

        const inner_container = dataArray
            .filter(el => el.LOCAL !== '' && el.SIGLA === doc.SIGLA)
            .map((loc, index) => {

                const array_cursos = loc.CURSOS.split(',')
                const sigle_cursos = array_cursos
                    .map((cur, index) => `

                        <p>${index+1} - ${cur.trim()}</p>

                    `).join(''); 

                return `
                    <div class="local-single">
                        <h3>Turma ${index + 1}</h3>
                        <h3>${loc.LOCAL}</h3>

                        <p>Cursos:</p>

                        <div class="container-cursos">
                            ${sigle_cursos}
                        </div>

                        <a href="${loc.MAPS}" target="_blank">Encontre sua sala</a>

                    </div>`
            }).join('')

        return ` 
            <div class="box header-locais">
                <img src="../img/SVG/Logo${doc.SIGLA}white.svg"/>
                <h1>Eixo de ${doc.EIXO}</h1>
            </div>
            
            <div class="box body-locais">
                <img src="../img/SVG/Logo${doc.SIGLA}.svg"/>

                <div class="container-locais">
                    ${inner_container}
                </div> 
            </div>`
    }).join('')

    console.log(dataArray)
})


