document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const dni = document.getElementById("dni").value;
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    try {
        const response = await fetch("usuarios.json");
        if (!response.ok) {
            throw new Error("Error al cargar los usuarios");
        }

        const usuariosRegistrados = await response.json();

        const usuarioEncontrado = usuariosRegistrados.find(function(u) {
            return u.dni === dni && u.usuario === usuario && u.clave === clave;
        });

        if (usuarioEncontrado) {
            sessionStorage.setItem("nombreUsuario", usuarioEncontrado.usuario);
            window.location.href = "html/sesion.html";
        } else {
            alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        alert("Error al cargar los usuarios. Por favor, inténtalo más tarde.");
    }
});
