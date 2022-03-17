
const listaTicketsElem =
    document.querySelector('#lista-tickets');
// Obtener la lista de tickets y, por cada
// uno de ellos, generar el contenido que
// está en la variable ticketTemplate
fetch('/tickets')
    .then((res) => res.json())
    .then((res) => {
        listaTicketsElem.innerHTML = '';
        for (const ticket of res) {
            listaTicketsElem.innerHTML +=
                (ticketTemplate(ticket));
        }
    })
const ticketTemplate = (ticket) => (`
    <li class="list-group-item">
    <div>
    <h4 style="${ticket.completada ? 'text-decoration: line-through;' :
        ''}">${ticket.cliente}</h4>
    </div>
    <p>${ticket.fecha} - ${ticket.solicitud}</p>
    ${ticket.completada
        ? `<button onclick="envia('/actualizaticket/${ticket.id}/false')"
    class="btn btn-warning">Marcar como pendiente</button></a>`
        : `<button onclick="envia('/actualizaticket/${ticket.id}/true')"
    class="btn btn-success">Marcar como terminado</button></a>`
    }
    <a href="/editar.html?id=${ticket.id}"><button class="btn btnprimary">Editar</button></a>
    <button onclick="envia('/borraticket/${ticket.id}')" class="btn btndanger">Eliminar</button></a>
    </li>
    `);

function envia(solicitud) {
    fetch(solicitud)
        .then(location.reload());
}
function cambiarboton() {
    document.getElementById("miBoton").textContent = "Terminado";
    document.getElementById("miBoton").style.background = "#139002";
    document.getElementById("miBoton").style.color = "white";

}
