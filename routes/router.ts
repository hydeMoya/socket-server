import {Router, Request,Response} from 'express';
import Server from '../clases/server';


const router = Router();

router.get('/mensajes',(req:Request,res: Response) => {

    res.json({

        ok:true,
        mensaje: 'Todo esta bien !!!'

    });
});

router.post('/mensajes',(req:Request,res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    //Referencia a nuestro servidor
    const server = Server.instance;

    //Objeto que injectamos a servicio
    const payload = {cuerpo,de};

    //Enviar mensaje a todos ...variable hace referencia a clase chatService de angular
    server.io.emit('mensaje-nuevo', payload);

    res.json({

        ok:true,
        cuerpo,
        de

    });
});

router.post('/mensajes/:id',(req:Request,res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    //lo que se enviara a traves del servicio
    const payload ={
        de,
        cuerpo
    }

    const server = Server.instance;

    //Envia al server mensaje privado a usuario identificado por la variable id
    server.io.in(id).emit('mensaje-privado', payload); // server.io.in Envia solo a una persona en especifico 

    res.json({

        ok:true,
        cuerpo,
        de,
        id

    });
});

export default router;