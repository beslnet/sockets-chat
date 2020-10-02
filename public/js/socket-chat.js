var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function (mensaje) {

    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cambios de usuarios
// Cuando un usuario entra o sale del chat
socket.on('listaPersona', function (personas) {
    console.log(personas);
})

// Mensajes privados
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje Privado: ', mensaje);
})