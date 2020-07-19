var params = new URLSearchParams(window.location.search);
var divUsuarios = $('#divUsuarios');
var enviarMensaje = $('#enviarMensaje');
var textMessage = $('#textMessage');
var divChatbox = $('#divChatbox');
var nombre = params.get("nombre");
var sala = params.get("sala");

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

function renderUsers(users) {
    var html = "";
    html += "<li>";
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + sala + "</span></a>";
    html += "</li>";

    for (let index = 0; index < users.length; index++) {
        const element = users[index];

        html += "<li>";
        html += '   <a data-id="' + users[index].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[index].nombre + ' <small class="text-success">online</small></span></a>';
        html += "</li>";
    }
    divUsuarios.html(html);
}

function renderMessage(message, me) {
    var html = '';
    var dateMessage = new Date(message.date);
    var hourMessage = dateMessage.getHours() + ':' + dateMessage.getMinutes();
    var adminClass = 'info';
    if (message.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (me) {
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + message.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hourMessage + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + message.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hourMessage + '</div>';
        html += '</li>';
    }
    divChatbox.append(html);
    scrollBottom();
}

divUsuarios.on("click", "a", function() {
    var id = $(this).data("id");
    if (id === undefined) {
        return;
    }
});

enviarMensaje.on('submit', function(event) {
    event.preventDefault();
    var message = textMessage.val();
    if (message.trim().length === 0) {
        return;
    }

    // Enviar mensaje
    socket.emit('createMessage', {
        nombre: nombre,
        message: message
    }, function(message) {
        textMessage.val('').focus();
        renderMessage(message, true);
    });

});