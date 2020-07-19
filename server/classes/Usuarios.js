class Usuarios {

    constructor() {
        this.usuarios = [];
    }

    addUser(id, nombre, sala) {

        let usuario = { id, nombre, sala };
        this.usuarios.push(usuario);

        return this.usuarios;
    }


    getUser(id) {
        let usuario = this.usuarios.filter(user => {
            return user.id === id;
        });

        let firstUser = usuario[0];
        return firstUser;
    }

    getUsers() {
        return this.usuarios;
    }


    getUsersPorSala(sala) {
        let usersPorSala = this.usuarios.filter(user => user.sala === sala);
        return usersPorSala;
    }

    deleteUsuario(id) {

        let deletedUser = this.getUser(id);

        this.usuarios = this.usuarios.filter(user => {
            return user.id !== id;
        });

        return deletedUser;
    }


}

module.exports = {
    Usuarios
};