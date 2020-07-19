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

    socket.emit('entrarChat', usuario, function(users) {
        renderUsers(users);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información
socket.on('notification', function(message) {
    renderMessage(message, false);
});

socket.on('usersList', function(users) {
    renderUsers(users);
});

socket.on('createMessage', function(message) {
    renderMessage(message, false);
});

socket.on('privateMessage', function(message) {
    console.log('Private, messaje', message);
});