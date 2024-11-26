import jws from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    console.log('authHeader',authHeader);
//obtenemos el jwt de la cabecera de autorizacion
    const token=authHeader && authHeader.split(' ')[1]
    console.log('token', token);
    if (!token) return res.sendStatus(401);
   //vericamos y decodificamos
    const secret=process.env.JW_SECRET
    jws.verify(token,secret,(err,user)=>{
        if (err) return res.sendStatus(403);

        // si el token es valido
        console.log('user',user)
        req.user=user;
        next();
    })
}