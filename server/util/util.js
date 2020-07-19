const createMessage = (user, message) => {

    return {
        user,
        messaje,
        date: new Date().getTime()
    };
};

module.exports = {
    createMessage
};