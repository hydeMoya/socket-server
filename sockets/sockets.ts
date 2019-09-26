import { Socket } from "socket.io";

//funcion de flecha  //Metodo que escucha cuando se desconecta 
export const desconectar = (cliente: Socket) =>{

cliente.on('disconnect', ()=> {

    console.log('Cliente desconectado');
})

}

export const mensaje = (cliente : Socket, io: SocketIO.Server) =>{

    cliente.on('mensaje', (payload:{ de:string, cuerpo:string })=>{

        console.log('Mensaje Recibido', payload);

        io.emit('mensaje-nuevo',payload);

    });
}