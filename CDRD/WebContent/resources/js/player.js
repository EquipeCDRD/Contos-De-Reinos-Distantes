/**
 * Autor: kalyl henings
 * Data de criação: 2018-21-08
 * Desc: Arquivo contendo as funções relativas às servlets do jogador
 */

//Main
$(document).ready(function(){

    var usuarioLogado;
    /**
     * especifica o caminho a ser trilhado pela função até a chamada da mesma
     * na raiz do projeto
     */
    var PATH = "../../";
    
    /**
     * função ajax que chama a servlet de inserção de pontuações 
     */
    $.$.ajax({
        type: "POST",
        url: PATH + "inserirPontuacao",
        data: usuarioLogado.serialize(),
        success: function (response) {
            
        }
    });
});