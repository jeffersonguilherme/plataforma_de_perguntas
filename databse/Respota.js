const Sequelize = require("sequelize");
const connection = require("./database");
const { text } = require("body-parser");

const Respota = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate : {
            notEmpty: { // Evita a criação de colunas vazias, 
                        // Preciso informa ao usuário o erro, a página somente é
                msg: "Esse campo não pode ser vazio"
            }
        }
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Respota.sync({force: false});

module.exports = Respota;