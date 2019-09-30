import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIo from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets'

export default class Server{

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIo.Server;
    private httpServer : http.Server;

    private constructor(){

        this.app= express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app);
        this.io = socketIo( this.httpServer);
        
        this.escucharSockets();


    }

    public static get instance(){

        return this._instance || (this._instance = new this());
    } 

    //Metdo que escucha el servidor
    private escucharSockets(){
        console.log('escuchando conexiones sockets');

        this.io.on('connection', cliente => {

             //console.log('Cliente conectado');
             //console.log(cliente.id);

             //Conectar Cliente
             socket.conectarCliente(cliente);
             
             //Configurar Usuario
             socket.configurarUsuario(cliente, this.io);

             //Mensajes
             socket.mensaje(cliente, this.io);
             
             //desconectar
             socket.desconectar(cliente);
        
     })

       
    }

    start( callback: any) {

        //this.app.listen( this.port, callback);
        this.httpServer.listen( this.port, callback);

        
    }

}