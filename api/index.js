const express = require("express");
const servidor = express();
const mysql = require("mysql2");
const banco = mysql.createPool({
  database: "3j_2021",
  user: "root",
  password: "minas",
  host: "localhost",
  port: "3306"
});
const bodyParser = require('body-parser')

servidor.use(bodyParser.urlencoded({extended: false}))
servidor.use(bodyParser.json())

servidor.post("/cliente", (req, res, next) => {
  let body = req.body
  const QUERY = `INSERT INTO clientes (nome, login, senha) VALUES('${body.nome}', '${body.login}', '${body.senha}')`
  
  banco.getConnection((error, conn) => {
    if(error){
      return res.status(500).send({
        Mensagem: "Erro no servidor",
        Detalhes: error
      })
    }

    conn.query(QUERY, (error, resultado) => {
      conn.release()
      
      if(error){
        return res.status(500).send({
          Mensagem: "Erro no servidor",
          Detalhes: error
        })
      }
      
      return res.status(200).send({
        Verbo: "post",
        Mensagem: "Cadastro realizado com sucesso!",
      })
    })
  })
})

servidor.delete("/cliente/:id", (req, res, next) => {
  let id = req.params.id
  const QUERY = `DELETE FROM clientes WHERE cliente_id=${id}`

  banco.getConnection((error, conn) => {
    if(error){
      return res.status(500).send({
        mensagem: 'Erro no servidor',
        detalhes: error
      })
    }

    conn.query(QUERY, (erro, resultados) => {
      conn.release()

      if(erro){
        return res.status(200).send({
          mensagem: `Não foi possível excluir o cliente ${id}`,
          detalhes: erro
       })
      }

      if(resultados.affectedRows > 0){
        return res.status(200).send({
          mensagem: `Cliente ${id} excluir com sucesso`
       })
      }else{
        return res.status(200).send({
          mensagem: `Cliente ${id} não existe no banco de dados`
        })  
      }
    }) 
  })
})

servidor.patch("/cliente/:id", (req, res, next) => {
  let id = req.params.id
  let body = req.body
  const SQL = `UPDATE clientes SET nome = '${body.nome}', login = '${body.login}',  senha = '${body.senha}' WHERE cliente_id = ${id}`

  banco.getConnection((erro, con) => {
    if(erro){
      return res.status(500).send({
        mensagem: 'Erro no servidor',
        detalhes: error
      })
    }

    con.query(SQL, (erro, result) => {
      con.release()

      if(erro){
        return res.status(500).send({
          mensagem: 'Erro ao atualizar o cadastro',
          detalhes: error
        })
      }

      return res.status(200).send({
        mensagem: 'Cliente atualizado com sucesso!'
      })
    })
  })
})

servidor.get("/cliente/:id", (req, res, next) => {
  let id = req.params.id

  return res.status(200).send({
    Verbo: 'get',
    Mensagem: `Id capturado ${id}`
  })
})

servidor.get("/testarconexao", (req, res, next) => {
  banco.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        Erro: "Erro no servidor",
        Detalhes: error,
      });
    }

    conn.release();

    return res.status(200).send({
      Mensagem: "Conexão estabelecida com sucesso",
    });
  });
});

servidor.get("/clientes", (req, res, next) => {
    const QUERY = 'SELECT * FROM clientes ORDER BY nome'

    banco.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
                Detalhes: error
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if(error){
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                    Detalhes: error
                })
            }

            return res.status(200).send({
                Mensagem: "Dados retornados com sucesso",
                Dados: resultado
            })
        })
    })
}) 

servidor.get("/clientes/:criterio", (req, res, next) => {
    let criterio = req.params.criterio
    const QUERY = `SELECT * FROM clientes WHERE nome LIKE '%${criterio}%' ORDER BY nome`

    banco.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
                Detalhes: error
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if(error){
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                    Detalhes: error
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.get("/clientes/:id_inicial/:id_final", (req, res) => {
  let id1 = req.params.id_inicial
  let id2 = req.params.id_final

  const QUERY = `SELECT * FROM clientes WHERE cliente_id >= ${id1} AND cliente_id <= ${id2} ORDER BY cliente_id`
  
   banco.getConnection((error, conn) => {
    if(error){
      return res.status(500).send({
          Erro: "Não foi possível atender à solicitação",
          Detalhes: error
      })
    }

    conn.query(QUERY, (error, resultado) => {
        conn.release()

        if(error){
          return res.status(500).send({
            Erro: "Não foi possível atender à solicitação",
            Detalhes: error
        })
        }

        return res.status(200).send({
          Mensagem: "Consulta realizada com sucesso",
          Dados: resultado
        })
     })
  })
})

servidor.get("/", (req, res, next) => {
  return res.send({
    mensagem: "Bem-vindo(a) ao servidor",
    cidade: "Itapeva",
    uf: "SP",
  });
});

servidor.listen(3000, () => {
  console.log("Servidor funcionando!");
});
