
const TicketControl = require("../models/ticket-control")

const ticketControl = new TicketControl()

const socketController = (socket)=> {

    socket.emit('ultimo-ticket', ticketControl.ultimo)

    socket.emit('estado-actual', ticketControl.ultimos4)


    socket.emit('ticket-pendiente', ticketControl.tickets.length)

    

    socket.on('siguiente-ticket', (payload, callback)=> {

        const siguiente = ticketControl.siguiente()
        callback(siguiente)
        socket.broadcast.emit('ticket-pendiente', ticketControl.tickets.length)

        // todo notificar que hay un nuevo tiket para asignar
    })

    socket.on('atender-ticket', ({escritorio}, callback) => {

        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'Es obligatorio el escritorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio)

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
        socket.emit('ticket-pendiente', ticketControl.tickets.length)
        socket.broadcast.emit('ticket-pendiente', ticketControl.tickets.length)


        if (!ticket) {
            callback({
                ok: false,
                msg: 'ya no hay tickets pendientes'
            })
        }else {
            callback({
                ok: true,
                ticket
            })
        }

    })
}


module.exports = {
    socketController
}