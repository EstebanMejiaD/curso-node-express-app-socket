
const idClientOnline = document.getElementById("idClientOnline")

const idClientOffline = document.getElementById("idClientOffline")

const txtMensaje = document.getElementById("txtMensaje")
const btnEnviar = document.getElementById("btnEnviar")

const socket = io()



socket.on('connect', ()=> {
    idClientOffline.style.display = 'none'
    idClientOnline.style.display = ''

    console.log('conetado')
})


socket.on('disconnect', ()=> {

    idClientOnline.style.display = 'none'
    idClientOffline.style.display = ''

    console.log('desconectado del servidor')
})


socket.on('enviar-mensaje', (payload)=> {
    console.log(payload)
})

btnEnviar.addEventListener('click', ()=> {
    const mensaje = txtMensaje.value;
    const payload ={
        mensaje,
        id: '1234asda',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id)=> {
        console.log('desde el server: ', id)
    })
})



