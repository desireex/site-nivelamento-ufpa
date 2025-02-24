const footer = document.querySelector("footer");
const header = document.querySelector("header");

const id = footer.id;

var urls = '';

if( id =="index"){
    urls = ""
}else{
    urls = "../../"
}

footer.innerHTML= `
    <div class="carrossel" style="width:100%">
        <div class="imagens">
            <img src="${urls}img/SVG/LogoPC.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoFI.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoPG.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoBIO.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoQI.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoIB.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoSE.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoDMK.svg" alt="">
        </div>
        <div class="imagens">
            <img src="${urls}img/SVG/LogoTI.svg" alt="">
        </div>
    </div>
    <div id="footer_todo">

        <link rel="stylesheet" href="${urls}style.css">
        <link rel="stylesheet" href="${urls}style-mobile.css">

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
            <a href="mailto:nivelamento.itec@ufpa.br" target="_blank" class="footer_link" id="email">
                <i class="fa-regular fa-envelope"></i>
            </a>
        </div>
    </div>
`

header.innerHTML = `
     <link rel="stylesheet" href="${urls}style.css">
     <link rel="stylesheet" href="${urls}style-mobile.css">

     <a href="${urls}index.html"><img src="${urls}img/SVG/LogoNivelamentoWhite.svg"/></a>
    <nav class="nav">
        <button class="hamburguer"></button>
        <ul class="nav-list">
            <li><a href="${urls}index.html">Página inicial</a></li>
            <li><a href="${urls}pages/programacao/programacao.html">Programação</a></li>
            <li><a href="${urls}pages/eixos/eixos.html">Eixos</a></li>
            <li><a href="${urls}pages/organizacao/organizacao.html">Organização</a></li>
            <!--<li><a href="${urls}pages/salas/salas.html">Salas</a></li>-->
        </ul>
    </nav>
`

// Criando um novo elemento filho
const novoElemento = document.createElement('div');
novoElemento.style.width = "100%";
novoElemento.style.height = "90px";
novoElemento.style.transition = "all 0.3s";

// Selecionando a div e adicionando o novo elemento como primeiro filho
const minhaDiv = document.querySelector('body');
minhaDiv.prepend(novoElemento);


const hamburguer = document.querySelector(".hamburguer");
const nav = document.querySelector(".nav");

hamburguer.addEventListener("click", () =>
nav.classList.toggle("active"));

const main = document.querySelector('.carrossel');
const child = document.querySelectorAll('.imagens');

esvSlide(main, child, {
    arrows: false,
    asNavFor: false,
    bullets: false,
    autoPlay: true,
    cssEase: false,
    bullletsAling: 'center',
    centerPadding: 20,
    sliderMargin: 50,
    slidesToShow: 9,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 0,
    autoplayReverse: false,
    responsive: [{
        point: 1000,
        seg: {
            autoplayReverse: false,
            bullletsAling: 'left',
            slidesToShow: 7,
            infinite: true,
            autoPlay: true,
            arrows: false
        }
    },{
        point: 700,
        seg:{
            arrows: false,
            slidesToShow: 3,
            centerPadding: 10,
            infinite: true
        }
    }]
});

if(urls==""){
    const main2 = document.querySelector('.cards');
    const child2 = document.querySelectorAll('.card');
    
    esvSlide(main2, child2, {
        arrows: true,
        asNavFor: false,
        bullets: false,
        autoPlay: false,
        cssEase: false,
        bullletsAling: 'center',
        centerPadding: 20,
        sliderMargin: 50,
        slidesToShow: 3,
        infinite: true,
        speed: 2000,
        autoplaySpeed: 0,
        autoplayReverse: false,
        responsive: [{
            point: 1000,
            seg: {
                autoplayReverse: false,
                bullletsAling: 'left',
                slidesToShow: 2,
                infinite: true,
                autoPlay: false,
                arrows: true
            }
        },{
            point: 850,
            seg:{
                arrows: false,
                slidesToShow: 1,
                centerPadding: 0,
                infinite: true,
                sliderMargin: 0,
                bullets: true,
                bullletsAling: 'center'
            }
        }]
    });
    
}
