var jwt = require("jsonwebtoken");
var secret = "SKLINFOTECH";
var fs = require('fs');

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']
    
       
    if(authToken != undefined){
        const bearer = authToken.split(' ');

        var token = bearer[1];

            var decoded = jwt.verify(token,secret);
            console.log(decoded);
            

            if(decoded.isAdmin){
                next();
                console.log("Adm logado")
            }else{
                res.send("Sem permissão para acessar essa rota")
            }

    }else{
        res.status(403);
        res.send("Você não está autenticado");
        return;
    }
}