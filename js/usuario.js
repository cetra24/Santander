function obtenerNombreUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const usuario = urlParams.get("usuario");
    return usuario;
}

function mostrarNombreUsuario() {
    const nombreUsuario = obtenerNombreUsuario();
    if (nombreUsuario) {
        document.getElementById("nombreUsuario").textContent = "Hola " + nombreUsuario;
    }
}

mostrarNombreUsuario();

document.getElementById("cerrarSesion").addEventListener("click", function () {
    window.location.href = "../index.html";
});

document.addEventListener("DOMContentLoaded", function() {
    const menuContainer = document.getElementById("menuContainer");
    const menuButton = document.getElementById("menuButton");

    menuButton.addEventListener("click", function() {
        if (menuContainer.classList.contains("d-none")) {
            menuContainer.classList.remove("d-none");
        } else {
            menuContainer.classList.add("d-none");
        }
    });
});
