var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


socket.emit('entrarChat', usuario, function(resp) {
    console.log('Usuarios conectados', resp);
});

// Escuchar información
socket.on('notification', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('usersList', function(usuarios) {
    console.log('Usuarios:', usuarios);
});

socket.on('createMessage', function(message) {
    console.log('Message:', message);
});

socket.on('privateMessage', function(message) {
    console.log('Private, messaje', message);
});



// // Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });