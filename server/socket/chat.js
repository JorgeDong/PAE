exports = module.exports = function(socket, io) {
    socket.on('chat', function(msg) {
        console.log('El cliente manda el siguiente', msg);
        socket.emit('chat', 'Respuesta del servidor al mensaje: ' + msg)
    });

    setInterval(()=>{
        io.emit('chat', "Un saludo a la Cristina a las " + (new Date()).toUTCString());
    }, 1000);
}
