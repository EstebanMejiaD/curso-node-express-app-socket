
const idClientOnline = document.getElementById("idClientOnline")

const idClientOffline = document.getElementById("idClientOffline")




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