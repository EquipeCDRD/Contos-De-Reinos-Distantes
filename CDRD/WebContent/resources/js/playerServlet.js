/**
 * Autor: Equipe CDRD
 * Data de criação: 2018-21-08
 * Desc: Arquivo contendo as funções relativas às servlets do jogador
 */

//Main
$(document).ready(function(){
    /*--------------------------------------Geral-----------------------------------------*/
    
    /**
     * especifica o caminho a ser trilhado pela função até a chamada da mesma
     * na raiz do projeto
     */
    var PATH = "../../";

    //validar sessão
	$(function(){
		$.ajax({
			type: "POST",
			url: PATH + "ValidarSessao",
			data: "p=1",
			success: function (usuario) {
				if (usuario.login!=null){
					usuarioLogado = new Object();
					usuarioLogado.id = usuario.id;
					usuarioLogado.login = usuario.login;
					usuarioLogado.email = usuario.email;
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.nascimento = usuario.nascimento;
					buscaAdmParaEditar(usuarioLogado.id);
				} else {
					sair();
				}	
			},
			error: function (info) {
				sair();
			}
		});
	});
    
    //Cai fora fdp!
    sair = function(){
		$.ajax({
			type: "POST",
			url: PATH + "Logout",
			success: function (data) {
				window.location.href = (PATH+"index.html");	
			},
			error: function (info) {
				alert("Erro ao tentar encerrar sua sessão: "+ info.status + " - " + info.statusText);	
			}
		});
	}

    /*--------------------------------------InseriPontuacao-----------------------------------------*/

    /**
     * função ajax que chama a servlet de inserção de pontuações 
     */
    inserirPontuacao = function(){
        
        /**
         * variável que contem a última pontuação atingida pelo jogador que será enviada ao servidor
         */
        usuarioLogado.pontuacao = $("#inputPontuacaoTemp").val();
        
        $.ajax({
        
            type: "POST",
            url: PATH + "InserirPontuacao",
        
            data: "usuarioid="+usuarioLogado.id+
                  /**
                   * o identificador serve para dizer ao servidor que tipo de busca realizar.
                   * nesse caso, o identificador é pessoal pq é preciso checar as pontuações de um
                   * jogador em específico
                   */
                  "&hdidentificador=pessoal"+
                  "&hdid=null"+
                  "&txtpontuacao="+usuarioLogado.pontuacao,
            
            success: function (msg) {
                alert(msg);
            },
            
            error: function(msg){
            	alert(msg);
            }
        
        });
    }
    
});