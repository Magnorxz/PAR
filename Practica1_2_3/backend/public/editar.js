const cliente = (new URLSearchParams(window.location.search)).get('id');
fetch('/ticket/'+ cliente).then((res) => res.json()).then((res) => {
    document.getElementById("cliente").value = res.cliente;
    document.getElementById("fecha").value = res.fecha;
    document.getElementById("solicitud").value = res.solicitud;
    document.getElementById("id").value = res.id;
    document.getElementById("completada").checked = res.completada;
});

