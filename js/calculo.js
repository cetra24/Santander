document.addEventListener("DOMContentLoaded", function () {
    const cuotasInput = document.getElementById("cuotas");
    const seleccionCuota = document.getElementById("seleccionCuota");
    const cuotaMensualText = document.getElementById("cuotaMensualText");
    const resultadoDiv = document.getElementById("resultado");
    const reestablecerButton = document.getElementById("reestablecerButton");
    const importeInput = document.getElementById("importe");
    const tasaInput = document.getElementById("tasa");
    const totalPrestamoText = document.getElementById("totalPrestamoText");
    const calcularButton = document.getElementById("calcularButton");

    function almacenarDatosLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    function recuperarDatosLocalStorage(key) {
        return localStorage.getItem(key);
    }

    const cargarCuotas = () => {
        seleccionCuota.innerHTML = "";
        for (let i = 1; i <= cuotasInput.value; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = `Cuota ${i}`;
            seleccionCuota.appendChild(option);
        }
        almacenarDatosLocalStorage("cuotas", cuotasInput.value);
    };

    cuotasInput.addEventListener("change", cargarCuotas);

    calcularButton.addEventListener("click", function () {
        const cuotaSeleccionada = parseInt(seleccionCuota.value);
        const tasaMensual = parseFloat(tasaInput.value) / 12 / 100;
        const importe = parseFloat(importeInput.value);
        const importeMensual = importe / cuotasInput.value;
        const cuotasArray = [];
        let totalPrestamo = 0;

        for (let i = 1; i <= cuotaSeleccionada; i++) {
            const cuotaMensual = importeMensual + (importe * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -i));
            cuotasArray.push(`Cuota ${i}: $${cuotaMensual.toFixed(2)}`);
        }

        for (let i = 1 + 1; i <= cuotasInput.value; i++) {
            const cuotaMensualTotal = importeMensual + (importe * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -i));
            cuotasArray.push(`Cuota ${i}: $${cuotaMensualTotal.toFixed(2)}`);
            totalPrestamo += cuotaMensualTotal;
        }

        const actualizarCuota = () => {
            const cuotaSeleccionada = parseInt(seleccionCuota.value);
            const tasaMensual = parseFloat(tasaInput.value) / 12 / 100;
            const importe = parseFloat(importeInput.value);

            const cuotaMensual = importeMensual + (importe * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cuotaSeleccionada));

            cuotaMensualText.textContent = `La cuota ${cuotaSeleccionada} es: $${cuotaMensual.toFixed(2)}`;
            totalPrestamoText.textContent = `El total del préstamo es de $${totalPrestamo.toFixed(2)}`;
            resultadoDiv.style.display = "block";
        };

        seleccionCuota.addEventListener("change", actualizarCuota);

        resultadoDiv.innerHTML = "";

        cuotasArray.forEach(function (cuota, index) {
            const resultadoP = document.createElement("p");
            resultadoP.textContent = cuota;
            resultadoDiv.appendChild(resultadoP);
        });

        reestablecerButton.style.display = "block";
        resultadoDiv.style.display = "block";
        almacenarDatosLocalStorage("totalPrestamo", totalPrestamo.toFixed(2));
    });

    reestablecerButton.addEventListener("click", function () {
        cuotasInput.value = "";
        importeInput.value = "";
        tasaInput.value = "";
        resultadoDiv.style.display = "none";
        reestablecerButton.style.display = "none";
        seleccionCuota.innerHTML = "";
        localStorage.removeItem("cuotas");
        localStorage.removeItem("totalPrestamo");

        resultadoDiv.innerHTML = "";
    });

    const mostrarDatosAlmacenados = () => {
        const cuotasAlmacenadas = recuperarDatosLocalStorage("cuotas");
        const totalPrestamoAlmacenado = recuperarDatosLocalStorage("totalPrestamo");

        if (cuotasAlmacenadas) {
            cuotasInput.value = cuotasAlmacenadas;
            cargarCuotas();
        }

        if (totalPrestamoAlmacenado) {
            totalPrestamoText.textContent = `El total del préstamo es de $${totalPrestamoAlmacenado}`;
            resultadoDiv.style.display = "block";
        }
    };

    mostrarDatosAlmacenados();
});
