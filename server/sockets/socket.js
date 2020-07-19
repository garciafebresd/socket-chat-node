const { io } = require('../server');
const { Usuarios } = require('../classes/Usuarios');
const { createMessage } = require('../util/util');

const usuarios = new Usuarios();

io.on('connection', (userSocket) => {

    userSocket.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesario'
            });
        }

        userSocket.join(data.sala);

        let personas = usuarios.addUser(userSocket.id, data.nombre, data.sala);
        let usersPorSala = usuarios.getUsersPorSala(data.sala);

        userSocket.broadcast.to(data.sala).emit('usersList', usersPorSala);
        userSocket.broadcast.to(data.sala).emit('notification', createMessage('Administrador', `${data.nombre} se unió al chat`));
        callback(usersPorSala);
    });


    userSocket.on('createMessage', (data, callback) => {

        let persona = usuarios.getUser(userSocket.id);

        let message = createMessage(persona.nombre, data.message);
        userSocket.broadcast.to(persona.sala).emit('createMessage', message);

        callback(message);
    });

    userSocket.on('disconnect', () => {
        let userDeleted = usuarios.deleteUsuario(userSocket.id);

        userSocket.broadcast.to(userDeleted.sala).emit('notification', createMessage('Administrador', `${userDeleted.nombre} abandono el chat`));
        userSocket.broadcast.to(userDeleted.sala).emit('usersList', usuarios.getUsersPorSala(userDeleted.sala));
    });

    userSocket.on('privateMessage', (data) => {

        let persona = usuarios.getUser(userSocket.id);
        userSocket.broadcast.to(data.user).emit('privateMessage', createMessage(persona.nombre, data.message));
    });
});