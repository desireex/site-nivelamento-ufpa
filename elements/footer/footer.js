document.addEventListener("DOMContentLoaded", () => {
    fetch("elements/footer/footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
      })
      .catch(error => console.error("Erro ao carregar o footer:", error));
  });
  