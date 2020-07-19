const createMessage = (user, message) => {

    return {
        nombre: user,
        message,
        date: new Date().getTime()
    };
};

module.exports = {
    createMessage
};