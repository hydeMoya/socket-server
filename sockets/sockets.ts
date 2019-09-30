import { Socket } from "socket.io";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket)=>{

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);
    

}

//funcion de flecha  //Metodo clienteque escucha cuando se desconecta 
export const desconectar = (cliente: Socket) =>{

cliente.on('disconnect', ()=> {

    console.log('Cliente desconectado');

    usuariosConectados.borrarUsuario(cliente.id);
})

}

export const mensaje = (cliente : Socket, io: SocketIO.Server) =>{

    cliente.on('mensaje', (payload:{ de:string, cuerpo:string })=>{

        console.log('Mensaje Recibido', payload);

        io.emit('mensaje-nuevo',payload);

    });
}

//Configurar Usuario
export const configurarUsuario = (cliente : Socket, io: SocketIO.Server) =>{

    cliente.on('configurar-usuario', (payload:{ nombre: string }, callback:Function)=>{

        //console.log('Configurando Usuario-->', payload.nombre);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        

        callback({

            ok:true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        })

        //io.emit('mensaje-nuevo',payload);

    });
}