const footer = document.querySelector("footer");

const id = footer.id;

console.log(id)

var urls = '';

if( id =="index"){
    urls = ""
}else{
    urls = "../../"
}

footer.innerHTML= `
    <div id="footer_todo">

        <link rel="stylesheet" href="${urls}footer.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
        <div id="footer_esquerda">
            <div id="footer_logo">
                <img src="${urls}img/SVG/Logo-Nivelamento.svg" />
            </div>
        </div>
        <div id="footer_direita">
            <h1>Contatos</h1>
            <a href="https://www.instagram.com/nivelamento.ufpa/" target="_blank" class="footer_link" id="instagram">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="mailto:oficina.nivelamento.ufpa@gmail.com" target="_blank" class="footer_link" id="email">
                <i class="fa-regular fa-envelope"></i>
            </a>
        </div>
    </div>
`