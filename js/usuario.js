(function () {
    document.addEventListener("DOMContentLoaded", async function () {
        const menuContainer = document.getElementById("menuContainer");
        const menuButton = document.getElementById("menuButton");

        menuButton.addEventListener("click", function () {
            menuContainer.classList.toggle("d-none");
        });

        const obtenerNombreUsuario = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const usuario = urlParams.get("usuario");
            return usuario || sessionStorage.getItem("nombreUsuario");
        };

        const mostrarNombreUsuario = () => {
            const nombreUsuario = obtenerNombreUsuario();
            if (nombreUsuario) {
                document.getElementById("nombreUsuario").textContent = "Hola " + nombreUsuario;
            }
        };

        mostrarNombreUsuario();

        document.getElementById("cerrarSesion").addEventListener("click", function () {
            sessionStorage.removeItem("nombreUsuario");
            window.location.href = "../index.html";
        });
    });
})();
