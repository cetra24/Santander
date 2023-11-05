const usuariosRegistrados = [
    {
        dni: "12345678",
        usuario: "usuario",
        clave: "clave"
    }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const dni = document.getElementById("dni").value;
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    const usuarioEncontrado = usuariosRegistrados.find(function(u) {
        return u.dni === dni && u.usuario === usuario && u.clave === clave;
    });

    if (usuarioEncontrado) {
        window.location.href = "html/sesion.html";
    } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
});
