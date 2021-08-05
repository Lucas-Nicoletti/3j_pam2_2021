const express = require('express')
const servidor = express()

servidor.get(
    '/', (req, res, next) => {
        return res.send(
            {
                "mensagem": "Bem-Vindo(a) ao servidor"
            }
        )
    }
)

servidor.listen(3000, () => {
    console.log('Servidor funcionando!')
})
